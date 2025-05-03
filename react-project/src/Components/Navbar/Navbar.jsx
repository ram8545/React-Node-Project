import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const dropdownRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    setIsLoggedIn(!!token);
    setUserName(user?.name?.split(" ")[0] || "User");
  }, [location]);

  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));
      setIsLoggedIn(!!token);
      setUserName(user?.name || "User");
    };

    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setShowDropdown(false);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">Webwaps</div>
      <ul className="navbar-links">
        {isLoggedIn ? (
          <li className="dropdown" ref={dropdownRef}>
            <button
              className="dropdown-toggle"
              onClick={() => setShowDropdown((prev) => !prev)}
            >
              Hello, {userName}
            </button>
            {showDropdown && (
              <ul className="dropdown-menu">
                <li>
                  <Link to="/" onClick={() => setShowDropdown(false)}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard" onClick={() => setShowDropdown(false)}>
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/user-dashboard"
                    onClick={() => setShowDropdown(false)}
                  >
                    User Dashboard
                  </Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="logout-button">
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </li>
        ) : (
          <li>
            <Link to="/login" className="login-button">
              Login
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
