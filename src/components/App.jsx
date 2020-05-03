import React, { useState, useRef } from "react";
import { Switch, Route, useHistory, Redirect } from "react-router-dom";
import Nav from "./Nav";
import Landing from "./Landing";
import SignUp from "./SignUp";
import Login from "./Login";
import MyTasks from "./MyTasks";
const axios = require("axios").default;
const baseUrl = "http://localhost:5000";

const App = () => {
  const [forceUpdate, setForceUpdate] = useState(true);
  const [signupForm, setSignupForm] = useState({});
  const [signupErrors, setSignupErrors] = useState({});
  const [loginForm, setLoginForm] = useState({});
  const [loginErrors, setLoginErrors] = useState({});
  const [logedin, setLogedin] = useState(false);
  const [tasks, setTasks] = useState([]);
  const history = useHistory();
  const taskInputRef = useRef(null);

  const handleSignup = (e) => {
    e.preventDefault();
    axios
      .post(baseUrl + "/users", signupForm)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        setForceUpdate(!forceUpdate);
        history.replace("/myTasks");
      })
      .catch((err) => {
        if (err.response.data.errors) {
          setSignupErrors(err.response.data.errors);
        }
      });
  };
  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post(baseUrl + "/users/login", loginForm)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        setLogedin(true);
        history.replace("/myTasks");
      })
      .catch((err) => {
        console.log(err.response);
        if (err.response) {
          setLoginErrors(err.response);
        }
      });
  };
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
  const handleCreateTask = (e) => {
    axios
      .post(
        baseUrl + "/tasks",
        { description: taskInputRef.current.value },
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      )
      .then((res) => setTasks([...tasks, res.data]))
      .catch((err) => console.log(err.response));
  };
  const handleCompleteTask = (e) => {
    let taskArray = tasks;
    let index = taskArray.findIndex((task) => task._id === e.target.id);
    axios
      .patch(
        baseUrl + "/tasks/" + e.target.id,
        { completed: true },
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      )
      .then((res) => {
        taskArray[index].completed = true;
        setTasks(taskArray);
        setForceUpdate(!forceUpdate);
      })
      .catch((err) => console.log(err.response));
  };
  const handleDeleteTask = (e) => {
    let id = e.target.id;
    axios
      .delete(baseUrl + "/tasks/" + id, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
        let filteredTasks = tasks.filter((task) => {
          return task._id !== id;
        });
        console.log(filteredTasks);
        setTasks(filteredTasks);
      })
      .catch((err) => console.log(err.response));
  };
  return (
    <>
      <Nav handleLogout={handleLogout} logedin={logedin} />
      <Switch>
        <Route path="/signup">
          <SignUp
            setSignupForm={setSignupForm}
            signupForm={signupForm}
            handleSignup={handleSignup}
            signupErrors={signupErrors}
          />
        </Route>
        <Route path="/login">
          <Login
            loginForm={loginForm}
            setLoginForm={setLoginForm}
            handleLogin={handleLogin}
            loginErrors={loginErrors}
          />
        </Route>
        <Route path="/myTasks">
          {localStorage.getItem("token") ? (
            <MyTasks
              handleCreateTask={handleCreateTask}
              taskInputRef={taskInputRef}
              tasks={tasks}
              setTasks={setTasks}
              handleDeleteTask={handleDeleteTask}
              handleCompleteTask={handleCompleteTask}
            />
          ) : (
            <Redirect to="/" />
          )}
        </Route>
        <Route path="/">
          <Landing />
        </Route>
      </Switch>
    </>
  );
};

export default App;
