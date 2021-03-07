import React from 'react';

const TaskForm = () => {
  return (
    <div className="task-form">
      <label>Task Name: </label>
      <input name="taskName" type="text"></input>
      <label>Due Date: </label>
      <input name="taskDate" type="date"></input>
    </div>
  );
};

export default TaskForm;
