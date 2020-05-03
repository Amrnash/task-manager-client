import React, { useEffect } from "react";
import CreateTask from "./CreateTask";
import TasksList from "./TasksList";
const axios = require("axios").default;
const baseUrl = "http://localhost:5000";

const MyTasks = (props) => {
  useEffect(() => {
    axios
      .get(baseUrl + "/tasks", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => props.setTasks(res.data))
      .catch((err) => console.log(err.response));
  }, []);
  return (
    <div className="wrapper">
      <CreateTask
        handleCreateTask={props.handleCreateTask}
        taskInputRef={props.taskInputRef}
      />
      <TasksList
        tasks={props.tasks}
        handleDeleteTask={props.handleDeleteTask}
        handleCompleteTask={props.handleCompleteTask}
      />
    </div>
  );
};

export default MyTasks;
