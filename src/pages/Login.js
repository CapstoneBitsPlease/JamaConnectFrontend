import React from "react";
import "../styles/pages/Login.style.sass";

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-wrapper">
        <h1>Authentication</h1>
        <label htmlFor="username">Username</label>
        <input
          type="username"
          name="username"
          id="username"
          placeholder="Username"
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
        />
        <div className = "login-forgot">
          <p>Forgot your password?</p>
          <button>Sign in</button>
        </div>
        <div className="login-line">
          <hr /> OR <hr />
        </div>
        <button>Sign in with OAuth</button>
      </div>
    </div>
  );
};

export default Login;
