import { useEffect, useReducer,useState} from "react";
import { Link, useNavigate} from "react-router-dom";

export default function AddDepartmentExpense(){
    const dept=JSON.parse(localStorage.getItem("Department"));
    console.log(dept)
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
    const [showNotification, setShowNotification] = useState(false);
    const navigate=useNavigate();
    useEffect(() => {
      const fetchCategories = () => {
        fetch("http://localhost:8080/getorgcategory")
          .then((response) => {
            if (!response.ok) {
              throw new Error("Failed to fetch categories");
            }
            return response.json();
          })
          .then((data) => {
            setCategories(data);
          })
          .catch((error) => {
            console.error("Error fetching categories:", error);
          });
      };
    
      fetchCategories();
    }, []);
    

      const sendData = (e) => {
        e.preventDefault();

        const dataToSend = {
          edesc:info.edesc,
          edate:info.edate,
          tid:info.tid,
          deptid:dept.deptid,
          orgcid:info.pcid,
          amount:info.amount
           };
           

        const reqdata = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataToSend)
        };
        console.log(dataToSend)
        fetch("http://localhost:8080/addOrgExpense", reqdata)
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
                setShowNotification(true); 
                setTimeout(() => {
                  setShowNotification(false); 
                  navigate("/singleuser")
                }, 3000);
                dispatch({ type: "reset" });
            })
            .catch(error => console.error("Error:", error.message));
    }


    return (<div>
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
        <div className="container mt-5">
      <h2>Expense</h2>

      {showNotification && (
          <div className="alert alert-success" role="alert">
            Record added successfully!
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
              <label htmlFor="amount">Amount</label>
              <input
                type="number"
                className="form-control"
                id="amount"
                name="amount"
                value={info.amount}
                onChange={(e) => dispatch({ type: 'update', fld: 'amount', val: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="pcid">Category</label>
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
                 <option key={category.orgcId} value={category.orgcId}>
                 {category.orgcName}
               </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary" onClick={(e) => sendData(e)}>Submit</button>
      </form>
      
    </div>

    </div>)
}