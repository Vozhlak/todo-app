import React, { Component } from 'react';
import './NewTaskForm.css';
import PropTypes from 'prop-types';

export default class NewTaskForm extends Component {
  state = {
    value: '',
  };

  changeInput = (e) => {
    this.setState({ value: e.target.value });
  };

  addItem = (e) => {
    if (e.key === 'Enter') {
      if (e.target.value) {
        const { onAddItem } = this.props;
        const { value } = this.state;
        onAddItem(value);
        this.setState({ value: '' });
      }
    }
  };

  render() {
    const { value } = this.state;

    return (
      <input
        className="new-todo"
        value={value}
        placeholder="What needs to be done?"
        onChange={this.changeInput}
        onKeyDown={this.addItem}
        autoFocus
      />
    );
  }
}

NewTaskForm.defaultProps = {
  onAddItem: () => {},
};

NewTaskForm.propTypes = {
  onAddItem: PropTypes.func,
};
