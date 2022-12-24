import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import './Task.css';

const Task = ({ label, done, dateCreate, onDeleted, onToggleDone }) => {
  const date = formatDistanceToNow(dateCreate, { includeSeconds: true });

  return (
    <div className="view">
      <input
        className="toggle"
        type="checkbox"
        defaultChecked={done}
        onClick={onToggleDone}
      />
      <label>
        <span className="description">{label}</span>
        <span className="created">created {date} ago</span>
      </label>
      <button className="icon icon-edit"></button>
      <button className="icon icon-destroy" onClick={onDeleted}></button>
    </div>
  );
};

Task.defaultProps = {
  dateCreate: new Date(),
};

Task.propTypes = {
  dateCreate: (props, propName, componentName) => {
    const value = props[propName];

    if (value instanceof Date && typeof value === 'object') {
      return null;
    }

    return new TypeError(`${componentName}: ${propName} must be date`);
  },
};

export default Task;
