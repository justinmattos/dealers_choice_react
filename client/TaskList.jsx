import React from 'react';
import TaskForm from './TaskForm.jsx';
import { months } from './months';

const TaskList = ({ taskList, selectTask, addTask }) => {
  return (
    <div className="task-box">
      <ul>
        <h2>Current Tasks</h2>
        {taskList.map((task) => {
          const { id, taskName, dueDate } = task;
          const taskDate = new Date(dueDate);
          return (
            <li key={id} onClick={() => selectTask(id)}>
              <p>{taskName}</p>
              <p className="task-date">
                {months[taskDate.getMonth()]} {taskDate.getFullYear()}
              </p>
            </li>
          );
        })}
      </ul>
      <TaskForm formMethod={addTask} />
    </div>
  );
};

export default TaskList;
