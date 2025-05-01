import React, { useState } from "react";
import "./Recover.css";

const Recover = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [submitted, setSubmitted] = useState(false); // Added missing state

  const validateEmail = (email) => {
    const re = /^\S+@\S+\.\S+$/;
    return re.test(email);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setSubmitted(false);
    setEmailError("");
  };

  const submithandler = () => {
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    setSubmitted(true);
    setEmailError("");
    alert("Password reset link sent (demo)");
  };

  return (
    <div className="recover">
      <h1>Forgot Password?</h1>
      <p>
        To reset your password, please enter your email address associated with
        your account.
      </p>
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
      <div className="button-container">
        <button type="button" onClick={submithandler} className="submit-button">
          Reset Password
        </button>
      </div>
    </div>
  );
};

export default Recover;
