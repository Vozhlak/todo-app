/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';

const Timer = ({
  id: idTask,
  done,
  time,
  toggleActiveTimer,
  getIdTimer,
  isRunTimer,
  runTimer
}) => {
  const [status, setStatus] = useState('play');
  const startTimer = () => {
    runTimer(idTask, time);
    toggleActiveTimer(idTask);
  };

  const stopTimer = () => {
    clearInterval(getIdTimer(idTask));
    toggleActiveTimer(idTask);
  };

  const toggleActiveBtn = (btn) => {
    switch (btn) {
      case 'play': {
        setStatus('pause');
        startTimer();
        break;
      }
      case 'pause': {
        setStatus('play');
        stopTimer();
        break;
      }
      default:
        // eslint-disable-next-line no-console
        console.log('Вероятно пошло что-то не так. Мы в этом разберёмся :)');
        break;
    }
  };

  const formatTime = `${Math.floor(time / 60)
    .toString()
    .padStart(2, '0')}:${Math.floor(time % 60)
    .toString()
    .padStart(2, '0')}`;

  useEffect(() => {
    if (done || time === 0) {
      if (isRunTimer) {
        stopTimer();
      }
      setStatus('');
    } else if (isRunTimer) {
      setStatus('pause');
    } else {
      setStatus('play');
    }
  }, [done]);

  return (
    <>
      {status === 'play' && (
        <button
          className='icon icon-play'
          type='button'
          aria-label='btn-play-timer'
          onClick={() => toggleActiveBtn('play')}
        />
      )}
      {status === 'pause' && (
        <button
          className='icon icon-pause disabled'
          type='button'
          aria-label='btn-pause-timer'
          onClick={() => toggleActiveBtn('pause')}
        />
      )}
      {formatTime}
    </>
  );
};

export default Timer;
