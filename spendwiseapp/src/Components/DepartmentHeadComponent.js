import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Department() {
    const userid = JSON.parse(localStorage.getItem("LoggedUser")).user.uid;
    const deptHead = JSON.parse(localStorage.getItem("LoggedUser")).user;
    const [dept, setDept] = useState();

    localStorage.setItem("Department", JSON.stringify(dept));

    useEffect(() => {
        fetch("http://localhost:8080/getdeptid/" + userid)
            .then((resp) => resp.json())
            .then((data) => {
                setDept(data);
                console.log(data);
            })
            .catch((error) => console.error("Error fetching department data:", error));
    }, [userid]);

    return (
        <div>
            <nav className="navbar navbar-expand-sm bg-light mb-3">
                <div className="container-fluid">
                    <ul className='navbar-nav'>
                        <li className='nav-item'>
                            <Link to="/adddeptexp" className='nav-link px-3'>Add Expenses</Link>
                        </li>
                        <li className='nav-item'>
                            <Link to="/makeRequest" className='nav-link px-3'>Request</Link>
                        </li>
                        <li className='nav-item'>
                            <Link to="/depexplogs" className='nav-link px-3'>Expense History</Link>
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
            <div className="d-flex justify-content-center align-items-center" style={{ height: "70vh" }}>
                <h1>Welcome, {deptHead.fname} {deptHead.lname}</h1>
            </div>
        </div>
    );
}
