import React, { useReducer } from "react";
import { Link } from "react-router-dom";

export default function UpdateSingleUser() {
    const user = JSON.parse(localStorage.getItem("LoggedUser")).user;

    const init = {
        uname: user.uname || '',
        pwd: '', 
        email: user.email || '',
        fname: user.fname || '',
        lname: user.lname || '',
        contact: user.contact || '',
        city: user.city || ''
    };

    const initErrors = {
        uname: "",
        pwd: "",
        fname: "",
        lname: "",
        email: "",
        contact: "",
        city: "",
    };

    function reducer(state, action) {
        switch (action.type) {
            case 'update':
                return { ...state, [action.field]: action.value };
            default:
                return state;
        }
    }

    const errorReducer = (state, action) => {
        switch (action.type) {
            case 'setError':
                return { ...state, [action.field]: action.error };
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
            case "fname":
                if (!value) error = "First Name is required";
                else if (value.length < 2) error = "First name must be at least 2 characters";
                break;
            case "lname":
                if (!value) error = "Last Name is required";
                else if (value.length < 2) error = "Last name must be at least 2 characters";
                break;
            case "city":
                if (!value) error = "City is required";
                break;
            case "contact":
                if (!value) error = "Contact is required";
                else if (!/^\d{10}$/.test(value)) error = "Contact must be exactly 10 digits";
                break;
            case "email":
                if (!value) error = "Email is required";
                else if (!/\S+@\S+\.\S+/.test(value)) error = "Email address is invalid";
                break;
            case "uname":
                if (!value) error = "Username is required";
                else if (value.length < 2) error = "Username must be at least 2 characters long";
                break;
            case "pwd":
                if (!value) {
                    error = "Password is required";
                } else if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{8,12}$/.test(value)) {
                    error = "Password must be 8-12 characters long and contain at least one capital letter, one small letter, and '@'";
                }
                break;
            default:
                break;
        }

        dispatchError({ type: 'setError', field: name, error });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch({
            type: 'update',
            field: name,
            value: value
        });
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
            pwd: info.pwd,
            fname: info.fname,
            lname: info.lname,
            email: info.email,
            contact: info.contact,
            city: info.city
        };

        const reqdata = {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(dataToSend)
        };

        fetch('http://localhost:8080/updatesingleuser/' + user.uid, reqdata)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Profile updated:', data);
                // Handle success (e.g., show a success message)
            })
            .catch(error => {
                // Handle error (e.g., show an error message)
            });
    }

    return (
        <div>
            <nav className="navbar navbar-expand-sm bg-light mb-3">
                <div className="container-fluid">
                    <ul className='navbar-nav'>
                        <li className='nav-item'>
                            <Link to="/addexpense" className='nav-link px-3'>Add Expenses</Link>
                        </li>
                        <li className='nav-item'>
                            <Link to="/setbudget" className='nav-link px-3'>Set Budget</Link>
                        </li>
                        <li className='nav-item'>
                            <Link to="/expenlogs" className='nav-link px-3'>Expense History</Link>
                        </li>
                        <li className='nav-item'>
                            <Link to="/updateSingleUser" className='nav-link px-3'>Update Profile</Link>
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

            <div className="container">
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group mb-3">
                                <label>Username</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="uname"
                                    value={info.uname}
                                    onChange={handleChange}
                                    onBlur={handleChange}
                                />
                                {errors.uname && <span className="text-danger">{errors.uname}</span>}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group mb-3">
                                <label>Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="pwd"
                                    value={info.pwd}
                                    onChange={handleChange}
                                    onBlur={handleChange}
                                />
                                {errors.pwd && <span className="text-danger">{errors.pwd}</span>}
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group mb-3">
                                <label>Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    value={info.email}
                                    onChange={handleChange}
                                    onBlur={handleChange}
                                />
                                {errors.email && <span className="text-danger">{errors.email}</span>}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group mb-3">
                                <label>First Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="fname"
                                    value={info.fname}
                                    onChange={handleChange}
                                    onBlur={handleChange}
                                />
                                {errors.fname && <span className="text-danger">{errors.fname}</span>}
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group mb-3">
                                <label>Last Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="lname"
                                    value={info.lname}
                                    onChange={handleChange}
                                    onBlur={handleChange}
                                />
                                {errors.lname && <span className="text-danger">{errors.lname}</span>}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group mb-3">
                                <label>Contact</label>
                                <input
                                    type="tel"
                                    className="form-control"
                                    name="contact"
                                    value={info.contact}
                                    onChange={handleChange}
                                    onBlur={handleChange}
                                />
                                {errors.contact && <span className="text-danger">{errors.contact}</span>}
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group mb-3">
                                <label>City</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="city"
                                    value={info.city}
                                    onChange={handleChange}
                                    onBlur={handleChange}
                                />
                                {errors.city && <span className="text-danger">{errors.city}</span>}
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary">Update</button>
                </form>
            </div>
        </div>
    );
}
