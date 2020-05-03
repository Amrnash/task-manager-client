import React from "react";
import { Link } from "react-router-dom";
const Nav = (props) => {
  return (
    <nav>
      <div className="container">
        <div className="nav-flex-container">
          <div className="logobox">
            <Link to="/" className="logo">
              Task Manager
            </Link>
          </div>
          {!localStorage.getItem("token") && (
            <div className="nav-links">
              <Link to="/signup" className="nav-links__onelink">
                SignUp
              </Link>
              <Link to="/login" className="nav-links__onelink">
                Login
              </Link>
            </div>
          )}
          {localStorage.getItem("token") && (
            <div className="nav-links">
              <Link
                to="/landing"
                className="nav-links__onelink"
                onClick={props.handleLogout}
              >
                Logout
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
