import { useReducer } from "react";



export default function OrganizationReg(){

    const init = {
        uid: "",
        password: "",
        fname:"",
        lname:"",
        orgname:"",
        orgdesc:"",
        email:"",
        contact:"",
        industry:"",
        orgwebsite:"",
        city:"",
        orgaddress:""
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
    const sendData = (e) => {
        e.preventDefault();

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
            .then(data => console.log("Success:", data))
            .catch(error => console.error("Error:", error.message));
    }
    return (
        <div className="login-card">
            <h1 className="login-title">Registration Form</h1>
            <div className="login-form-container">
                <form className="login-form">
                    <div className="mb-3">
                        <label htmlFor="uid" className="form-label">Username:</label>
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
                        <label htmlFor="password" className="form-label">Password:</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            value={info.password}
                            onChange={(e) => dispatch({ type: 'update', fld: 'password', val: e.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="fname" className="form-label">First Name:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="fname"
                            name="fname"
                            value={info.fname}
                            onChange={(e) => dispatch({ type: 'update', fld: 'fname', val: e.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="lname" className="form-label">Last Name:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="lname"
                            name="lname"
                            value={info.lname}
                            onChange={(e) => dispatch({ type: 'update', fld: 'lname', val: e.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="orgname" className="form-label">Organization Name:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="orgname"
                            name="orgname"
                            value={info.orgname}
                            onChange={(e) => dispatch({ type: 'update', fld: 'orgname', val: e.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="orgdesc" className="form-label">Organization Description :</label>
                        <input
                            type="text"
                            className="form-control"
                            id="orgdesc"
                            name="orgdesc"
                            value={info.orgdesc}
                            onChange={(e) => dispatch({ type: 'update', fld: 'orgdesc', val: e.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Company Mail:</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={info.email}
                            onChange={(e) => dispatch({ type: 'update', fld: 'email', val: e.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="contact" className="form-label">Contact:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="contact"
                            name="contact"
                            value={info.contact}
                            onChange={(e) => dispatch({ type: 'update', fld: 'contact', val: e.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="industry" className="form-label">Industry Domain:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="industry"
                            name="industry"
                            value={info.industry}
                            onChange={(e) => dispatch({ type: 'update', fld: 'industry', val: e.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="orgwebsite" className="form-label">Organization Website:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="orgwebsite"
                            name="orgwebsite"
                            value={info.orgwebsite}
                            onChange={(e) => dispatch({ type: 'update', fld: 'orgwebsite', val: e.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="city" className="form-label">City:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="city"
                            name="city"
                            value={info.city}
                            onChange={(e) => dispatch({ type: 'update', fld: 'city', val: e.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="orgaddress" className="form-label">Company Address:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="orgaddress"
                            name="orgaddress"
                            value={info.orgaddress}
                            onChange={(e) => dispatch({ type: 'update', fld: 'orgaddress', val: e.target.value })}
                        />
                    </div>
                    <div className="button-group">
                        <button type="submit" className="btn btn-primary" onClick={(e) => sendData(e)}>Submit</button>
                        <button type="button" className="btn btn-secondary" onClick={() => dispatch({ type: 'reset' })}>Clear</button>
                    </div>
                </form>
            </div>
        </div>
    );
}