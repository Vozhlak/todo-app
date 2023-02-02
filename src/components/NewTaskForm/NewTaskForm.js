import { useState } from 'react';

import './NewTaskForm.css';

const NewTaskForm = ({ tasks, setTasks }) => {
  const [valueInput, setValueInput] = useState('');
  const [min, setMin] = useState('');
  const [sec, setSec] = useState('');
  const [error, setError] = useState(false);
  const [errorText, setTextError] = useState('');

  const changeInput = (e) => {
    setValueInput(e.target.value);
  };

  const changeInputMin = (e) => {
    const { value } = e.target;
    const newValue = value.substr(0, 2);
    if (!Number.isNaN(Number(newValue))) {
      setMin(newValue);
    }
  };

  const changeInputSec = (e) => {
    const { value } = e.target;
    const newValue = value.substr(0, 2);
    if (!Number.isNaN(Number(newValue))) {
      setSec(newValue);
    }
  };

  const renderError = (text) => {
    setError(true);
    setTextError(text);
    setTimeout(() => {
      setTextError('');
      setError(false);
    }, 2500);
  };

  const createItem = (label, dateCreate = new Date()) => ({
    id:
      new Date().getMilliseconds() +
      Math.floor(Math.random() * 1000000 + 1000000),
    label,
    dateCreate,
    time: 0,
    done: false,
    isEdit: false,
    isRunTimer: false,
    isTimer: false
  });

  const onAddItem = (text, time = 0) => {
    const newItem = createItem(text);
    newItem.time = Number.isNaN(time) ? 0 : time;
    newItem.isTimer = time > 0;
    const newData = [newItem, ...tasks];
    setTasks(newData);
  };

  const onClickEnter = (e) => {
    if (e.keyCode === 13) {
      if (valueInput !== '' && min <= 59 && sec <= 60) {
        onAddItem(valueInput, parseInt(min, 10) * 60 + parseInt(sec, 10));

        setValueInput('');
        setMin('');
        setSec('');
      }

      if (valueInput === '') {
        renderError('Вы не указали что хотите сделать!');
      } else if (min >= 60) {
        renderError('Время ограниченно до 59 минут');
      } else if (sec >= 61) {
        renderError('В минуте 60 секунд');
      }
    }
  };

  return (
    <>
      <form
        className='new-todo-form'
        onKeyDown={(e) => onClickEnter(e)}>
        <input
          className='new-todo'
          value={valueInput}
          placeholder='What needs to be done?'
          onChange={changeInput}
          autoFocus
        />
        <input
          className='new-todo-form__timer'
          value={min}
          placeholder='Min'
          onChange={changeInputMin}
        />
        <input
          className='new-todo-form__timer'
          value={sec}
          placeholder='Sec'
          onChange={changeInputSec}
        />
      </form>
      {error && <span className='error'>⚠ {errorText}</span>}
    </>
  );
};

export default NewTaskForm;
