import React, { Component } from 'react';
import './App.css';

import TaskList from '../TaskList/TaskList';
import NewTaskForm from '../NewTaskForm/NewTaskForm';
import Footer from '../Footer/Footer';
class App extends Component {
  state = {
    tasks: [
      this.createItem('Выполнить все задания', new Date('2022-12-20T00:10:56')),
      this.createItem('Пройти все ревью', new Date('2022-12-20T00:20:00')),
      this.createItem('Найти работу'),
    ],
    filter: 'all',
  };
  
  createItem (label, dateCreate = new Date()){
    return {
      id: new Date().getMilliseconds() + Math.floor(Math.random() * 1000000 + 1000000),
      label,
      dateCreate,
      done: false
    }
  };
  
  deleteItem = (id) => {
    this.setState(({tasks}) => {
      const newTaskData = tasks.filter(el => el.id !== id);
      return {
        tasks: newTaskData
      };
    });
  };
  
  onAddItem = (text) => {
    const newItem = this.createItem(text);
    this.setState(({tasks}) => {
      const newData = [
        ...tasks,
        newItem
      ];

      return {
        tasks: newData
      }
    })
  }

  toggleProperty = (arr, id, propName) => {
    const idx = arr.findIndex(el => el.id === id);

    const oldItem = arr[idx];
    const newItem = {
      ...oldItem, 
      [propName]: !oldItem[propName]
    };

    return [
      ...arr.slice(0, idx),
      newItem,
      ...arr.slice(idx + 1)
    ];
  }

  onToggleDone = (id) => {
    this.setState(({tasks}) => {
      return {
        tasks: this.toggleProperty(tasks, id, 'done')
      }
    })
  }

  allDeleteItems = () => {
    this.setState(({tasks}) => {
      const completedTasks = tasks.filter(task => !task.done);

      return {
        tasks: completedTasks
      };
    })
  };

  onChangeFilter = (filterValue) => {
    this.setState({filter: filterValue});
  }

  filter = (items, filter) => {
    switch(filter) {
      case 'all': 
        return items;
      case 'active':
        return items.filter(task => !task.done);
      case 'completed':
        return items.filter(task => task.done)
      default:
        return items;
    }
  };
    
  render() {
    const {tasks, filter} = this.state;
    const visibleItems = this.filter(tasks, filter);
    let countItems = tasks.filter(el => !el.done).length;
    
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm onAddItem={this.onAddItem}/>
        </header>
        <section className="main">
          <TaskList 
            tasks={visibleItems}
            onDeleted={this.deleteItem}
            onToggleDone={this.onToggleDone}/>
          <Footer 
            countItems={countItems}
            allDeleteItems={this.allDeleteItems}
            onChangeFilter={this.onChangeFilter}
            filter={filter}/>
        </section>
      </section>
    );
  };
};

export default App;
