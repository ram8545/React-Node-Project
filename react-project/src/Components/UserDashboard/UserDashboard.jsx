import React, { useEffect, useState } from "react";
import "./UserDashboard.css";
import { API } from "../../api/api";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchUsers = async () => {
      try {
        const response = await API.getUsers();
        setUsers(response);
      } catch (error) {
        console.error("Error fetching users:", error);
        if (error.status === 401) {
          // Token expired or invalid
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login");
        } else {
          setErrorMessage(error.message || "Failed to load users.");
        }
      }
    };

    fetchUsers();
  }, [navigate]);

  return (
    <div className="user-dashboard">
      <h1>User Dashboard</h1>
      {errorMessage && <p className="error">{errorMessage}</p>}

      <div className="user-dashboard-header">
        <div>Email</div>
        <div>Name</div>
        <div>Role</div>
        <div>Phone</div>
        <div>Status</div>
        <div>Action</div>
      </div>

      {users.map((user) => (
        <div className="user-dashboard-row" key={user.id}>
          <div>{user.email}</div>
          <div>{user.name}</div>
          <div>{user.role}</div>
          <div>{user.phone || "N/A"}</div>
          <div>{user.active ? "Active" : "Inactive"}</div>
          <div>
            <Link to={`/edit/${user.id}`}>
              <button className="action-btn">Edit</button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
