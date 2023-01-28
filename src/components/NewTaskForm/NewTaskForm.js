import { Component } from 'react';

import './NewTaskForm.css';
import PropTypes from 'prop-types';

export default class NewTaskForm extends Component {
  state = {
    value: '',
    min: '',
    sec: '',
    error: {
      isError: false,
      textError: ''
    }
  };

  changeInput = (e) => {
    this.setState({ value: e.target.value });
  };

  changeInputMin = (e) => {
    const { value } = e.target;
    const newValue = value.substr(0, 2);
    if (!Number.isNaN(Number(newValue))) {
      this.setState({ min: newValue });
    }
  };

  changeInputSec = (e) => {
    const { value } = e.target;
    const newValue = value.substr(0, 2);

    if (!Number.isNaN(Number(newValue))) {
      this.setState({ sec: newValue });
    }
  };

  onClickEnter = (e) => {
    const { value, min = 0, sec = 0 } = this.state;
    const { onAddItem } = this.props;
    if (e.keyCode === 13) {
      if (value !== '' && min <= 59) {
        onAddItem(value, parseInt(min, 10) * 60 + parseInt(sec, 10));

        this.setState({
          value: '',
          min: '',
          sec: ''
        });
      }

      if (value === '') {
        this.renderError('Вы не указали что хотите сделать!');
      } else if (min >= 60) {
        this.renderError('Время ограниченно до 59 минут');
      } else if (sec >= 61) {
        this.renderError('В минуте 60 секунд');
      }
    }
  };

  renderError = (text) => {
    this.setState((error) => {
      const newError = { ...error, isError: true, textError: text };
      return {
        error: newError
      };
    });
    setTimeout(
      () =>
        this.setState((error) => {
          const newError = { ...error, isError: false, textError: '' };
          return {
            error: newError
          };
        }),
      2500
    );
  };

  render() {
    const { value, min, sec, error } = this.state;
    const { isError, textError } = error;
    return (
      <>
        <form
          className='new-todo-form'
          onKeyDown={(e) => this.onClickEnter(e)}>
          <input
            className='new-todo'
            value={value}
            placeholder='What needs to be done?'
            onChange={this.changeInput}
            autoFocus
          />
          <input
            className='new-todo-form__timer'
            value={min}
            placeholder='Min'
            onChange={this.changeInputMin}
          />
          <input
            className='new-todo-form__timer'
            value={sec}
            placeholder='Sec'
            onChange={this.changeInputSec}
          />
        </form>
        {isError && <span className='error'>⚠ {textError}</span>}
      </>
    );
  }
}

NewTaskForm.defaultProps = {
  onAddItem: () => {}
};

NewTaskForm.propTypes = {
  onAddItem: PropTypes.func
};
