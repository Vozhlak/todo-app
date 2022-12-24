import React from 'react';
import './TaskList.css';
import Task from '../Task/Task';

const TaskList = ({ tasks, onDeleted, onToggleDone }) => {
  const task = tasks.map((el) => {
    const { id, ...itemProps } = el;
    let classNameItems = 'todo-item'

    if (itemProps.done) {
      classNameItems += ' completed';
    }

    return (
      <li className={classNameItems} key={id}>
        <Task
          {...itemProps}
          onDeleted={() => onDeleted(id)}
          onToggleDone={() => onToggleDone(id)}
        />
      </li>
    );
  });

  return <ul className="todo-list">{task}</ul>;
};

export default TaskList;
