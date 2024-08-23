import { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function OrganizationReg() {
    const init = {
        uid: "",
        password: "",
        fname: "",
        lname: "",
        orgname: "",
        orgdesc: "",
        email: "",
        contact: "",
        industry: "",
        orgwebsite: "",
        city: "",
        orgaddress: ""
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
    const navigate= useNavigate()
    const [info, dispatch] = useReducer(reducer, init);
    const [errors, setErrors] = useState({});

    const validateField = (name, value) => {
        let error = "";

        switch (name) {
            case "uid":
                if (!value) error = "Username is required";
                else if (value.length < 3) error = "Username must be at least 3 characters long";
                break;
            case "password":
                if (!value) error = "Password is required";
                else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*@)[A-Za-z\d@]{6,12}$/.test(value))
                    error = "Password must be 6-12 characters long and contain at least one capital letter, one small letter, number, and '@'";
                break;
            case "fname":
                if (!value) error = "First name is required";
                else if (value.length < 2) error = "First name must be at least 2 characters long";
                break;
            case "lname":
                if (!value) error = "Last name is required";
                else if (value.length < 2) error = "Last name must be at least 2 characters long";
                break;
            case "orgname":
                if (!value) error = "Organization name is required";
                break;
            case "orgdesc":
                if (!value) error = "Organization description is required";
                else if (value.length < 10) error = "Organization description must be at least 10 characters long";
                break;
            case "email":
                if (!value) error = "Email is required";
                else if (!/\S+@\S+\.\S+/.test(value)) error = "Email address is invalid";
                break;
            case "contact":
                if (!value) error = "Contact is required";
                else if (!/^\d{10}$/.test(value)) error = "Contact must be exactly 10 digits";
                break;
            case "industry":
                if (!value) error = "Industry domain is required";
                break;
            case "orgwebsite":
                if (!value) error = "Organization website is required";
                else if (!/^https?:\/\/[^\s]+$/.test(value)) error = "Website URL is invalid";
                break;
            case "city":
                if (!value) error = "City is required";
                break;
            case "orgaddress":
                if (!value) error = "Organization address is required";
                break;
            default:
                break;
        }

        return error;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch({ type: 'update', fld: name, val: value });

        const error = validateField(name, value);
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: error,
        }));
    };

    const validate = () => {
        const newErrors = {};

        Object.keys(info).forEach((key) => {
            const error = validateField(key, info[key]);
            if (error) newErrors[key] = error;
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const sendData = (e) => {
        e.preventDefault();
        if (!validate()) return;

        const dataToSend = {
            uname: info.uid,
            pwd: info.password,
            email: info.email,
            status: 1,
            roleid: 3,
            fname: info.fname,
            lname: info.lname,
            contact: info.contact,
            city: info.city,
            organizationheads: [
                {
                    orgname: info.orgname,
                    orgaddress: info.orgaddress,
                    industry: info.industry,
                    orgwebsite: info.orgwebsite,
                    orgdesc: info.orgdesc
                },
            ]
        };

        const reqdata = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataToSend)
        };

        fetch("https://localhost:7211/api/Logins/SaveUser", reqdata)
            .then(resp => {
                if (!resp.ok) {
                    return resp.json().then(error => {
                        throw new Error(JSON.stringify(error.errors));
                    });
                }
                return resp.json();
                
            })
            .then(data => {
                alert("Registration Successful");
                console.log('Success:', data);
                navigate("/login");
            })
            .catch(error => console.error("Error:", error.message));
    };

    return (
        <div className="form-container">
            <h1 className="form-title">Registration Form</h1>
            <form className="registration-form" noValidate>
                <div className="form-group">
                    <label htmlFor="uid">Username:</label>
                    <input
                        type="text"
                        id="uid"
                        name="uid"
                        value={info.uid}
                        onChange={handleChange}
                        onBlur={handleChange}
                    />
                    {errors.uid && <div className="error-message">{errors.uid}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={info.password}
                        onChange={handleChange}
                        onBlur={handleChange}
                    />
                    {errors.password && <div className="error-message">{errors.password}</div>}
                </div>
                <div className="form-group half-width">
                    <label htmlFor="fname">First Name:</label>
                    <input
                        type="text"
                        id="fname"
                        name="fname"F
                        value={info.fname}
                        onChange={handleChange}
                        onBlur={handleChange}
                    />
                    {errors.fname && <div className="error-message">{errors.fname}</div>}
                </div>
                <div className="form-group half-width">
                    <label htmlFor="lname">Last Name:</label>
                    <input
                        type="text"
                        id="lname"
                        name="lname"
                        value={info.lname}
                        onChange={handleChange}
                        onBlur={handleChange}
                    />
                    {errors.lname && <div className="error-message">{errors.lname}</div>}
                </div>
                <div className="form-group half-width">
                    <label htmlFor="orgname">Organization Name:</label>
                    <input
                        type="text"
                        id="orgname"
                        name="orgname"
                        value={info.orgname}
                        onChange={handleChange}
                        onBlur={handleChange}
                    />
                    {errors.orgname && <div className="error-message">{errors.orgname}</div>}
                </div>
                <div className="form-group half-width">
                    <label htmlFor="orgdesc">Organization Description:</label>
                    <input
                        type="text"
                        id="orgdesc"
                        name="orgdesc"
                        value={info.orgdesc}
                        onChange={handleChange}
                        onBlur={handleChange}
                    />
                    {errors.orgdesc && <div className="error-message">{errors.orgdesc}</div>}
                </div>
                <div className="form-group half-width">
                    <label htmlFor="email">Company Mail:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={info.email}
                        onChange={handleChange}
                        onBlur={handleChange}
                    />
                    {errors.email && <div className="error-message">{errors.email}</div>}
                </div>
                <div className="form-group half-width">
                    <label htmlFor="contact">Contact:</label>
                    <input
                        type="text"
                        id="contact"
                        name="contact"
                        value={info.contact}
                        onChange={handleChange}
                        onBlur={handleChange}
                    />
                    {errors.contact && <div className="error-message">{errors.contact}</div>}
                </div>
                <div className="form-group half-width">
                    <label htmlFor="industry">Industry:</label>
                    <input
                        type="text"
                        id="industry"
                        name="industry"
                        value={info.industry}
                        onChange={handleChange}
                        onBlur={handleChange}
                    />
                    {errors.industry && <div className="error-message">{errors.industry}</div>}
                </div>
                <div className="form-group half-width">
                    <label htmlFor="orgwebsite">Organization Website:</label>
                    <input
                        type="text"
                        id="orgwebsite"
                        name="orgwebsite"
                        value={info.orgwebsite}
                        onChange={handleChange}
                        onBlur={handleChange}
                    />
                    {errors.orgwebsite && <div className="error-message">{errors.orgwebsite}</div>}
                </div>
                <div className="form-group half-width">
                    <label htmlFor="city">City:</label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={info.city}
                        onChange={handleChange}
                        onBlur={handleChange}
                    />
                    {errors.city && <div className="error-message">{errors.city}</div>}
                </div>
                <div className="form-group half-width">
                    <label htmlFor="orgaddress">Organization Address:</label>
                    <input
                        type="text"
                        id="orgaddress"
                        name="orgaddress"
                        value={info.orgaddress}
                        onChange={handleChange}
                        onBlur={handleChange}
                    />
                    {errors.orgaddress && <div className="error-message">{errors.orgaddress}</div>}
                </div>
                <button type="submit" className="submit-button" onClick={sendData}>Register</button>
            </form>
        </div>
    );
}
