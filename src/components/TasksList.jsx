import React from "react";
import SingleTask from "./SingleTask";
const TasksList = (props) => {
  return (
    <div className="tasks-list">
      {props.tasks.map((task) => (
        <SingleTask
          key={task["_id"]}
          task={task}
          handleDeleteTask={props.handleDeleteTask}
          handleCompleteTask={props.handleCompleteTask}
          id={task["_id"]}
        />
      ))}
    </div>
  );
};

export default TasksList;
