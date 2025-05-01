import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">Webwaps</div>
      <ul className="navbar-links">
        <li>
          <Link to="/login" className="login-button">
            Login
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
