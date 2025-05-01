import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { API } from "../../api/api";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await API.getUsers();
        setUsers(response);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>Email</div>
        <div>Name</div>
        <div>Role</div>
        <div>Phone</div>
        <div>Status</div>
        <div>Action</div>
      </div>

      {users.map((user) => (
        <div className="dashboard-row" key={user.id}>
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
