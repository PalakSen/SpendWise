import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function OrganizationRequest() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const deptid= JSON.parse(localStorage.getItem("LoggedUser")).user.organizationheads[0].orgid;
  useEffect(() => {
    const fetchRequests = () => {
      fetch("http://localhost:8080/getRequest/"+deptid)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch requests");
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          setRequests(data || []);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    };

    fetchRequests();
  }, [deptid]);
//
  const viewDetails = (request) => {
    console.log("View Details clicked for request ID:", request.reqId);
    localStorage.setItem("requestDetails", JSON.stringify(request));
    navigate("/funds"); 
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="container-fluid">
      <nav className="navbar navbar-expand-sm navbar-light bg-light mb-3">
        <div className="container-fluid">
          <ul className="navbar-nav">
          <li className='nav-item'>
                        <Link to="/organization" className='nav-link px-3' >Home</Link>
                    </li>
                        <li className='nav-item'>
                            <Link to="/orgrequest" className='nav-link px-3'>Requests</Link>
                        </li>
                        <li className='nav-item'>
                            <Link to="/adddepartment" className='nav-link px-3'>Add Department</Link>
                        </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/logout" className="nav-link">
                <button className="btn btn-primary btn-sm">Logout</button>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <div className="row">
        {requests.length === 0 ? (
          <div className="col-12">
            <div className="alert alert-info">No requests available.</div>
          </div>
        ) : (
          requests.map((request) => (
            <div className="col-md-6 mb-4" key={request.reqId}>
              <div className="card shadow-lg border-light rounded">
                <div className="card-header bg-primary text-white">
                  <h5 className="card-title mb-0">Department: {request.department.deptname}</h5>
                </div>
                <div className="card-body">
                  <table className="table table-bordered table-hover">
                    <tbody>
                      <tr>
                        <th scope="row">Request ID</th>
                        <td>{request.reqId}</td>
                      </tr>
                      <tr>
                        <th scope="row">Amount</th>
                        <td>{request.reqAmt.toLocaleString()} ₹</td>
                      </tr>
                      <tr>
                        <th scope="row">Date</th>
                        <td>{new Date(request.reqDate).toLocaleDateString()}</td>
                      </tr>
                      <tr>
                        <th scope="row">Description</th>
                        <td>{request.reqDesc}</td>
                      </tr>
                      <tr>
                        <th scope="row">Status</th>
                        <td>{request.reqStatus === 0 ? "Pending" : "Approved"}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="card-footer text-center">
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => viewDetails(request)}
                  >
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
