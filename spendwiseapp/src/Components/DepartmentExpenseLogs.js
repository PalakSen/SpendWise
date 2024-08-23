import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function DepartmentExpensesLogs() {
    const dept=JSON.parse(localStorage.getItem("Department"));
    const [records, setRecords] = useState([]);
    console.log(dept)
    useEffect(() => {
        fetch("http://localhost:8080/getExpenseByDeptId/"+dept.deptid)
            .then((resp) => resp.json())
            .then((data) => {
                if (data.length > 0) {
                    setRecords(data);
                }
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, [dept.deptid]);

    return (
        <div>
            <nav className="navbar navbar-expand-sm bg-light mb-3">
                <div className="container-fluid">
                    <ul className='navbar-nav'>
                    <li className='nav-item'>
                        <Link to="/department" className='nav-link px-3' >Home</Link>
                    </li>
                        <li className='nav-item'>
                            <Link to="/makeRequest" className='nav-link px-3'>Requests</Link>
                        </li>
                        <li className='nav-item'>
                            <Link to="/adddeptexp" className='nav-link px-3'>Add Expense</Link>
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
                    <tr>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Transaction Id</th>
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    {records.map((record, i) => (
                        <tr key={i}>
                            <td>{record.expDate}</td>
                            <td>{record.expPurpose}</td>
                            <td>{record.expAmt} ₹</td>
                            <td>{record.transactionId}</td>
                            <td>{record.orgCategory?.orgcName || 'N/A'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
