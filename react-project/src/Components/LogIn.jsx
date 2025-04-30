import React, { useState } from "react";
import "./LogIn.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [apiMessage, setApiMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

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

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      valid = false;
    }

    if (!validatePassword(password)) {
      setPasswordError(
        "Password must be at least 8 characters and include a number."
      );
      valid = false;
    }

    if (!valid) return;

    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);

      const res = await fetch("https://backend-xz4u.onrender.com/login", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setSubmitted(true);
        setError(false);
        setApiMessage(data.message || "User logged in successfully!");
        setEmail("");
        setPassword("");
      } else {
        setSubmitted(false);
        setError(true);
        setApiMessage(data.message || "Login failed.");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      setError(true);
      setApiMessage("Something went wrong. Try again.");
    }
  };

  return (
    <div className="login">
      <h1>Login Page</h1>
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
          Don’t have an account? <a href="/">SignUp</a>
        </p>
      </form>
    </div>
  );
};

export default LogIn;
