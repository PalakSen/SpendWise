import { useReducer, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "./Slice";

export default function LoginComponent() {
    const init = {
        uid: "",
        password: ""
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

    const [info, dispatch] = useReducer(reducer, init);
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();
    const reduxAction = useDispatch();

    const sendData = (e) => {
        e.preventDefault();

        if (!info.password) {
            setMsg("Password cannot be empty.");
            return;
        }

        const reqdata = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(info)
        };

        fetch("https://localhost:7211/api/Logins/CheckLogin", reqdata)
            .then(resp => {
                if (resp.status === 401) {
                    return "";
                }
                return resp.text();
            })
            .then(text => text.length ? JSON.parse(text) : {})
            .then(obj => {
                if (Object.keys(obj).length === 0) {
                    setMsg("Wrong UID or Password");
                } else {
                    reduxAction(login());
                    localStorage.setItem("LoggedUser", JSON.stringify(obj));
                    
                    if (obj.user.roleid === 1) {
                        navigate("/admin");
                    } else if (obj.user.roleid === 2) {
                        navigate("/singleuser");
                    } else if (obj.user.roleid === 3) {
                        navigate("/organization");
                    } else if (obj.user.roleid === 4) {
                        navigate("/department");
                    }
                }
            })
            .catch(error => {
                setMsg("An error occurred: " + error.message);
            });
    };

    return (
        <div className="login-card">
            <h1 className="login-title">Login Page</h1>
            <div className="login-form-container">
                <form className="login-form">
                    <div className="mb-3">
                        <label htmlFor="uid" className="form-label">Enter UID:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="uid"
                            name="uid"
                            value={info.uid}
                            onChange={(e) => dispatch({ type: 'update', fld: 'uid', val: e.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Enter Password:</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            value={info.password}
                            onChange={(e) => dispatch({ type: 'update', fld: 'password', val: e.target.value })}
                        />
                    </div>
                    <div className="button-group">
                        <button type="submit" className="btn btn-primary" onClick={(e) => sendData(e)}>Submit</button>
                        <button type="button" className="btn btn-secondary" onClick={() => dispatch({ type: 'reset' })}>Clear</button>
                    </div>
                </form>
                <div className="register-link-container">
                    <button
                        type="button"
                        className="btn btn-link"
                        onClick={() => navigate("/choice")}
                    >
                        new user?
                    </button>
                </div>
                {msg && <p className="error-message">{msg}</p>}
            </div>
        </div>
    );
}
