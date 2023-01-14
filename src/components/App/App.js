import { Component } from 'react';

import './App.css';
import NewTaskForm from '../NewTaskForm/NewTaskForm';
import TaskList from '../TaskList/TaskList';
import Footer from '../Footer/Footer';

class App extends Component {
  state = {
    tasks: [],
    filter: 'all'
  };

  interval = 0;

  componentDidMount() {
    this.interval = setInterval(this.runTimer, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  createItem = (label, dateCreate = new Date()) => ({
    id:
      new Date().getMilliseconds() +
      Math.floor(Math.random() * 1000000 + 1000000),
    label,
    dateCreate,
    time: 0,
    pause: false,
    done: false
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

  runTimer = () => {
    const { tasks } = this.state;
    const newTasks = tasks.map((el) => {
      if (el.time === 0) {
        return el;
      }
      if (!el.pause) {
        el.time -= 1;
      }
      return el;
    });

    this.setState({ tasks: newTasks });
  };

  stopTimer = (id) => {
    this.setState(({ tasks }) => ({
      tasks: this.togglePause(tasks, id, true)
    }));
  };

  startTimer = (id) => {
    this.setState(({ tasks }) => ({
      tasks: this.togglePause(tasks, id, false)
    }));
  };

  togglePause = (tasks, id, isPause) => {
    const idx = tasks.findIndex((el) => el.id === id);
    const newObj = [{ ...tasks[idx], pause: isPause }];
    return [...tasks.slice(0, idx), ...newObj, ...tasks.slice(idx + 1)];
  };

  render() {
    const { tasks, filter } = this.state;
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
            stopTimer={this.stopTimer}
            startTimer={this.startTimer}
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
