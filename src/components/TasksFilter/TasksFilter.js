import './TasksFilter.css';
import PropTypes from 'prop-types';

function TasksFilter({ onChangeFilter, filter }) {
  const buttonsFiltered = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'completed', label: 'Completed' }
  ];

  const buttons = buttonsFiltered.map(({ name, label }) => {
    const isActive = filter === name;
    const classNames = isActive ? 'selected' : '';
    return (
      <li key={name}>
        <button
          className={classNames}
          onClick={() => onChangeFilter(name)}
          type="button">
          {label}
        </button>
      </li>
    );
  });

  return <ul className="filters">{buttons}</ul>;
}

TasksFilter.defaultProps = {
  onChangeFilter: () => {},
  filter: 'all'
};

TasksFilter.propTypes = {
  onChangeFilter: PropTypes.func,
  filter: PropTypes.string
};

export default TasksFilter;
