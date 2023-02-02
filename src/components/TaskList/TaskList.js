import './TaskList.css';
import Task from '../Task/Task';

const TaskList = ({ tasks, setTasks, idTimers, setIdTimers }) => {
  const onToggleDone = (id) => {
    const newData = tasks.map((item) => {
      if (item.id === id) {
        item.done = !item.done;
      }
      return item;
    });
    setTasks(newData);
  };

  const deleteItem = (id) => {
    const newData = tasks.filter((item) => item.id !== id);
    const idxTimerId = idTimers.map(
      ({ idTask, idTimer }) => idTask === id && idTimer
    );
    if (idxTimerId) {
      clearInterval(idxTimerId);
    }
    setTasks(newData);
    setIdTimers((oldItem) => oldItem.filter(({ idTask }) => idTask !== id));
  };

  const toggleIsEditTask = (id) => {
    const newData = tasks.map((item) =>
      item.id === id ? { ...item, isEdit: !item.isEdit } : item
    );
    setTasks(newData);
  };

  const onEditTask = (id, newText) => {
    const newData = [...tasks].map((item) => {
      if (item.id === id) {
        item.label = newText;
      }
      return item;
    });
    setTasks(newData);
  };

  const toggleActiveTimer = (id) => {
    const newData = tasks.map((item) => {
      if (item.id === id) {
        item.isRunTimer = !item.isRunTimer;
      }
      return item;
    });
    setTasks(newData);
  };

  const addTimerId = (taskId, timerId) => {
    const newItem = {
      idTask: taskId,
      idTimer: timerId
    };
    let newArr = [];
    const prev = idTimers.filter((item) => item.idTask !== newItem.idTask);
    newArr = [...prev, newItem];

    setIdTimers(newArr);
  };

  const getIdTimer = (id) => {
    const idxTimer = idTimers.find((item) => item.idTask === id && item);
    const valueTimer = idxTimer.idTimer;
    return valueTimer;
  };

  const runTimer = (id) => {
    let interval = 0;
    interval = setInterval(() => {
      setTasks((oldTasks) =>
        oldTasks.map((item) => {
          if (item.id === id) {
            item.time -= 1;
            if (item.time === 0) {
              item.done = true;
            }
          }
          return item;
        })
      );
    }, 1000);
    addTimerId(id, interval);
  };

  const task = tasks.map((el) => {
    const { id, label, done, dateCreate, time, isRunTimer, isTimer, isEdit } =
      el;

    let classNameItems = 'active';

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
          onDeleted={() => deleteItem(id)}
          onToggleDone={() => onToggleDone(id)}
          toggleIsEditTask={() => toggleIsEditTask(id)}
          onEditTask={onEditTask}
          dateCreate={dateCreate}
          time={time}
          addTimerId={addTimerId}
          toggleActiveTimer={toggleActiveTimer}
          isRunTimer={isRunTimer}
          isTimer={isTimer}
          getIdTimer={getIdTimer}
          runTimer={runTimer}
        />
      </li>
    );
  });

  return <ul className='todo-list'>{task}</ul>;
};

export default TaskList;
