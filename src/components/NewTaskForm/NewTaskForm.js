import React, { Component } from 'react';

import './NewTaskForm.css';

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
        this.props.onAddItem(this.state.value);
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
