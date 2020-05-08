import React, { useReducer } from "react";
import { useHistory } from "react-router-dom";
import signupFormReducer from "../reducers/signupFormReducer";
const axios = require("axios").default;
const baseUrl = "http://localhost:5000";

const SignUp = (props) => {
  const initialState = {
    name: "",
    email: "",
    password: "",
    errors: {
      emailError: "",
      passwordError: "",
    },
  };
  const history = useHistory();
  const [signupFormState, formDispatch] = useReducer(
    signupFormReducer,
    initialState
  );
  const handleSignup = (e) => {
    e.preventDefault();
    axios
      .post(baseUrl + "/users", signupFormState)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        props.setForceUpdate(!props.forceUpdate);
        history.replace("/myTasks");
      })
      .catch((err) => {
        if (err.response.data.errors) {
          formDispatch({ type: "ERROR", payload: err.response.data.errors });
        }
      });
  };
  return (
    <div>
      <form className="form" onSubmit={(e) => handleSignup(e)}>
        <div className="form-content">
          <h1>Sign Up</h1>
          <div className="form-group">
            <p className="input-title">Name</p>
            <input
              type="text"
              onChange={(e) =>
                formDispatch({ type: "NAME_CHANGE", payload: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <p className="input-title">Email</p>
            <input
              type="text"
              onChange={(e) =>
                formDispatch({ type: "EMAIL_CHANGE", payload: e.target.value })
              }
            />
            {signupFormState.errors.email && (
              <p className="error-msg">*Email is invalid</p>
            )}
          </div>
          <div className="form-group">
            <p className="input-title">Password</p>
            <input
              type="password"
              onChange={(e) =>
                formDispatch({
                  type: "PASSWORD_CHANGE",
                  payload: e.target.value,
                })
              }
            />
            {signupFormState.errors.password && (
              <p className="error-msg">*Invalid Password</p>
            )}
          </div>
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
