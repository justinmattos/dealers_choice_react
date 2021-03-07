import axios from 'axios';
import React, { Component } from 'react';
import TaskForm from './TaskForm.jsx';
import TaskList from './TaskList.jsx';

class Main extends Component {
  state = {
    loading: true,
    taskList: [],
    currTask: null,
  };
  componentDidMount = () => {
    axios
      .get('/api/tasks')
      .then((tasks) => {
        const taskList = tasks.data;
        this.setState({ loading: false, taskList });
      })
      .catch((err) => {
        console.error(err);
      });
  };
  render = () => {
    const { loading, taskList, currTask } = this.state;
    return (
      <div>
        <TaskForm />
        {loading ? 'Loading Tasks . . . ' : <TaskList />}
      </div>
    );
  };
}

export default Main;
