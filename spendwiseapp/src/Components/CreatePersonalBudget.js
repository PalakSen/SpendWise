import { useEffect, useReducer, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function CreatePersonalBudget() {
    const init = {
        bamt: 0,
        sdate: "",
        enddate: "",
        pcid: "",
    };

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

    const userid = JSON.parse(localStorage.getItem("LoggedUser")).user.uid;
    const [info, dispatch] = useReducer(reducer, init);
    const [errors, setErrors] = useState({});
    const [showNotification, setShowNotification] = useState(false); 
    const navigate = useNavigate();

    const validateField = (name, value) => {
        let error = "";

        switch (name) {
            case "bamt":
                if (!value) error = "Budget Amount is required";
                else if (value <= 0)
                    error = "Budget Amount should be greater than 0";
                break;
            case "sdate":
                if (!value) error = "Starting Date for budget is required";
                else if (new Date(value) < new Date())
                    error = "Start Date cannot be in the past";
                break;
            case "enddate":
                if (!value) error = "Ending Date for budget is required";
                else if (new Date(value) <= new Date(info.sdate))
                    error = "End Date should be after Start Date";
                break;
            default:
                break;
        }

        return error;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch({ type: 'update', fld: name, val: value });

        const error = validateField(name, value);
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: error,
        }));
    };

    const validate = () => {
        const newErrors = {};

        Object.keys(info).forEach((key) => {
            const error = validateField(key, info[key]);
            if (error) newErrors[key] = error;
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const sendData = (e) => {
        e.preventDefault();
        if (!validate()) return;

        const dataToSend = {
            bamount: info.bamt,
            sdate: info.sdate,
            edate: info.enddate,
            uid: userid,
            pcid: info.pcid
        };

        const reqdata = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataToSend)
        };

        fetch("http://localhost:8080/addBudget", reqdata)
            .then(resp => {
                if (!resp.ok) {
                    return resp.json().then(error => {
                        throw new Error(JSON.stringify(error.errors));
                    });
                }
                return resp.json();
            })
            .then(data => {
                console.log("Success:", data);
                setShowNotification(true);
                setTimeout(() => {
                    setShowNotification(false);
                    navigate("/singleuser");
                }, 3000);
                dispatch({ type: "reset" });
            })
            .catch(error => console.error("Error:", error.message));
    };

    const [categories, setCategories] = useState([]);
    useEffect(() => {
        const fetchCategories = () => {
            fetch("http://localhost:8080/getAllCategory")
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

    return (
        <div>
            <nav className="navbar navbar-expand-sm bg-light mb-3">
                <div className="container-fluid">
                    <ul className='navbar-nav'>
                        <li className='nav-item'>
                            <Link to="/singleuser" className='nav-link px-3'>Home</Link>
                        </li>
                        <li className='nav-item'>
                            <Link to="/addexpense" className='nav-link px-3'>Add Expense</Link>
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
            <div className="login-card">
                <h1 className="login-title">Budget Creating</h1>
                <div className="login-form-container">
                    {showNotification && (
                        <div className="alert alert-success" role="alert">
                            Budget Added successfully!
                        </div>
                    )}
                    <form className="login-form" noValidate>
                        <div className="mb-3">
                            <label htmlFor="bamt" className="form-label">Budget Amount:</label>
                            <input
                                type="number"
                                className="form-control"
                                id="bamt"
                                name="bamt"
                                value={info.bamt}
                                onChange={handleChange}
                                onBlur={handleChange}
                                required
                            />
                            {errors.bamt && <div className="text-danger">{errors.bamt}</div>}
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

                        <div className="mb-3">
                            <label htmlFor="sdate" className="form-label">Start Date:</label>
                            <input
                                type="date"
                                className="form-control"
                                id="sdate"
                                name="sdate"
                                value={info.sdate}
                                onChange={handleChange}
                                onBlur={handleChange}
                                required
                            />
                            {errors.sdate && <div className="text-danger">{errors.sdate}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="enddate" className="form-label">End Date:</label>
                            <input
                                type="date"
                                className="form-control"
                                id="enddate"
                                name="enddate"
                                value={info.enddate}
                                onChange={handleChange}
                                onBlur={handleChange}
                                required
                            />
                            {errors.enddate && <div className="text-danger">{errors.enddate}</div>}
                        </div>
                        <button type="submit" className="btn btn-primary" onClick={sendData}>Set Budget</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
