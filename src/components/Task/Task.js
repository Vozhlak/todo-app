import { formatDistanceToNow } from 'date-fns';
import './Task.css';

function Task({
  label,
  done,
  dateCreate,
  onDeleted,
  onToggleDone,
  startTimer,
  stopTimer,
  time
}) {
  const date = formatDistanceToNow(dateCreate, { includeSeconds: true });
  const formatTime = `${Math.floor(time / 60)
    .toString()
    .padStart(2, '0')}:${Math.floor(time % 60)
    .toString()
    .padStart(2, '0')}`;

  return (
    <div className='view'>
      <input
        className='toggle'
        type='checkbox'
        defaultChecked={done}
        onClick={onToggleDone}
      />
      <label htmlFor='label'>
        <span className='description'>{label}</span>
        <span className='description'>
          <button
            className='icon icon-play'
            type='button'
            aria-label='btn-play-timer'
            onClick={startTimer}
          />
          <button
            className='icon icon-pause'
            type='button'
            aria-label='btn-pause-timer'
            onClick={stopTimer}
          />
          {formatTime}
        </span>
        <span className='created'>{`created ${date} ago`}</span>
      </label>
      <button
        className='icon icon-edit'
        type='button'
        aria-label='btn-edit'
      />
      <button
        className='icon icon-destroy'
        onClick={onDeleted}
        type='button'
        aria-label='btn-delete'
      />
    </div>
  );
}

export default Task;
