import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../Css/Register.css";
import introJs from 'intro.js';
import 'intro.js/introjs.css'; 

const RegisterScreen = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const startIntro = () => {
    introJs().start();
  };
  startIntro();
  const registerHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmpassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("");
      }, 8000);
      return setError("Passwords do not match");
    }

    try {
      const { data } = await axios.post(
        "/auth/register",
        {
          username,
          email,
          password,
        }
      );

      localStorage.setItem("authToken", data.token);


      setTimeout(() => {
        navigate('/');
      }, 1800)

    } catch (error) {

      setError(error.response.data.error);

      setTimeout(() => {
        setError("");
      }, 6000);
    }
  };

  return (
    <div className="Inclusive-register-page">
      <div className="register-big-wrapper">
        <div className="register-banner-section ">
          <img src="register.png" alt="banner" width="490px" />
        </div>
        <div className="section-wrapper">
          <div className="top-suggest_login">
            <span> Have an account? </span>
            <a href="/login">Sign In</a>
          </div>
          <div className="top-register-explain">
            <h2>Welcome to Hutech Blog </h2>
            <p>
              It's easy.
            </p>
          </div>
          <form onSubmit={registerHandler} >
            {error && <div className="error_message">{error}</div>}
            <div className="input-wrapper">
              <input
                data-intro="Enter your name here"
                data-step="1"
                type="text"
                required
                id="name"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label htmlFor="name">Username</label>
            </div>
            <div className="input-wrapper">
              <input
                data-intro="Enter your Email here"
                data-step="2"
                type="email"
                required
                id="email"
                placeholder="abc@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                tabIndex={1}
              />
              <label htmlFor="email">E-mail</label>
            </div>
            <div className="input-wrapper">
              <input
                data-intro="Enter your Password here"
                data-step="3"
                type="password"
                required
                id="password"
                autoComplete="true"
                placeholder="6+ strong characters"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                tabIndex={2}
              />
              <label htmlFor="password">
                Password
              </label>
            </div>
            <div className="input-wrapper">
              <input
                data-intro="Confirm password here"
                data-step="4"
                type="password"
                required
                id="confirmpassword"
                autoComplete="true"
                placeholder="Confirm password"
                value={confirmpassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <label htmlFor="confirmpassword">Confirm Password</label>
            </div>
            <button type="submit"   
            data-intro="Press this button to send"
            data-step="5">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;
