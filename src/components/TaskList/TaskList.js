import './TaskList.css';
import Task from '../Task/Task';

function TaskList({
  tasks,
  onDeleted,
  onToggleDone,
  toggleIsEditTask,
  onEditTask,
  startTimer,
  stopTimer,
  idTimers,
  toggleActiveTimer
}) {
  const task = tasks.map((el) => {
    const { id, label, done, dateCreate, time, isRunTimer, isTimer, isEdit } =
      el;
    let classNameItems = 'active';

    const idxTimer = idTimers.find((item) => item.idTask === id && item);
    const valueTimer = { ...idxTimer };

    if (done) {
      classNameItems = 'completed';
    }

    if (isEdit) {
      classNameItems = 'editing';
    }

    return (
      <li
        className={classNameItems}
        key={id}>
        <Task
          id={id}
          label={label}
          done={done}
          onDeleted={() => onDeleted(id)}
          onToggleDone={() => onToggleDone(id)}
          toggleIsEditTask={() => toggleIsEditTask(id)}
          onEditTask={onEditTask}
          dateCreate={dateCreate}
          time={time}
          startTimer={() => startTimer(id)}
          stopTimer={() => stopTimer(valueTimer)}
          idTimers={idTimers}
          toggleActiveTimer={() => toggleActiveTimer(id)}
          isRunTimer={isRunTimer}
          isTimer={isTimer}
        />
      </li>
    );
  });

  return <ul className='todo-list'>{task}</ul>;
}

export default TaskList;
