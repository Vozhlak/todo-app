import React from 'react'
import './TaskList.css';

import Task from '../Task/Task';


const TaskList = ({tasks, onDeleted}) => {
  
  const task = tasks.map(el => {
    return <Task key={el.id} label={el.label} onDeleted={() => onDeleted(el.id)}/>;
  });

  return (
    <ul className='todo-list'>
      {task}
    </ul>
  )
}

export default TaskList;
