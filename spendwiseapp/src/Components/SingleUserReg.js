import { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
const init = {
    uid: "",
    password: "",
    fname: "",
    lname: "",
    email: "",
    contact: "",
    city: "",
    ConfirmPassword: ""
};

const initErrors = {
    uid: "",
    password: "",
    fname: "",
    lname: "",
    email: "",
    contact: "",
    city: "",
    ConfirmPassword: ""
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
            return { ...state, [action.field]: action.error };
        case 'reset':
            return initErrors;
        default:
            return state;
    }
};

export default function SingleUserReg() {
    const [formData, dispatch] = useReducer(reducer, init);
    const [formErrors, dispatchError] = useReducer(errorReducer, initErrors);
    const navigate = useNavigate();
    const [passwordType, setPasswordType] = useState('password');
    const [passwordTypeConfirm, setPasswordTypeConfirm] = useState('password');

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
                else if (value.length < 1) error = "Enter Your City";
                break;
            case "contact":
                if (!value) error = "Contact is required";
                else if (!/^\d{10}$/.test(value)) error = "Contact must be exactly 10 digits";
                break;
            case "email":
                if (!value) error = "Email is required";
                else if (!/\S+@\S+\.\S+/.test(value)) error = "Email address is invalid";
                break;
            case "uid":
                if (!value) error = "Username is required";
                else if (value.length < 2) error = "Username must be at least 2 characters long";
                break;
            case "password":
                if (!value) {
                    error = "Password is required";
                } else if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{8,12}$/.test(value)) {
                    error = "Password must be 8-12 characters long and contain at least one capital letter, one small letter, and '@'";
                }
                break;
            case "ConfirmPassword":
                if (!value) error = "Confirm Password is required";
                else if (value !== formData.password) error = "Passwords do not match";
                break;
            default:
                break;
        }

        dispatchError({ type: 'setError', field: name, error });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch({ type: 'update', fld: name, val: value });
        validateField(name, value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let hasErrors = false;
        Object.keys(formData).forEach(field => {
            validateField(field, formData[field]);
            if (formErrors[field]) {
                hasErrors = true;
            }
        });

        if (hasErrors) {
            alert("Please fix errors before submitting");
            return;
        }

        const dataToSend = {
            fname: formData.fname,
            lname: formData.lname,
            city: formData.city,
            contact: formData.contact,
            email: formData.email,
            pwd: formData.password,
            roleid: 2,
            status:1,
            uname:formData.uid
        };

        const reqdata = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataToSend)
        };
        fetch('https://localhost:7211/api/Logins/SaveSingleUser', reqdata)
            .then(response => {
                if (!response.ok) {
                    return response.json().then(error => {
                        throw new Error(JSON.stringify(error.error));
                    });
                }
                return response.json();
            })
            .then(data => {
                console.log('Success:', data);
                navigate("/login");
            })
            .catch(error => {
                alert("Registration failed:" + error.message);
                console.error('Error:', error);
            });
    };
    const togglePassword = () => {
        setPasswordType(passwordType === 'password' ? 'text' : 'password');
        setPasswordTypeConfirm(passwordTypeConfirm === 'password' ? 'text' : 'password');
    };

    return (
        <div className="form-container">
            <h1 className="form-title">Single User Registration</h1>
            <form className="registration-form" onSubmit={handleSubmit} noValidate>
                <div className="form-group half-width">
                    <label htmlFor="fname">First Name:</label>
                    <input
                        type="text"
                        id="fname"
                        name="fname"
                        value={formData.fname}
                        onChange={handleChange}
                        onBlur={handleChange}
                    />
                    {formErrors.fname && <div className="error-message">{formErrors.fname}</div>}
                </div>
                <div className="form-group half-width">
                    <label htmlFor="lname">Last Name:</label>
                    <input
                        type="text"
                        id="lname"
                        name="lname"
                        value={formData.lname}
                        onChange={handleChange}
                        onBlur={handleChange}
                    />
                    {formErrors.lname && <div className="error-message">{formErrors.lname}</div>}
                </div>
                <div className="form-group half-width">
                    <label htmlFor="city">City:</label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        onBlur={handleChange}
                    />
                    {formErrors.city && <div className="error-message">{formErrors.city}</div>}
                </div>
                <div className="form-group half-width">
                    <label htmlFor="contact">Contact:</label>
                    <input
                        type="text"
                        id="contact"
                        name="contact"
                        value={formData.contact}
                        onChange={handleChange}
                        onBlur={handleChange}
                    />
                    {formErrors.contact && <div className="error-message">{formErrors.contact}</div>}
                </div>
                <div className="form-group half-width">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleChange}
                    />
                    {formErrors.email && <div className="error-message">{formErrors.email}</div>}
                </div>
                <div className="form-group half-width">
                    <label htmlFor="uid">Username:</label>
                    <input
                        type="text"
                        id="uid"
                        name="uid"
                        value={formData.uid}
                        onChange={handleChange}
                        onBlur={handleChange}
                    />
                    {formErrors.uid && <div className="error-message">{formErrors.uid}</div>}
                </div>
                <div className="form-group half-width">
                    <label htmlFor="password">Password:</label>
                    <input
                        type={passwordType}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        onBlur={handleChange}
                    />
                    {formErrors.password && <div className="error-message">{formErrors.password}</div>}
                </div>
                <div className="form-group half-width">
                    <label htmlFor="ConfirmPassword">Confirm Password:</label>
                    <input
                        type={passwordTypeConfirm}
                        id="ConfirmPassword"
                        name="ConfirmPassword"
                        value={formData.ConfirmPassword}
                        onChange={handleChange}
                        onBlur={handleChange}
                    />
                    {formErrors.ConfirmPassword && <div className="error-message">{formErrors.ConfirmPassword}</div>}
                </div>
                <div className="form-group">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="showPassword"
                        checked={passwordType === 'text'}
                        onChange={togglePassword}
                    />
                    <label className="form-check-label" htmlFor="showPassword">Show Password</label>
                </div>
                <div className="form-group">
                    <div className="button-container">
                    <button type="submit" className="btn btn-primary mt-3">Register</button>

                    </div>
                </div>
            </form>
        </div>
    );
}
