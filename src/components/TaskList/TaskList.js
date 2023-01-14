import './TaskList.css';
import Task from '../Task/Task';

function TaskList({ tasks, onDeleted, onToggleDone, startTimer, stopTimer }) {
  const task = tasks.map((el) => {
    const { id, label, done, dateCreate, time } = el;
    let classNameItems = 'active';

    if (done) {
      classNameItems += ' completed';
    }

    return (
      <li
        className={classNameItems}
        key={id}>
        <Task
          label={label}
          done={done}
          onDeleted={() => onDeleted(id)}
          onToggleDone={() => onToggleDone(id)}
          dateCreate={dateCreate}
          stopTimer={() => stopTimer(id)}
          startTimer={() => startTimer(id)}
          time={time}
        />
      </li>
    );
  });

  return <ul className='todo-list'>{task}</ul>;
}

export default TaskList;
