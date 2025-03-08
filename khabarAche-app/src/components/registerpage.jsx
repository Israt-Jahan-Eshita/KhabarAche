import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../components/loginpage.css";
import "boxicons/css/boxicons.min.css"; 

const RegisterPage = () => {
  const [username, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemembar] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4004/api/users", {
        username,
        phone,
        email,
        password,
        remember,
      });

      console.log("Registration Successful:", response);
      navigate("/loginpage");
    } catch (error) {
      console.error("Registration Error:", error);
      alert(error.response?.data?.message || "Registration failed. Try again.");
    }
  };

  return (
    <div className="loginpage">
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <h1>Register</h1>

          <div className="input-box">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <i className="bx bx-user"></i>
          </div>

          <div className="input-box">
            <input
              type="tel"
              name="phone"
              placeholder="Phone (11 digits)"
              pattern="[0-9]{11}"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <i className="bx bx-phone"></i>
          </div>

          <div className="input-box">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <i className="bx bx-envelope"></i>
          </div>

          <div className="input-box">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <i className="bx bx-lock"></i>
          </div>

          <div className="remember-forgot">
            <label>
              <input
                type="checkbox"
                name="remember"
                checked={remember}
                onChange={(e) => setRemembar(e.target.checked)}
              />
              Remember Me
            </label>
          </div>

          <button type="submit" className="logbutton">
            Create Account
          </button>

          <div className="register-link">
            <p>
              Already have an account? <Link to="/loginpage">Login</Link>
            </p>
          </div>
        </form>

        <footer>
          <h3>&copy; All Rights Reserved</h3>
        </footer>
      </div>
    </div>
  );
};

export default RegisterPage;
