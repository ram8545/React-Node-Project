import React, { useState } from "react";
import "./LogIn.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../../api/api";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [apiMessage, setApiMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setSubmitted(false);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitted(false);
  };

  const submithandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);

      const data = await API.login(formData);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setSubmitted(true);
      setError(false);
      setApiMessage(data.message || "User logged in successfully!");
      setEmail("");
      setPassword("");

      navigate("/dashboard");
    } catch (err) {
      console.error("Error submitting form:", err);
      setSubmitted(false);
      setError(true);
      setApiMessage(err.message || "Something went wrong. Try again.");
    }
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <p>Welcome back. Please login to your account.</p>
      <div className="message">
        {error && (
          <div className="error">
            <h2>{apiMessage}</h2>
          </div>
        )}
        {submitted && (
          <div className="success">
            <h2>{apiMessage}</h2>
          </div>
        )}
      </div>
      <form>
        <div className="input-group">
          <input
            type="email"
            value={email}
            onChange={handleEmail}
            className={`floating-input ${email ? "has-value" : ""}`}
            required
          />
          <label>
            Email Address <span style={{ color: "#4ecdc4" }}>*</span>
          </label>
        </div>

        <div className="input-group" style={{ position: "relative" }}>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={handlePassword}
            className={`floating-input ${password ? "has-value" : ""}`}
            required
          />
          <label>
            Password <span style={{ color: "#4ecdc4" }}>*</span>
          </label>
          <span
            onClick={togglePasswordVisibility}
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
            }}
          >
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
          </span>
        </div>

        <div>
          <input type="button" value="Login" onClick={submithandler} />
        </div>
        <p>
          Don’t have an account? <Link to="/">SignUp now</Link>
          <br />
          Forgot your password? <Link to="/recover">Recover here</Link>
        </p>
      </form>
    </div>
  );
};

export default LogIn;
