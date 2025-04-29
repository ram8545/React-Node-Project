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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name === "" || email === "" || password === "") {
      setError(true);
      setApiMessage("Please enter all fields.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);

      const res = await fetch("http://localhost:8000/signup", {
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
        <h2>{apiMessage}</h2>
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
        <h2>{apiMessage}</h2>
      </div>
    );
  };

  return (
    <div className="signup">
      <div>
        <h1>SignUp Page</h1>
      </div>
      <div className="message">
        {errorMessage()}
        {successMessage()}
      </div>
      <form>
        <div>
          <input
            type="text"
            name="name"
            value={name}
            placeholder="Enter your name"
            onChange={handleName}
          />
        </div>
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
          <input
            type="button"
            name="button"
            value="SignIn"
            onClick={handleSubmit}
          />
        </div>
        <p>
          Already have an account? <a href="/login">LogIn</a>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
