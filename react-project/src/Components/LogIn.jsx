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
  const [showPassword, setShowPassword] = useState(false);

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
    if (email === "" || password === "") {
      setError(true);
    }
    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);

      const res = await fetch("http://localhost:8000/login", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setSubmitted(data);

      setEmail("");
      setPassword("");
      setError(false);
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  const errorMessage = () => {
    return (
      <div
        className="error"
        style={{
          display: error ? "" : "none",
        }}
      >
        <h1>Please enter all the fields</h1>
      </div>
    );
  };

  const successMessage = () => {
    return (
      <div
        className="success"
        style={{
          display: submitted ? "" : "none",
        }}
      >
        <h1>User logged in successfully!</h1>
      </div>
    );
  };

  return (
    <>
      <div className="login">
        <h1>Login Page</h1>
        <div className="message">
          {errorMessage()}
          {successMessage()}
        </div>
        <form>
          <div>
            <input
              type="email"
              value={email}
              placeholder="Email Address"
              onChange={handleEmail}
            />
          </div>
          <div>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              placeholder="Enter your password"
              onChange={handlePassword}
            />
            <span
              onClick={togglePasswordVisibility}
              style={{ marginLeft: "-30px", cursor: "pointer" }}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </span>
          </div>
          <div>
            <input type="button" value="login" onClick={submithandler} />
          </div>
          <p>
            Already have an account? <a href="/">SignUp</a>
          </p>
        </form>
      </div>
    </>
  );
};

export default LogIn;
