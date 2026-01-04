import axios from "axios";
import { React, useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const registerHandler = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await axios.post(
        "https://todoapp-backend-yw3u.onrender.com/api/auth/register",
        {
          name,
          email,
          password,
        }
      );
      alert("Registered");
      navigate("/");
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  const navigateLogin = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="register-main">
      <div className="register-card">
        <div className="register-heading">
          <h2>Register</h2>
        </div>
        <div className="register-inputs">
          <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
          <input
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            placeholder="Confirm Password"
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="create-btn">
          <button onClick={registerHandler}>Create Account</button>
          <p>
            Already Have an Account! <span onClick={navigateLogin}>Login</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
