import React, { useContext } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { LoginContext } from "./context/LoginContext";

const NavBar = () => {
  const {token,setToken,logOut} = useContext(LoginContext)
  const handleLogout=()=>{
    logOut();
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg bgcolor">
        <div className="container-fluid navcolor">
          <a className="navbar-brand" href="/">
            Navbar
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="/navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item ">
                <a className="nav-link active linkcolor" aria-current="page" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/watchlist">
                  Watchlist
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="/"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Dropdown
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="/">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/">
                      Another action
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="/">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <a href="/" className="nav-link disabled" aria-disabled="true">
                  Disabled
                </a>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
              {token===null&&<Link to='/signup' className="btn btn-success mx-3" type="submit">
                Signup
              </Link>}
              
              {token===null&&<Link to='/login' className="btn btn-success mx-3" type="submit">
                Login
              </Link>}
              
              <p className="logout mx-3">

              {token!==null&&`${token.email}`}
              </p>
              {token!==null&&<Link onClick={handleLogout} to='/' className="btn bstyle btn-danger mx-3" type="submit">
                Logout
              </Link>}
              
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
