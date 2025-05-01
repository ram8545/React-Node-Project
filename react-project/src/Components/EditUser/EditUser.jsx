import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API } from "../../api/api";
import "./EditUser.css";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "user",
    active: 1,
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await API.getUser(id);
        setFormData(user);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "active" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.updateUser(id, formData);
      alert("User updated successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update user.");
    }
  };

  return (
    <div className="edit-user-container">
      <form className="edit-user-form" onSubmit={handleSubmit}>
        <h2>Edit User</h2>

        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter full name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter email address"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            placeholder="Enter phone number"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Role</label>
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className="form-group">
          <label>Status</label>
          <select name="active" value={formData.active} onChange={handleChange}>
            <option value={1}>Active</option>
            <option value={0}>Inactive</option>
          </select>
        </div>

        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditUser;
