import { useState } from 'react';

const TaskEditingForm = ({ toggleIsEditTask, onEditTask, id, labelTask }) => {
  const [newLabelTask, setNewLabelTask] = useState(labelTask);
  const [isError, setIsError] = useState(false);

  const onChange = (e) => {
    const { value } = e.target;
    setNewLabelTask(value);
  };

  const onClickEnterAndEsc = (e) => {
    if (e.keyCode === 13) {
      if (newLabelTask !== '') {
        onEditTask(id, newLabelTask);
        toggleIsEditTask();
      } else {
        setIsError(true);
        setTimeout(() => setIsError(false), 2500);
      }
    }
    if (e.keyCode === 27) {
      setNewLabelTask(labelTask);
      toggleIsEditTask();
    }
  };

  return (
    <>
      <input
        className='edit'
        type='text'
        value={newLabelTask}
        onChange={onChange}
        onKeyDown={(e) => onClickEnterAndEsc(e)}
        autoFocus
      />
      {isError && (
        <span
          style={{
            paddingLeft: 42,
            color: 'red',
            fontSize: 14
          }}>
          Error
        </span>
      )}
    </>
  );
};

export default TaskEditingForm;
