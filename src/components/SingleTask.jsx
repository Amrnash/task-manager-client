import React from "react";

const SingleTask = (props) => {
  let isCompleted = !props.task.completed ? "" : "completed";
  return (
    <div className="task-item">
      <span className={isCompleted}>{props.task.description}</span>
      <div className="controls">
        <button className="complete">
          <i
            className="fas fa-check"
            onClick={(e) => props.handleCompleteTask(e)}
            id={props.id}
          ></i>
        </button>
        <button className="delete">
          <i
            className="fas fa-trash-alt"
            onClick={(e) => props.handleDeleteTask(e)}
            id={props.id}
          ></i>
        </button>
      </div>
    </div>
  );
};

export default SingleTask;
