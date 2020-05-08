import React, { useEffect, useReducer, useRef, useState } from "react";
import CreateTask from "./CreateTask";
import TasksList from "./TasksList";
import tasksReducer from "../reducers/tasksReducer";
const axios = require("axios").default;
const baseUrl = "http://localhost:5000";

const MyTasks = (props) => {
  const initialState = {
    tasks: [],
    error: {},
  };
  const taskInputRef = useRef(null);
  const [state, dispatch] = useReducer(tasksReducer, initialState);
  useEffect(() => {
    axios
      .get(baseUrl + "/tasks", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => dispatch({ type: "FETCH_TASKS", payload: res.data }))
      .catch((err) => dispatch({ type: "ERROR", payload: err.response.data }));
  }, []);

  const handleCreateTask = (e) => {
    axios
      .post(
        baseUrl + "/tasks",
        { description: taskInputRef.current.value },
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      )
      .then((res) => dispatch({ type: "ADD_TASKS", payload: res.data }))
      .catch((err) => console.log(err.response));
  };

  const handleCompleteTask = (e) => {
    let taskArray = state.tasks;
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
        dispatch({ type: "COMPLETE_TASK", payload: taskArray });
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
        let filteredTasks = state.tasks.filter((task) => {
          return task._id !== id;
        });
        console.log(filteredTasks);
        dispatch({ type: "DELETE_TASK", payload: filteredTasks });
      })
      .catch((err) => console.log(err.response));
  };
  return (
    <div className="wrapper">
      <CreateTask
        handleCreateTask={handleCreateTask}
        taskInputRef={taskInputRef}
      />
      <TasksList
        tasks={state.tasks}
        handleDeleteTask={handleDeleteTask}
        handleCompleteTask={handleCompleteTask}
      />
    </div>
  );
};

export default MyTasks;
