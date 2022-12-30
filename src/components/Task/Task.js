import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import './Task.css';
import PropTypes from 'prop-types';

function Task({ label, done, dateCreate, onDeleted, onToggleDone }) {
  const date = formatDistanceToNow(dateCreate, { includeSeconds: true });

  return (
    <div className="view">
      <input
        className="toggle"
        type="checkbox"
        defaultChecked={done}
        onClick={onToggleDone}
      />
      <label htmlFor="label">
        <span className="description">{label}</span>
        <span className="created">
          created
          {date}
          ago
        </span>
      </label>
      <button className="icon icon-edit" type="button" aria-label="btn-edit" />
      <button
        className="icon icon-destroy"
        onClick={onDeleted}
        type="button"
        aria-label="btn-delete"
      />
    </div>
  );
}

Task.defaultProps = {
  label: '',
  done: false,
  dateCreate: new Date(),
  onDeleted: () => {},
  onToggleDone: () => {},
};

Task.propTypes = {
  label: PropTypes.string,
  done: PropTypes.bool,
  dateCreate: PropTypes.instanceOf(Date),
  onDeleted: PropTypes.func,
  onToggleDone: PropTypes.func,
};

export default Task;
