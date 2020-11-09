import React from "react";
import {useStoreActions} from "easy-peasy";
import "../styles/pages/Login.style.sass";

const Login = () => {
  const userNameRef = React.createRef();
  const passwordRef = React.createRef();
  const organizationRef = React.createRef();
  const login = useStoreActions(actions => actions.accountStore.login);

  const loginUser = () => {
    
    const loginInfo = {
      userName : userNameRef.current.value,
      password : passwordRef.current.value,
      organization : organizationRef.current.value
    }

    login(loginInfo);
   
  };
  const handleForm = (event) => {
    event.preventDefault();
    loginUser();
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
          <button id ="forgot">Forgot your password?</button>
          <button id ="signin" onClick={loginUser} type="submit">
            Sign in
          </button>
        </div>
        <div className="login-line">
          <hr /> OR <hr />
        </div>
        <button id="OAuth">Sign in with OAuth</button>
      </form>
    </div>
  );
};

export default Login;
