/* eslint-disable react/no-unused-state */
import { Component } from 'react';

import './App.css';
import NewTaskForm from '../NewTaskForm/NewTaskForm';
import TaskList from '../TaskList/TaskList';
import Footer from '../Footer/Footer';

class App extends Component {
  state = {
    tasks: [],
    idTimers: [],
    filter: 'all'
  };

  createItem = (label, dateCreate = new Date()) => ({
    id:
      new Date().getMilliseconds() +
      Math.floor(Math.random() * 1000000 + 1000000),
    label,
    dateCreate,
    time: 0,
    done: false,
    isEdit: false,
    isRunTimer: false,
    isTimer: false
  });

  deleteItem = (id) => {
    this.setState(({ tasks }) => {
      const newTaskData = tasks.filter((el) => el.id !== id);
      return {
        tasks: newTaskData
      };
    });
  };

  onAddItem = (text, time = 0) => {
    const newItem = this.createItem(text);
    newItem.time = Number.isNaN(time) ? 0 : time;
    newItem.isTimer = time > 0;
    this.setState(({ tasks }) => {
      const newData = [newItem, ...tasks];

      return {
        tasks: newData
      };
    });
  };

  toggleProperty = (arr, id, propName) => {
    const idx = arr.findIndex((el) => el.id === id);

    const oldItem = arr[idx];
    const newItem = {
      ...oldItem,
      [propName]: !oldItem[propName]
    };

    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  };

  onToggleDone = (id) => {
    this.setState(({ tasks }) => ({
      tasks: this.toggleProperty(tasks, id, 'done')
    }));
  };

  toggleIsEditTask = (id) => {
    this.setState(({ tasks }) => ({
      tasks: this.toggleProperty(tasks, id, 'isEdit')
    }));
  };

  onEditTask = (id, newText) => {
    const { tasks } = this.state;
    const idx = tasks.findIndex((item) => item.id === id);
    const newItem = {
      ...tasks[idx],
      label: newText
    };

    this.setState({
      tasks: [...tasks.slice(0, idx), newItem, ...tasks.slice(idx + 1)]
    });
  };

  allDeleteItems = () => {
    this.setState(({ tasks }) => {
      const completedTasks = tasks.filter((task) => !task.done);
      return {
        tasks: completedTasks
      };
    });
  };

  onChangeFilter = (filterValue) => {
    this.setState({ filter: filterValue });
  };

  filter = (items, filter) => {
    switch (filter) {
      case 'all':
        return items;
      case 'active':
        return items.filter((task) => !task.done);
      case 'completed':
        return items.filter((task) => task.done);
      default:
        return items;
    }
  };

  addTimerId = (taskId, timerId) => {
    const { idTimers } = this.state;
    const newItem = {
      idTask: taskId,
      idTimer: timerId
    };
    let newArr = [];
    const prev = idTimers.filter((item) => item.idTask !== newItem.idTask);
    newArr = [...prev, newItem];

    this.setState({ idTimers: newArr });
  };

  stopTimer = (timerID) => {
    const valueIdTimer = timerID.idTimer;
    clearInterval(valueIdTimer);
  };

  startTimer = (id) => {
    let interval = 0;
    interval = setInterval(() => {
      this.setState(({ tasks }) => {
        const newTasks = tasks.map((task) => {
          if (task.id === id) {
            if (task.time !== 0) {
              task.time -= 1;
            }
            if (task.time === 0) {
              task.done = true;
            }
          }
          return task;
        });
        return {
          tasks: newTasks
        };
      });
    }, 1000);
    this.addTimerId(id, interval);
  };

  toggleActiveTimer = (id) => {
    this.setState(({ tasks }) => {
      const newTasks = tasks.map((task) => {
        if (task.id === id) {
          task.isRunTimer = !task.isRunTimer;
        }
        return task;
      });
      return {
        tasks: newTasks
      };
    });
  };

  render() {
    const { tasks, filter, idTimers } = this.state;

    const visibleItems = this.filter(tasks, filter);
    const countItems = tasks.filter((el) => !el.done).length;

    return (
      <section className='todoapp'>
        <header className='header'>
          <h1>todos</h1>
          <NewTaskForm onAddItem={this.onAddItem} />
        </header>
        <section className='main'>
          <TaskList
            tasks={visibleItems}
            onDeleted={this.deleteItem}
            onToggleDone={this.onToggleDone}
            toggleIsEditTask={this.toggleIsEditTask}
            onEditTask={this.onEditTask}
            stopTimer={this.stopTimer}
            startTimer={this.startTimer}
            idTimers={idTimers}
            toggleActiveTimer={this.toggleActiveTimer}
          />
          <Footer
            countItems={countItems}
            allDeleteItems={this.allDeleteItems}
            onChangeFilter={this.onChangeFilter}
            filter={filter}
          />
        </section>
      </section>
    );
  }
}

export default App;
