/* eslint-disable no-unused-vars */
import { formatDistanceToNow } from 'date-fns';
import './Task.css';
import Timer from '../Timer/Timer';
import TaskEditingForm from '../TaskEditingForm/TaskEditingForm';

function Task({
  id,
  label,
  done,
  dateCreate,
  onDeleted,
  onToggleDone,
  toggleIsEditTask,
  onEditTask,
  time,
  startTimer,
  stopTimer,
  toggleActiveTimer,
  isRunTimer,
  isTimer
}) {
  const date = formatDistanceToNow(dateCreate, { includeSeconds: true });
  const timer = isTimer ? (
    <Timer
      startTimer={startTimer}
      stopTimer={stopTimer}
      time={time}
      toggleActiveTimer={toggleActiveTimer}
      isRunTimer={isRunTimer}
      done={done}
    />
  ) : null;

  return (
    <>
      <div className='view'>
        <input
          className='toggle'
          type='checkbox'
          defaultChecked={done}
          onClick={onToggleDone}
        />
        <label htmlFor='label'>
          <span className='description'>{label}</span>
          <span className='description'>{timer}</span>
          <span className='created'>{`created ${date} ago`}</span>
        </label>
        <button
          className='icon icon-edit'
          type='button'
          aria-label='btn-edit'
          onClick={toggleIsEditTask}
        />
        <button
          className='icon icon-destroy'
          type='button'
          aria-label='btn-delete'
          onClick={onDeleted}
        />
      </div>
      <TaskEditingForm
        toggleIsEditTask={toggleIsEditTask}
        onEditTask={onEditTask}
        id={id}
        labelTask={label}
      />
    </>
  );
}

export default Task;
