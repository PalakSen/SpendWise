import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function RequestDetails() {
  const [requestDetails, setRequestDetails] = useState(null);
  const [fStartDate, setFStartDate] = useState("");
  const [fEndDate, setFEndDate] = useState("");
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(false);
  useEffect(() => {
    const details = localStorage.getItem("requestDetails");
    if (details) {
      const parsedDetails = JSON.parse(details);
      setRequestDetails(parsedDetails);
      setFStartDate(parsedDetails.fStartDate || ""); 
      setFEndDate(parsedDetails.fEndDate || ""); 
    }
  }, []);

  const handleAccept = () => {
    if (!fEndDate) {
      console.error("Funding End Date is required");
      return;
    }

    const sendData = {
      fundamt: requestDetails.reqAmt,
      deptid: requestDetails.department.deptid,
      orgidfk: 3,
      fstartdate: fStartDate,
      fenddate: fEndDate,
      reqid:requestDetails.reqId,
    };

    const reqdata = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sendData),
    };

    console.log("Sending Data:", sendData); // Debug log

    fetch("http://localhost:8080/addFunds", reqdata)
      .then((resp) => {
        if (!resp.ok) {
          return resp.json().then((error) => {
            throw new Error(JSON.stringify(error.errors));
          });
        }
        return resp.json();
      })
      .then((data) => {
        console.log("Success:", data);
        setShowNotification(true);
        setTimeout(() => {
          setShowNotification(false); 
          navigate("/organization");
        }, 3000);
      })
      .catch((error) => console.error("Error:", error.message));
  };

  const handleReject = () => {
    console.log("Request rejected");

    const reqdata = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
  

    fetch("http://localhost:8080/reject/"+requestDetails.reqId,reqdata)
      .then((resp) => {
        if (!resp.ok) {
          return resp.json().then((error) => {
            throw new Error(JSON.stringify(error.errors));
          });
        }
        return resp.json();
      })
      .then((data) => {
        console.log("Success:", data);
        setShowNotification(true);
        setTimeout(() => {
          setShowNotification(false); 
          navigate("/organization");
        }, 3000);
      })
      .catch((error) => console.error("Error:", error.message));
  };

  const today = new Date().toISOString().split("T")[0];

  if (!requestDetails) {
    return (
      <div className="alert alert-warning">
        No details available. Please select a request first.
      </div>
    );
  }

  return (
    <div>
      <nav className="navbar navbar-expand-sm navbar-light bg-light mb-3">
        <div className="container-fluid">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/organization" className="nav-link px-3">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/orgrequest" className="nav-link px-3 active">
                Requests
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/adddepartment" className="nav-link px-3">
                Add Department
              </Link>
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
      <div className="container mt-4">
        <h2 className="mb-4">Request Details</h2>
        {showNotification && (
          <div className="alert alert-success" role="alert">
            Processing The Request...
          </div>
        )}
        <table className="table table-bordered table-hover">
          <tbody>
            <tr>
              <th scope="row" className="bg-light">Department Name</th>
              <td>{requestDetails.department.deptname}</td>
            </tr>
            <tr>
              <th scope="row" className="bg-light">Amount</th>
              <td>{requestDetails.reqAmt.toLocaleString()} ₹</td>
            </tr>
            <tr>
              <th scope="row" className="bg-light">Request Date</th>
              <td>{new Date(requestDetails.reqDate).toLocaleDateString()}</td>
            </tr>
            <tr>
              <th scope="row" className="bg-light">Description</th>
              <td>{requestDetails.reqDesc}</td>
            </tr>
            <tr>
              <th scope="row" className="bg-light">Funding Start Date</th>
              <td>
                <input
                  type="date"
                  value={fStartDate}
                  onChange={(e) => setFStartDate(e.target.value)}
                  min={today}
                  className="form-control"
                  required
                />
              </td>
            </tr>
            <tr>
              <th scope="row" className="bg-light">Funding End Date</th>
              <td>
                <input
                  type="date"
                  value={fEndDate}
                  onChange={(e) => setFEndDate(e.target.value)}
                  min={fStartDate}
                  className="form-control"
                  required
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div className="d-flex justify-content-between mt-4">
          <button className="btn btn-success" onClick={handleAccept}>
            Accept
          </button>
          <button className="btn btn-danger" onClick={handleReject}>
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}
