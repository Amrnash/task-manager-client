import React from "react";

const Login = (props) => {
  const handleLoginEmailChange = (e) => {
    props.setLoginForm({ ...props.loginForm, email: e.target.value });
  };
  const handleLoginPasswordChange = (e) => {
    props.setLoginForm({ ...props.loginForm, password: e.target.value });
  };
  return (
    <div>
      <form className="form" onSubmit={props.handleLogin}>
        <div className="form-content">
          <h1>Login</h1>
            {props.loginErrors.status && <p className="error-msg">*Email or password is invalid</p>}
          <div className="form-group">
            <p className="input-title">Email</p>
            <input type="text" onChange={(e) => handleLoginEmailChange(e)} />
          </div>
          <div className="form-group">
            <p className="input-title">Password</p>
            <input
              type="password"
              onChange={(e) => handleLoginPasswordChange(e)}
            />
          </div>
          <button>Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
