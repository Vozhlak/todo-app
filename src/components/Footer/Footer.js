import PropTypes from 'prop-types';

import TasksFilter from '../TasksFilter/TasksFilter';
import './Footer.css';

function Footer({ countItems, allDeleteItems, onChangeFilter, filter }) {
  return (
    <footer className="footer">
      <span className="todo-count">{countItems} items left</span>
      <TasksFilter onChangeFilter={onChangeFilter} filter={filter} />
      <button
        className="clear-completed"
        onClick={allDeleteItems}
        type="button">
        Clear completed
      </button>
    </footer>
  );
}

Footer.defaultProps = {
  countItems: 0,
  allDeleteItems: () => {},
  onChangeFilter: () => {},
  filter: 'all'
};

Footer.propTypes = {
  countItems: PropTypes.number,
  allDeleteItems: PropTypes.func,
  onChangeFilter: PropTypes.func,
  filter: PropTypes.string
};

export default Footer;
