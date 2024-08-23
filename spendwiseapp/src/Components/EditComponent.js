import { useEffect, useReducer,useState} from "react";
import { Link, useNavigate} from "react-router-dom";

export default function EditComponent(){
    const transactionid= localStorage.getItem("editid");
    const today = new Date().toISOString().slice(0, 10);
    const init={
        edesc: "",
        edate: "",
        tid: "",
        amount: 0,
        pcid: "",
      }
    
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
    const [categories, setCategories] = useState([]);
    const navigate=useNavigate();
    const [showNotification, setShowNotification] = useState(false); 
    const [deleteNotification, setDeleteNotification] = useState(false); 

    useEffect(() => {
        const fetchExpenseDetails = async () => {
            try {
                const response =  await fetch(`http://localhost:8080/getExpenseById/${transactionid}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch expense details");
                }
                const expenseData = await response.json();
                console.log(expenseData);
                dispatch({ type: 'update', fld: 'edesc', val: expenseData.edesc });
                dispatch({ type: 'update', fld: 'edate', val: expenseData.edate });
                dispatch({ type: 'update', fld: 'tid', val: expenseData.tid });
                dispatch({ type: 'update', fld: 'amount', val: expenseData.amount });
                dispatch({ type: 'update', fld: 'pcid', val: expenseData.pcid });
            } catch (error) {
                console.error("Error fetching expense details:", error);
            }
        };

        fetchExpenseDetails();
    }, [transactionid]);
  
    useEffect(() => {
        const fetchCategories = async () => {
          try {
            const response = await fetch("http://localhost:8080/getAllCategory"); 
            if (!response.ok) {
              throw new Error("Failed to fetch categories");
            }
            const data = await response.json();
            setCategories(data);
          } catch (error) {
            console.error("Error fetching categories:", error);
          }
        };
    
        fetchCategories();
      }, []);

      const sendData = (e) => {
        e.preventDefault();

        const dataToSend = {
            edesc:info.edesc,
            edate:info.edate,
            tid:info.tid,
            uid:transactionid,
            pcid:info.pcid,
            amount:info.amount
           };

        const reqdata = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataToSend)
        };
        console.log(dataToSend)
        fetch("http://localhost:8080/updateExpense", reqdata)
            .then(resp => {
                if (!resp.ok) {
                    return resp.json().then(error => {
                        throw new Error(JSON.stringify(error.errors));
                    });
                }
                return resp.json();
            })
            .then(data => {
                console.log("Success:", data)
                setShowNotification(true); // Show notification
                setTimeout(() => {
                  setDeleteNotification(false); // Hide notification after 5 seconds
                  navigate("/singleuser")
                }, 3000);
                dispatch({ type: "reset" });
                
            })
            .catch(error => console.error("Error:", error.message));
    }



    const deleData = (e) => {
      e.preventDefault();

      const dataToSend = {
          uid:transactionid,
         };

      const reqdata = {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dataToSend)
      };
      console.log(dataToSend)
      fetch("http://localhost:8080/deleteExpense", reqdata)
          .then(resp => {
              if (!resp.ok) {
                  return resp.json().then(error => {
                      throw new Error(JSON.stringify(error.errors));
                  });
              }
              return resp.json();
          })
          .then(data => {
              console.log("Success:", data)
              setDeleteNotification(true); // Show notification
              setTimeout(() => {
                setShowNotification(false); // Hide notification after 5 seconds
                navigate("/expenlogs")
              }, 3000);
              dispatch({ type: "reset" });
              
          })
          .catch(error => console.error("Error:", error.message));
  }


    return(<div>
        <nav className="navbar navbar-expand-sm bg-light mb-3">
            <div className="container-fluid">
                <ul className='navbar-nav'>
                    <li className='nav-item'>
                        <Link to="/addexpense" className='nav-link px-3'  >Add Expenses</Link>
                    </li>
                    <li className='nav-item'>
                        <Link to="/expenlogs" className='nav-link px-3' >Expense History</Link>
                    </li>
                    <li className='nav-item'>
                        <Link to="/" className='nav-link px-3' >Update Profile</Link>
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
        <div className="container mt-5">
      <h2>Update Expenses  {transactionid}</h2>

      {showNotification && (
          <div className="alert alert-success" role="alert">
            Record updated successfully!
          </div>
        )}
        {deleteNotification && (
          <div className="alert alert-success" role="alert">
            Record Delete successfully!
          </div>
        )}

      <form >
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="edesc">Description</label>
              <input
                type="text"
                className="form-control"
                id="edesc"
                name="edesc"
                value={info.edesc}
                onChange={(e) => dispatch({ type: 'update', fld: 'edesc', val: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="edate">Date</label>
              <input
                type="date"
                className="form-control"
                id="edate"
                name="edate"
                value={info.edate}
                onChange={(e) => dispatch({ type: 'update', fld: 'edate', val: e.target.value })}
                max={today}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="tid">Transaction ID</label>
              <input
                type="text"
                className="form-control"
                id="tid"
                name="tid"
                value={info.tid}
                onChange={(e) => dispatch({ type: 'update', fld: 'tid', val: e.target.value })}
                required
                placeholder="Optional"
              />
            </div>
          </div>

          
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="uid">Amount</label>
              <input
                type="number"
                className="form-control"
                id="uid"
                name="uid"
                value={info.amount}
                onChange={(e) => dispatch({ type: 'update', fld: 'amount', val: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="pcid">Personal Category</label>
              <select
                className="form-control"
                id="pcid"
                name="pcid"
                value={info.pcid}
                onChange={(e) => dispatch({ type: 'update', fld: 'pcid', val: e.target.value })}
                required
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                 <option key={category.pcId} value={category.pcId}>
                 {category.cname}
               </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary" onClick={(e) => sendData(e)}>Submit</button><span>   </span>
        <button type="submit" className="btn btn-danger" onClick={(e) => deleData(e)}>Delete</button>
      </form>
      
    </div>

    </div>)
}