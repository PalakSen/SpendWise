import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function OrganizationHead() {

    const [orghead,setOrgHead]=useState(null);

    useEffect ( () => {
        const userid= JSON.parse(localStorage.getItem("LoggedUser")).user.uid;
        fetch("https://localhost:7211/api/Logins/GetUserWithID?id="+userid)
        .then( resp => resp.json())
        .then( obj =>{
            localStorage.setItem("loggedOrgHead",JSON.stringify(obj))
            setOrgHead(obj);
        })
    },[])


    return (<div>
        <nav className="navbar navbar-expand-sm bg-light mb-3">
            <div className="container-fluid">
                <ul className='navbar-nav'>
                    <li className='nav-item'>
                        <Link to="/" className='nav-link px-3' >Departments</Link>
                    </li>
                    <li className='nav-item'>
                        <Link to="Login" className='nav-link px-3' >Expense Report</Link>
                    </li>
                    <li className='nav-item'>
                        <Link to="/" className='nav-link px-3' >Requests</Link>
                    </li>
                    <li className='nav-item'>
                        <Link to="/" className='nav-link px-3' >Add Department</Link>
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
        <h1>Organization Component</h1>
        <p>Welcome {orghead && orghead.fname }{ orghead && orghead.lname }</p>
    </div>)
}