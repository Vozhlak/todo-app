import React from 'react';
import './TaskList.css';
import PropTypes from 'prop-types';
import Task from '../Task/Task';

function TaskList({ tasks, onDeleted, onToggleDone }) {
  const task = tasks.map((el) => {
    const { id, label, done, dateCreate } = el;
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
          dateCreate={dateCreate}
        />
      </li>
    );
  });

  return <ul className="todo-list">{task}</ul>;
}

TaskList.defaultProps = {
  tasks: [],
  onDeleted: () => {},
  onToggleDone: () => {},
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf((propValue, key, componentName, propFullName) => {
    if (!Array.from(propValue)) {
      return new Error(
        `Invalid prop ${propFullName} supplied to ${componentName}. Validation failed.`,
      );
    }
    return null;
  }),
  onDeleted: PropTypes.func,
  onToggleDone: PropTypes.func,
};

export default TaskList;
