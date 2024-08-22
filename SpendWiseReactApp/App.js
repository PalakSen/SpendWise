import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Login from './Components/HomeComponent';
import LoginComponent from './Components/LoginComponent';
import { Link, Route, Routes } from 'react-router-dom';
import Admin from './Components/AdminComponent';
import OrganizationHead from './Components/OrganizationHeadComponent';
import Departemnt from './Components/DepartmentHeadComponent';
import SingleUser from './Components/SingleUser';
import { useSelector } from 'react-redux';
import LogoutComponent from './Components/LogoutComponent';
import OrganizationReg from './Components/OrganizationReg';



function App() {
  const mystate = useSelector((state) => state.logged)
  return (
    <div className="App">
      <div style={{ display: mystate.loggedIn ? "none" : "block" }}>
        <nav className="navbar navbar-expand-sm bg-light mb-3">
          <div className="container-fluid">
            <ul className='navbar-nav'>
              <li className='nav-item'>
                <Link to="/" className='nav-link px-3' >Home</Link>
              </li>
              <li className='nav-item'>
                <Link to="Login" className='nav-link px-3' >Features</Link>
              </li>
              <li className='nav-item'>
                <Link to="/" className='nav-link px-3' >About us</Link>
              </li>
              <li className='nav-item'>
                <Link to="/" className='nav-link px-3' >Contact</Link>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link to='/login' className="nav-link">
                  <button className='btn btn-primary btn-sm'>Login</button>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="login" element={<LoginComponent />} />
        <Route path="admin" element={<Admin />} />
        <Route path="singleuser" element={<SingleUser />} />
        <Route path="organization" element={<OrganizationHead />} />
        <Route path="department" element={<Departemnt />} />
        <Route path="logout" element={<LogoutComponent />} />
        <Route path="orgreg" element={<OrganizationReg/>} />
      </Routes>

    </div>
  );
}

export default App;
