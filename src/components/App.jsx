import React, { useState, useRef, useEffect } from "react";
import { Switch, Route, useHistory, Redirect } from "react-router-dom";
import Nav from "./Nav";
import Landing from "./Landing";
import SignUp from "./SignUp";
import Login from "./Login";
import MyTasks from "./MyTasks";
const axios = require("axios").default;
const baseUrl = "http://localhost:5000";

const App = () => {
  const [forceUpdate, setForceUpdate] = useState(false);
  const handleLogout = () => {
    axios
      .post(
        baseUrl + "/users/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        localStorage.removeItem("token");
        setForceUpdate(!forceUpdate);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };
  return (
    <>
      <Nav handleLogout={handleLogout} />
      <Switch>
        <Route path="/signup">
          {/* i know iam doing it wrong by forcing the component to rerender but
          i couldn't figure it out maybe i get to it later */}
          <SignUp setForceUpdate={setForceUpdate} forceUpdate={forceUpdate} />
        </Route>
        <Route path="/login">
          <Login setForceUpdate={setForceUpdate} forceUpdate={forceUpdate} />
        </Route>
        <Route exact path="/myTasks">
          {localStorage.getItem("token") ? <MyTasks /> : <Redirect to="/" />}
        </Route>
        <Route path="/">
          <Landing />
        </Route>
      </Switch>
    </>
  );
};

export default App;
