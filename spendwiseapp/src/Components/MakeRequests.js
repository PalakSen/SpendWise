import React from "react";
import { useReducer } from "react";
import { Link } from "react-router-dom";

export default function MakeRequests() {
    const deptid = JSON.parse(localStorage.getItem("Department")).deptid;

    const init = {
        reqamt: '',
        reqdesc: '',
        reqdate: '',
        deptid: '',
        reqstatus: 1
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch({ type: 'update', fld: name, val: value });
    };

    const sendData = (e) => {
        e.preventDefault();
        const dataToSend = {
            amt: info.reqamt,
            desc: info.reqdesc,
            date: info.reqdate,
            deptid: deptid,
            status: 0
        };
        const reqdata = {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(dataToSend)
        };
        fetch("http://localhost:8080/makereq", reqdata)
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
                            <Link to="/department" className='nav-link px-3'>Home</Link>
                        </li>
                        <li className='nav-item'>
                            <Link to="/makeRequest" className='nav-link px-3'>Request</Link>
                        </li>
                        <li className='nav-item'>
                            <Link to="/adddeptexp" className='nav-link px-3'>Add Expenses</Link>
                        </li>
                        <li className='nav-item'>
                            <Link to="/" className='nav-link px-3'>Update Profile</Link>
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
            <div className="container mt-3">
                <div className="card">
                    <div className="card-header text-center">
                        <h4>Make a Request</h4>
                    </div>
                    <div className="card-body">
                        <form onSubmit={sendData}>
                            <div className="mb-3">
                                <label htmlFor="reqamt" className="form-label">Requested Amount</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="reqamt"
                                    name="reqamt"
                                    value={info.reqamt}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="reqdesc" className="form-label">Request Description</label>
                                <textarea
                                    className="form-control"
                                    id="reqdesc"
                                    name="reqdesc"
                                    rows="3"
                                    value={info.reqdesc}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="reqdate" className="form-label">Request Date</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="reqdate"
                                    name="reqdate"
                                    value={info.reqdate}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="d-grid">
                                <button type="submit" className="btn btn-primary">Request Amount</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
