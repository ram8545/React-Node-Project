import React, { useState } from "react";
import "./SignUp.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [apiMessage, setApiMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleName = (e) => {
    setName(e.target.value);
    setSubmitted(false);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitted(false);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setSubmitted(false);
  };

  const validateEmail = (email) => /^\S+@\S+\.\S+$/.test(email);

  const validatePassword = (password) =>
    password.length >= 8 &&
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\|]).{8,}$/.test(
      password
    );

  const validateName = (name) => name.trim().length > 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;

    setNameError("");
    setEmailError("");
    setPasswordError("");

    if (!validateName(name)) {
      setNameError("Name is required.");
      valid = false;
    }

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      valid = false;
    }

    if (!validatePassword(password)) {
      setPasswordError(
        "Password must contain 8 or more characters and at least one number, at least one captal latter."
      );
      valid = false;
    }

    if (!valid) return;

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);

      const res = await fetch("https://backend-xz4u.onrender.com/signup", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setSubmitted(true);
        setApiMessage(data.message || "User successfully registered!");
        setName("");
        setEmail("");
        setPassword("");
        setError(false);
      } else {
        setSubmitted(false);
        setError(true);
        setApiMessage(data.message || "Signup failed.");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      setError(true);
      setApiMessage("Something went wrong. Try again later.");
    }
  };

  return (
    <div className="signup">
      <div>
        <h1>SignUp Page</h1>
      </div>
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
            type="text"
            value={name}
            onChange={handleName}
            className={`floating-input ${name ? "has-value" : ""}`}
          />
          <label>
            Name <span style={{ color: "#4ecdc4" }}>*</span>
          </label>
          {nameError && <p className="error-text">{nameError}</p>}
        </div>

        <div className="input-group">
          <input
            type="email"
            value={email}
            onChange={handleEmail}
            className={`floating-input ${emailError ? "error-input" : ""} ${
              email ? "has-value" : ""
            }`}
            required
          />
          <label className={`floating-label ${email ? "active" : ""}`}>
            Email Address
          </label>
          {emailError && <p className="error-text">{emailError}</p>}
        </div>

        <div className="input-group" style={{ position: "relative" }}>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={handlePassword}
            className={`floating-input ${passwordError ? "error-input" : ""} ${
              password ? "has-value" : ""
            }`}
            required
          />
          <label className={`floating-label ${password ? "active" : ""}`}>
            Password
          </label>
          <span
            onClick={togglePasswordVisibility}
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
              zIndex: 2,
            }}
          >
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
          </span>
          {passwordError && <p className="error-text">{passwordError}</p>}
        </div>

        <div>
          <input type="button" value="SignIn" onClick={handleSubmit} />
        </div>
        <p>
          Already have an account? <a href="/login">LogIn</a>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
