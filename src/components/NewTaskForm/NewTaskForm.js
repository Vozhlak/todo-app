import { Component } from 'react';

import './NewTaskForm.css';
import PropTypes from 'prop-types';

export default class NewTaskForm extends Component {
  state = {
    value: '',
    min: '',
    sec: ''
  };

  changeInput = (e) => {
    this.setState({ value: e.target.value });
  };

  changeInputMin = (e) => {
    const { value } = e.target;
    if (!Number.isNaN(Number(value))) {
      this.setState({ min: value });
    }
  };

  changeInputSec = (e) => {
    const { value } = e.target;
    if (!Number.isNaN(Number(value))) {
      this.setState({ sec: value });
    }
  };

  onClickEnter = (e) => {
    const { value, min = 0, sec = 0 } = this.state;
    const { onAddItem } = this.props;
    if (e.keyCode === 13) {
      if (value !== '' && min !== '' && sec !== '') {
        onAddItem(value, parseInt(min, 10) * 60 + parseInt(sec, 10));

        this.setState({
          value: '',
          min: '',
          sec: ''
        });
      }
    }
  };

  render() {
    const { value, min, sec } = this.state;

    return (
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
    );
  }
}

NewTaskForm.defaultProps = {
  onAddItem: () => {}
};

NewTaskForm.propTypes = {
  onAddItem: PropTypes.func
};
