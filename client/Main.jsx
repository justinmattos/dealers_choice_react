import axios from 'axios';
import React, { Component } from 'react';
import TaskDetail from './TaskDetail.jsx';
import TaskList from './TaskList.jsx';

class Main extends Component {
  state = {
    loading: true,
    taskList: [],
    currTask: null,
  };
  componentDidMount = () => {
    this.refreshTasks();
  };
  refreshTasks = () => {
    axios
      .get('/api/tasks')
      .then((tasks) => {
        const taskList = tasks.data;
        taskList.sort((taskA, taskB) => {
          const [dateA, dateB] = [taskA.dueDate, taskB.dueDate].map(
            (date) => new Date(date)
          );
          return dateA - dateB;
        });
        this.setState({ loading: false, taskList });
        if (window.location.hash) {
          this.selectTask(window.location.hash.slice(1) * 1);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  selectTask = (id) => {
    if (id) {
      axios.get(`/api/tasks/${id}`).then((task) => {
        const currTask = task.data;
        currTask.dueDate = new Date(`${currTask.dueDate}T12:00:00.000Z`);
        this.setState({ currTask });
        window.location.hash = id;
      });
    } else {
      this.setState({ currTask: null });
      window.location.hash = '';
    }
  };
  addTask = () => {};
  editTask = (id) => {
    const [taskName, categoryName, dueDate, taskDetail] = [
      '#taskName',
      '#taskCategory',
      '#dueDate',
      '#taskDetail',
    ].map((selector) => document.querySelector(selector).value);
    const data = { taskName, categoryName, dueDate, taskDetail };
    axios
      .put('/api/tasks/:id', data)
      .then((updatedTask) => {
        updatedTask = updatedTask.data;
        this.setState({ currTask: updatedTask });
      })
      .catch((err) => {
        console.error(err);
      });
  };
  render = () => {
    const { loading, taskList, currTask } = this.state;
    return (
      <div>
        <nav onClick={() => this.selectTask(null)}>
          {currTask ? 'BACK' : ''}
        </nav>
        {loading ? (
          'Loading Tasks . . . '
        ) : currTask ? (
          <TaskDetail currTask={currTask} editTask={this.editTask} />
        ) : (
          <TaskList
            taskList={taskList}
            selectTask={this.selectTask}
            addTask={this.addTask}
          />
        )}
      </div>
    );
  };
}

export default Main;
