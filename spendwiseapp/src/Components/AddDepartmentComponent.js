import React from "react";
import { useReducer } from "react";
import { Link } from "react-router-dom";

export default function AddDepartmentComponent() {
    const oid = JSON.parse(localStorage.getItem("LoggedUser")).user.organizationheads[0].orgid;

    const init = {
        uname: '',
        password: '',
        email: '',
        fname: '',
        lname: '',
        contact: '',
        city: '',
        deptname: '',
        allocatedamt: '',
        requestedamt: ''
    };

    const initErrors = {
        uname: "",
        password: "",
        email: "",
        fname: "",
        lname: "",
        contact: "",
        city: "",
        deptname: "",
        allocatedamt: "",
    };

    const reducer = (state, action) => {
        switch (action.type) {
            case 'update':
                return { ...state, [action.fld]: action.val };
            case 'reset':
                return init;
            default:
                return state;
        }
    };

    const errorReducer = (state, action) => {
        switch (action.type) {
            case 'setError':
                return { ...state, [action.fld]: action.error };
            case 'reset':
                return initErrors;
            default:
                return state;
        }
    };

    const [info, dispatch] = useReducer(reducer, init);
    const [errors, dispatchError] = useReducer(errorReducer, initErrors);

    const validateField = (name, value) => {
        let error = "";

        switch (name) {
            case "uname":
                if (!value) error = "Username is required";
                else if (value.length < 2) error = "Username must be at least 2 characters long";
                break;
            case "password":
                if (!value) error = "Password is required";
                else if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{8,12}$/.test(value))
                    error = "Password must be 8-12 characters long and contain at least one capital letter, one small letter, and '@'";
                break;
            case "email":
                if (!value) error = "Email is required";
                else if (!/\S+@\S+\.\S+/.test(value)) error = "Email address is invalid";
                break;
            case "fname":
                if (!value) error = "First Name is required";
                else if (value.length < 2) error = "First name must be at least 2 characters";
                break;
            case "lname":
                if (!value) error = "Last Name is required";
                else if (value.length < 2) error = "Last name must be at least 2 characters";
                break;
            case "contact":
                if (!value) error = "Contact is required";
                else if (!/^\d{10}$/.test(value)) error = "Contact must be exactly 10 digits";
                break;
            case "city":
                if (!value) error = "City is required";
                break;
            case "deptname":
                if (!value) error = "Department Name is required";
                break;
            case "allocatedamt":
                if (!value) error = "Allocated Amount is required";
                else if (value <= 0) error = "Allocated Amount must be greater than 0";
                break;
            default:
                break;
        }

        dispatchError({ type: 'setError', fld: name, error });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch({ type: 'update', fld: name, val: value });
        validateField(name, value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let hasErrors = false;

        // Validate all fields before submitting
        Object.keys(info).forEach((field) => {
            validateField(field, info[field]);
            if (errors[field]) hasErrors = true;
        });

        if (hasErrors) return;

        const dataToSend = {
            uname: info.uname,
            pwd: info.password,
            email: info.email,
            roleid: 4,
            orgid: oid,
            fname: info.fname,
            lname: info.lname,
            contact: info.contact,
            city: info.city,
            deptname: info.deptname,
            aloamt: info.allocatedamt,
            reqamt: info.requestedamt
        };

        console.log(dataToSend);
        const reqdata = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataToSend)
        };

        fetch("http://localhost:8080/addDept", reqdata)
            .then(resp => {
                if (!resp.ok) {
                    return resp.json().then(error => {
                        throw new Error(JSON.stringify(error.errors));
                    });
                }
                return resp.json();
            })
            .then(data => console.log("Success:", data))
            .catch(error => console.error("Error:", error.message));
    };

    return (
        <div>
            <nav className="navbar navbar-expand-sm bg-light mb-3">
                <div className="container-fluid">
                    <ul className='navbar-nav'>
                        <li className='nav-item'>
                            <Link to="/organization" className='nav-link px-3'>Home</Link>
                        </li>
                        <li className='nav-item'>
                            <Link to="/orgrequest" className='nav-link px-3'>Requests</Link>
                        </li>
                        <li className='nav-item'>
                            <Link to="/adddepartment" className='nav-link px-3'>Add Department</Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link to='/logout' className="nav-link">
                                <button className='btn btn-primary btn-sm'>Logout</button>
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>

            <div className="login-card">
                <h1 className="login-title">Add Department</h1>
                <div className="login-title">
                    <form className="login-form" noValidate onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="uname" className="form-label">User Name :</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="uname"
                                    name="uname"
                                    value={info.uname}
                                    onChange={handleChange}
                                    onBlur={handleChange}
                                    required
                                />
                                {errors.uname && <span className="text-danger">{errors.uname}</span>}
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="password" className="form-label">Password :</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="password"
                                    name="password"
                                    value={info.password}
                                    onChange={handleChange}
                                    onBlur={handleChange}
                                    required
                                />
                                {errors.password && <span className="text-danger">{errors.password}</span>}
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="email" className="form-label">Email ID :</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    value={info.email}
                                    onChange={handleChange}
                                    onBlur={handleChange}
                                    required
                                />
                                {errors.email && <span className="text-danger">{errors.email}</span>}
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="fname" className="form-label">First Name :</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="fname"
                                    name="fname"
                                    value={info.fname}
                                    onChange={handleChange}
                                    onBlur={handleChange}
                                    required
                                />
                                {errors.fname && <span className="text-danger">{errors.fname}</span>}
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="lname" className="form-label">Last Name :</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="lname"
                                    name="lname"
                                    value={info.lname}
                                    onChange={handleChange}
                                    onBlur={handleChange}
                                    required
                                />
                                {errors.lname && <span className="text-danger">{errors.lname}</span>}
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="contact" className="form-label">Contact :</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="contact"
                                    name="contact"
                                    value={info.contact}
                                    onChange={handleChange}
                                    onBlur={handleChange}
                                    required
                                />
                                {errors.contact && <span className="text-danger">{errors.contact}</span>}
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="city" className="form-label">City :</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="city"
                                    name="city"
                                    value={info.city}
                                    onChange={handleChange}
                                    onBlur={handleChange}
                                    required
                                />
                                {errors.city && <span className="text-danger">{errors.city}</span>}
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="deptname" className="form-label">Department Name :</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="deptname"
                                    name="deptname"
                                    value={info.deptname}
                                    onChange={handleChange}
                                    onBlur={handleChange}
                                    required
                                />
                                {errors.deptname && <span className="text-danger">{errors.deptname}</span>}
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="allocatedamt" className="form-label">Allocated Amt :</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="allocatedamt"
                                    name="allocatedamt"
                                    value={info.allocatedamt}
                                    onChange={handleChange}
                                    onBlur={handleChange}
                                    required
                                />
                                {errors.allocatedamt && <span className="text-danger">{errors.allocatedamt}</span>}
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary">Add Department</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
