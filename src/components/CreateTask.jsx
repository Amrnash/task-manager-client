import React from "react";

const CreateTask = (props) => {
  return (
    <div className="create-task">
      <input type="text" ref={props.taskInputRef}/>
      <button onClick={(e) => props.handleCreateTask(e)}>Create Task</button>
    </div>
  );
};

export default CreateTask;
