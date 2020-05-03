import React from "react";

const SignUp = (props) => {
  const handleNameChange = (e) => {
    props.setSignupForm({ ...props.signupForm, name: e.target.value });
  };
  const handlePasswordChange = (e) => {
    props.setSignupForm({ ...props.signupForm, password: e.target.value });
  };
  const handleEmailChange = (e) => {
    props.setSignupForm({ ...props.signupForm, email: e.target.value });
  };
  return (
    <div>
      <form className="form" onSubmit={(e) => props.handleSignup(e)}>
        <div className="form-content">
          <h1>Sign Up</h1>
          <div className="form-group">
            <p className="input-title">Name</p>
            <input type="text" onChange={(e) => handleNameChange(e)} />
          </div>
          <div className="form-group">
            <p className="input-title">Email</p>
            <input type="text" onChange={(e) => handleEmailChange(e)} />
            {props.signupErrors.email && <p className="error-msg">*Email is invalid</p>}
          </div>
          <div className="form-group">
            <p className="input-title">Password</p>
            <input type="password" onChange={(e) => handlePasswordChange(e)} />
            {props.signupErrors.email && <p className="error-msg">*Invalid Password</p>}
          </div>
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
