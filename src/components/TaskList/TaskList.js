import React from 'react';
import './TaskList.css';
import Task from '../Task/Task';

function TaskList({ tasks, onDeleted, onToggleDone }) {
  const task = tasks.map((el) => {
    const { id, label, done } = el;
    let classNameItems = 'todo-item';

    if (done) {
      classNameItems += ' completed';
    }

    return (
      <li className={classNameItems} key={id}>
        <Task
          label={label}
          done={done}
          onDeleted={() => onDeleted(id)}
          onToggleDone={() => onToggleDone(id)}
        />
      </li>
    );
  });

  return <ul className="todo-list">{task}</ul>;
}

export default TaskList;
