import { useState } from "react";
import API from "../api/api";
import "../styles/Login.css";

import AuthImage from "../assets/login-register-image.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await API.post(`/users/login`, {
        email,
        password,
      });

      const data = response.data;

      if (data.token) {
        localStorage.setItem("token", "Bearer " + data.token);
        localStorage.setItem("userId", data.user.id);
        window.location.href = "/dashboard";
      } else {
        alert("Not registered. Redirecting to register...");
        window.location.href = "/register";
      }
    } catch (error) {
      alert("Login failed. Please check your credentials.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        {/* Form Block */}
        <div className="login-block">
          <h2 className="login-title">Login</h2>
          <input
            type="text"
            className="login-input"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="login-input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="login-button" onClick={handleLogin}>
            Submit
          </button>
        </div>

        {/* Image Block */}
        <div className="auth-image-container">
          <img src={AuthImage} alt="FocusGate" className="auth-image" />
        </div>
      </div>
    </div>
  );
}

export default Login;