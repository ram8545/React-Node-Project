import React, { useState } from "react";
import { API } from "../../api/api";
import "./Recover.css";

const Recover = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const validateEmail = (email) => {
    const re = /^\S+@\S+\.\S+$/;
    return re.test(email);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setSubmitted(false);
    setEmailError("");
    setSuccessMessage("");
    setErrorMessage("");
  };

  const handleSubmit = async () => {
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    setSubmitted(true);
    setEmailError("");
    setLoading(true);

    try {
      await API.forgotPassword(email);
      setSuccessMessage("Password reset link sent successfully.");
      setEmail("");
    } catch (error) {
      setErrorMessage(
        error?.response?.data?.message ||
          error.message ||
          "Something went wrong, please try again."
      );
    } finally {
      setLoading(false);
    }
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
          id="email"
          type="email"
          value={email}
          onChange={handleEmail}
          className={`floating-input ${email ? "has-value" : ""} ${
            emailError ? "error-input" : ""
          }`}
          required
        />
        <label htmlFor="email">
          Email Address <span style={{ color: "#4ecdc4" }}>*</span>
        </label>
        {emailError && <p className="error-text">{emailError}</p>}
      </div>

      {successMessage && <p className="success-text">{successMessage}</p>}
      {errorMessage && <p className="error-text">{errorMessage}</p>}

      <div className="button-container">
        <button
          type="button"
          onClick={handleSubmit}
          className="submit-button"
          disabled={loading}
        >
          {loading ? "Sending..." : "Reset Password"}
        </button>
      </div>
    </div>
  );
};

export default Recover;
