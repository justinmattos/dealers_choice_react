import React from 'react';
import { months } from './months.js';
import TaskForm from './TaskForm.jsx';

const TaskDetail = ({ currTask, editTask, deleteTask }) => {
  const {
    taskName,
    dueDate,
    taskDetail,
    category: { categoryName },
  } = currTask;
  const dueDateDay = dueDate.getDate(),
    dueDateMonth = months[dueDate.getMonth()],
    dueDateYear = dueDate.getFullYear();
  return (
    <div className="task-box">
      <div className="task-detail">
        <h2>Task Details</h2>
        <p className="task-title">{taskName}</p>
        <p className="task-category">
          <small>CATEGORY: </small>
          {categoryName}
        </p>
        <p className="task-date">
          <small>DUE: </small>
          {dueDateMonth} {dueDateDay}, {dueDateYear}
        </p>
        <p>{taskDetail}</p>
        <button onClick={() => deleteTask(currTask.id)}>DELETE TASK</button>
      </div>
      <TaskForm currTask={currTask} formMethod={editTask} />
    </div>
  );
};

export default TaskDetail;
