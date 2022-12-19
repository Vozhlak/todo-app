import React from 'react';
import './TasksFilter.css';

const TasksFilter = ({onChangeFilter, filter}) => {
  const buttonsFiltered = [
    {name: 'all', label: 'All'},
    {name: 'active', label: 'Active'},
    {name: 'completed', label: 'Completed'},
  ];

  const buttons = buttonsFiltered.map(({name, label}) => {
    const isActive = filter === name;
    const classNames = isActive ? 'selected' : '';
    return (
      <li key={name}>
        <button className={classNames} onClick={() => onChangeFilter(name)}>{label}</button>
      </li>
    )
  })

  return (
    <ul className="filters">
      {buttons}
    </ul>
  )
}

export default TasksFilter