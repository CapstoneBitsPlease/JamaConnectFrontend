import React from "react";
import axios from "axios";
import makeToast from "../Toaster";
import "../styles/pages/Login.style.sass";

const Login = () => {
  const userNameRef = React.createRef();
  const passwordRef = React.createRef();
  const organizationRef = React.createRef();

  const loginUser = () => {
    const userName = userNameRef.current.value;
    const password = passwordRef.current.value;
    const organization = organizationRef.current.value;

    axios
      .post(
        `http://127.0.0.1:5000/login/basic?username=${userName}&password=${password}&organization=${organization}`
      )
      .then(() => {
        makeToast("success", "User has been authenticated");
      })
      .catch(() => {
        makeToast("error", "Invalid login");
      });
  };
  const handleForm = (event) => {
    event.preventDefault();
  };

  return (
    <div className="login-container">
      <form className="login-wrapper" onSubmit={handleForm}>
        <h1>Authentication</h1>
        <label htmlFor="username">Username</label>
        <input
          type="username"
          name="username"
          id="username"
          placeholder="Username"
          ref={userNameRef}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          ref={passwordRef}
        />
        <label htmlFor="organization">Organization</label>
        <input
          type="organization"
          name="organization"
          id="organization"
          placeholder="Organization"
          ref={organizationRef}
        />
        <div className="login-forgot">
          <p>Forgot your password?</p>
          <button onClick={loginUser} type="submit">
            Sign in
          </button>
        </div>
        <div className="login-line">
          <hr /> OR <hr />
        </div>
        <button>Sign in with OAuth</button>
      </form>
    </div>
  );
};

export default Login;
