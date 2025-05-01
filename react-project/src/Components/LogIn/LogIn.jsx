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
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateEmail = (email) => {
    const re = /^\S+@\S+\.\S+$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8 && /\d/.test(password);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setSubmitted(false);
    setEmailError("");
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitted(false);
    setPasswordError("");
  };

  const submithandler = async (e) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");

    let valid = true;

    // Validate email and password
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      valid = false;
    }

    if (!validatePassword(password)) {
      setPasswordError(
        "Password must be at least 8 characters long and include a number."
      );
      valid = false;
    }

    if (!valid) return;

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
      <h1>Login </h1>
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
            className={`floating-input ${email ? "has-value" : ""} ${
              emailError ? "error-input" : ""
            }`}
            required
          />
          <label>
            Email Address <span style={{ color: "#4ecdc4" }}>*</span>
          </label>
          {emailError && <p className="error-text">{emailError}</p>}
        </div>

        <div className="input-group" style={{ position: "relative" }}>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={handlePassword}
            className={`floating-input ${password ? "has-value" : ""} ${
              passwordError ? "error-input" : ""
            }`}
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
          {passwordError && <p className="error-text">{passwordError}</p>}
        </div>

        <div>
          <input type="button" value="Login" onClick={submithandler} />
        </div>
        <p>
          Don’t have an account? <Link to="/">SignUp now</Link>
        </p>
        <p>
          Forgot your password? <Link to="/recover">Recover here</Link>
        </p>
      </form>
    </div>
  );
};

export default LogIn;
