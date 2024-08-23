import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function OrganizationHead() {
    const [orgHead, setOrgHead] = useState(null);
    const [departments, setDepartments] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const userid = JSON.parse(localStorage.getItem("LoggedUser")).user.uid;
        const orgid = JSON.parse(localStorage.getItem("LoggedUser")).user.organizationheads[0].orgid;
        console.log(orgid);
        
        fetch("https://localhost:7211/api/Logins/GetUserWithID?id=" + userid)
            .then(resp => resp.json())
            .then(obj => {
                localStorage.setItem("loggedOrgHead", JSON.stringify(obj));
                setOrgHead(obj);
                return fetch("http://localhost:8080/getDepartmnet/" + orgid);
            })
            .then(resp => resp.json())
            .then(departments => {
                setDepartments(departments);
            })
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    
    const viewDetails = (deptid) => {
        localStorage.setItem("deptid", deptid);
        navigate("/explogs");
    };

    return (
        <div>
            <nav className="navbar navbar-expand-sm bg-light mb-3">
                <div className="container-fluid">
                    <ul className='navbar-nav'>
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

            <div className="container">
                {orgHead && (
                    <div className="text-center mb-4">
                        <h2 className="display-6">Welcome, {orgHead.fname} {orgHead.lname}!</h2>    
                    </div>
                )}
                <div className="row">
                    {departments.map(department => (
                        <div className="col-md-4 col-sm-6 mb-3" key={department.deptid}>
                            <div className="card shadow-sm border-light rounded" style={{ fontSize: '0.9rem' }}>
                                <div className="card-header bg-primary text-white p-2">
                                    <h5 className="card-title mb-0" style={{ fontSize: '1rem' }}>Department: {department.deptname}</h5>
                                </div>
                                <div className="card-body p-2">
                                    <table className="table table-sm table-bordered table-hover">
                                        <tbody>
                                            <tr>
                                                <th scope="row">Allocated Funds</th>
                                                <td>{department.allocatedamt} ₹</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Additional Funds</th>
                                                <td>{department.requestedamt} ₹</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Head</th>
                                                <td>{department.uid.fname} {department.uid.lname}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Contact</th>
                                                <td>{department.uid.contact}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">City</th>
                                                <td>{department.uid.city}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="card-footer text-center p-2">
                                <button 
                                   className="btn btn-outline-primary btn-sm" 
                                   
                                   onClick={() => viewDetails(department.deptid)}
                                >
                               View Details
                                </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
