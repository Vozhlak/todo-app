import React, {Component} from 'react';
import './Task.css';

class Task extends Component {
  state = {
    done: false
  }

  onCompletedClick = () => {
    this.setState(( {done} ) => {
      return {
        done: !done
      }
    });
  }

  render() {
    const {label, onDeleted} = this.props;
    const {done} = this.state;

    let classNames = 'todo-item';
    if (done) {
      classNames += ' completed';
    }

    return (
      <li className={classNames}>
        <div className="view">
          <input className="toggle" type="checkbox" onClick={this.onCompletedClick}/>
          <label>
            <span className="description">{label}</span>
          </label>
          <button className="icon icon-edit"></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
      </li>
    )
  }
}

export default Task