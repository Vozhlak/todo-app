/* eslint-disable react/no-unused-state */
import { useState } from 'react';

import './App.css';
import NewTaskForm from '../NewTaskForm/NewTaskForm';
import TaskList from '../TaskList/TaskList';
import Footer from '../Footer/Footer';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [idTimers, setIdTimers] = useState([]);
  const [filter, setFilter] = useState('all');

  const allDeleteItems = () => {
    const completedTasks = tasks.filter((task) => !task.done);
    setTasks(completedTasks);
  };

  const onChangeFilter = (filterValue) => {
    setFilter(filterValue);
  };

  const filterTasks = (items, filtered) => {
    switch (filtered) {
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

  const visibleItems = filterTasks(tasks, filter);
  const countItems = tasks.filter((el) => !el.done).length;

  return (
    <section className='todoapp'>
      <header className='header'>
        <h1>todos</h1>
        <NewTaskForm
          tasks={tasks}
          setTasks={setTasks}
        />
      </header>
      <section className='main'>
        <TaskList
          tasks={visibleItems}
          setTasks={setTasks}
          idTimers={idTimers}
          setIdTimers={setIdTimers}
        />
        <Footer
          countItems={countItems}
          allDeleteItems={allDeleteItems}
          onChangeFilter={onChangeFilter}
          filter={filter}
        />
      </section>
    </section>
  );
};

export default App;
