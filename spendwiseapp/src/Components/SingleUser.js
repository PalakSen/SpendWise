import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function SingleUser() {
    const userid = JSON.parse(localStorage.getItem("LoggedUser")).user.uid;
    const fname = JSON.parse(localStorage.getItem("LoggedUser")).user.fname;
    const lname = JSON.parse(localStorage.getItem("LoggedUser")).user.lname;
    const [requests, setRequests] = useState([]);
    //const [remainamount,setremainamt] = useState([]);
    // useEffect(()=>{
    //     fetch("http://localhost:8080/getRemainAmount/4")
    //     .then(resp => resp.json())
    //     .then(data => setremainamt(data))
    // },[]);
    //console.log(remainamount)
    useEffect(() => {
        const fetchRequests = () => {
            fetch("http://localhost:8080/getBudget/"+userid)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Failed to fetch requests");
                    }
                    return response.json();
                })
                .then((data) => {
                    console.log(data);
                    setRequests(data || []);
                })
                .catch((err) => {
                    console.log(err.message);
                });
        };

        fetchRequests();
    }, []);

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
                            <Link to="/updateSingleUSer" className='nav-link px-3'>Update Profile</Link>
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
            <div className="text-center mb-4">
                        <h2 className="display-6">Welcome, {fname} {lname}!</h2>    
                    </div>
            <div className="row">
                {requests.length === 0 ? (
                    <div className="col-12">
                        <div className="alert alert-info">No Budget available.</div>
                    </div>
                ) : (
                    requests.map((request, index) => (
                        <div className="col-md-4 col-sm-6 mb-3" key={index}>
                            <div className="card shadow-sm border-light rounded" style={{ fontSize: '0.9rem' }}>
                                <div className="card-header bg-primary text-white p-2">
                                    <h5 className="card-title mb-0" style={{ fontSize: '1rem' }}>Personal Category: {request.personalCategory?.cname || 'Food'}</h5>
                                </div>
                                <div className="card-body p-2">
                                    <table className="table table-sm table-bordered table-hover">
                                        <tbody>
                                            <tr>
                                                <th scope="row">Start Date</th>
                                                <td>{new Date(request.startDate).toLocaleDateString()}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">End Date</th>
                                                <td>{new Date(request.endDate).toLocaleDateString()}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Amount</th>
                                                <td>{request.bamount} ₹</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Remaing Amount</th>
                                                <td>{request.bamount} ₹ </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="card-footer text-center p-2">
                                    <button className="btn btn-outline-primary btn-sm">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
