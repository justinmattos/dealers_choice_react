import React from 'react';

const TaskForm = ({ currTask, formMethod }) => {
  const nameProps = currTask
    ? { defaultValue: currTask.taskName }
    : { placeholder: 'Enter a Task Name' };
  const categoryProps = currTask
    ? { defaultValue: currTask.category.categoryName }
    : { placeholder: 'Enter a Category for this Task' };
  return (
    <div className="task-form">
      <h2>{currTask ? 'Edit this Task' : 'Add a Task'}</h2>
      <input {...nameProps} id="taskName" type="text"></input>
      <input {...categoryProps} id="taskCategory" type="text"></input>
      <input
        id="dueDate"
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
        id="taskDetail"
      ></textarea>
      <button
        name="newTaskSubmit"
        onClick={currTask ? () => formMethod(currTask.id) : formMethod}
      >
        Submit
      </button>
    </div>
  );
};

export default TaskForm;
