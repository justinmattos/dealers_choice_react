import React from 'react';

const TaskForm = ({ currTask, formMethod }) => {
  return (
    <div className="task-form">
      <h2>{currTask ? 'Edit this Task' : 'Add a Task'}</h2>
      <input
        placeholder={currTask ? '' : 'Enter a Task Name'}
        defaultValue={currTask ? currTask.taskName : ''}
        name="taskName"
        type="text"
      ></input>
      <input
        placeholder={currTask ? '' : 'Enter a Category for this Task'}
        defaultValue={currTask ? currTask.category.categoryName : ''}
        name="taskCategory"
        type="text"
      ></input>
      <input
        name="taskDate"
        type="date"
        defaultValue={
          currTask
            ? currTask.dueDate.toISOString().slice(0, 10)
            : new Date().toISOString().slice(0, 10)
        }
      ></input>
      <textarea
        placeholder={currTask ? '' : 'Enter Task Details Here (Optional)'}
        defaultValue={currTask ? currTask.taskDetail : ''}
        name="taskDetail"
      ></textarea>
      <button name="newTaskSubmit" onClick={formMethod}>
        Submit
      </button>
    </div>
  );
};

export default TaskForm;
