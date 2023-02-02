import TasksFilter from '../TasksFilter/TasksFilter';
import './Footer.css';

const Footer = ({ countItems, allDeleteItems, onChangeFilter, filter }) => (
  <footer className='footer'>
    <span className='todo-count'>{countItems} items left</span>
    <TasksFilter
      onChangeFilter={onChangeFilter}
      filter={filter}
    />
    <button
      className='clear-completed'
      onClick={allDeleteItems}
      type='button'>
      Clear completed
    </button>
  </footer>
);

export default Footer;
