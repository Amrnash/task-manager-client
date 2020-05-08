import React, { useReducer, useState } from "react";
import loginFormReducer from "../reducers/loginFormReducer";
import { useHistory } from "react-router-dom";
const axios = require("axios").default;
const baseUrl = "http://localhost:5000";

const Login = (props) => {
  const history = useHistory();
  const initialState = {
    email: "",
    password: "",
  };
  const [error, setError] = useState("");
  const [loginFormState, dispatchForm] = useReducer(
    loginFormReducer,
    initialState
  );
  const handleLogin = (e) => {
    e.preventDefault();
    console.log(loginFormState);
    axios
      .post(baseUrl + "/users/login", loginFormState)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        props.setForceUpdate(!props.forceUpdate);
        history.replace("/myTasks");
      })
      .catch((err) => {
        console.log(err.response);
        setError("something went wrong");
      });
  };
  return (
    <div>
      <form className="form" onSubmit={handleLogin}>
        <div className="form-content">
          <h1>Login</h1>
          {error && <p className="error-msg">*{error}</p>}
          <div className="form-group">
            <p className="input-title">Email</p>
            <input
              type="text"
              onChange={(e) =>
                dispatchForm({ type: "EMAIL_CHANGE", payload: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <p className="input-title">Password</p>
            <input
              type="password"
              onChange={(e) =>
                dispatchForm({
                  type: "PASSWORD_CHANGE",
                  payload: e.target.value,
                })
              }
            />
          </div>
          <button>Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
