import { React, useState } from "react";
import "../pages/pages.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = async () => {
    try {
      const res = await axios.post(
        "https://todoapp-backend-yw3u.onrender.com/api/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem("token", res.data.accessToken);
      window.location = "/todo";
    } catch (err) {
      alert(err.response.data.message);
      console.log(err.response.data);
    }
  };

  const navigate = useNavigate();

  const navigateRegister = (e) => {
    e.preventDefault();
    navigate("/register");
  };
  return (
    <div className="login-main">
      <div className="login-card">
        <div className="login-headre">
          <h2>Login</h2>
        </div>
        <div className="login-inputs">
          <input
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="login-btns">
          <button onClick={loginHandler}>Login</button>

          <p onClick={navigateRegister}>
            <span>Regsiter!</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
