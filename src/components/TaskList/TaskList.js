import React from 'react'
import './TaskList.css';

import Task from '../Task/Task';

const TaskList = ({tasks}) => {
  const task = tasks.map(el => {
    return <li><Task label={el.label}/></li>;
  })

  return (
    <ul className='todo-list'>
      {task}
    </ul>
  )
}

export default TaskList;
