import React, { Component } from 'react';
import './App.css';

import TaskList from '../TaskList/TaskList';
import NewTaskForm from '../NewTaskForm/NewTaskForm';
import Footer from '../Footer/Footer';
class App extends Component {
  state = {
    tasks: [
      {
        'id': 1,
        'label': "Completed task",
        'done': false,
      },
      {
        'id': 2,
        'label': "Update task",
        'done': true,
      },
      {
        'id': 3,
        'label': "Delete task",
        'done': false,
      }
    ]
  };

  deleteItem = (id) => {
    this.setState(({tasks}) => {
      const newTaskData = tasks.filter(el => el.id !== id);
      
      return {
        tasks: newTaskData
      };
    });
  };

  render() {
    const {tasks} = this.state;
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm />
        </header>
        <section className="main">
          <TaskList tasks={tasks} onDeleted={this.deleteItem}/>
          <Footer />
        </section>
      </section>
    );
  }
}

export default App;
