import { Link } from "react-router-dom";

export default function Admin() {
    return (<div>
        <nav className="navbar navbar-expand-sm bg-light mb-3">
            <div className="container-fluid">
                <ul className='navbar-nav'>
                    <li className='nav-item'>
                        <Link to="/" className='nav-link px-3' >Add Coategory</Link>
                    </li>
                    <li className='nav-item'>
                        <Link to="Login" className='nav-link px-3' >Add Admin</Link>
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
    </div>)
}