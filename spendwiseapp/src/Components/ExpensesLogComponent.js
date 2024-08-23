import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function ExpensesLog() {
    const [records, setRecords] = useState([]);
    const sortedRecords = [...records].sort((a, b) => new Date(b.edate) - new Date(a.edate));
    const navigate = useNavigate();
    useEffect(() => {
        const deptid = JSON.parse(localStorage.getItem("LoggedUser")).user.uid;
        console.log(deptid)
        fetch("http://localhost:8080/getExpense/"+deptid)
            .then((resp) => resp.json())
            .then((data) => {
                if (data.length > 0) {
                    setRecords(data);
                }
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    const edit = (tid) => {
        console.log("Edit clicked for transaction ID:", tid);
        localStorage.setItem("editid",tid);
        navigate("/editexpense");
    };

    return (
        <div>
             <nav className="navbar navbar-expand-sm bg-light mb-3">
            <div className="container-fluid">
                <ul className='navbar-nav'>
                <li className='nav-item'>
                            <Link to="/singleuser" className='nav-link px-3'  >Home</Link>
                        </li>
                    <li className='nav-item'>
                        <Link to="/addexpense" className='nav-link px-3' >Add Expenses</Link>
                    </li>
                    <li className='nav-item'>
                        <Link to="/setbudget" className='nav-link px-3' >Set Budget</Link>
                    </li>
                    <li className='nav-item'>
                        <Link to="/updateSingleUSer" className='nav-link px-3' >Update Profile</Link>
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
        <table className="table table-custom table-striped table-hover table-bordered table-responsive">
    <thead className="thead-dark">
        <tr >
            <th>Date</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Transaction Id</th>
            <th>Category</th>
            <th>Update</th>
        </tr>
    </thead>
    <tbody>
        {sortedRecords.map((record, i) => (
            <tr key={i}>
                <td>{record.edate}</td>
                <td>{record.edesc}</td>
                <td>{record.amount}₹</td>
                <td>{record.tid}</td>
                <td>{record.personalCategory?.cname || 'N/A'}</td>
                <td><button className='btn btn-secondary btn-sm' onClick={() => edit(record.exId)}>Edit</button></td>
            </tr>
        ))}
    </tbody>
</table>


        </div>
    );
}
