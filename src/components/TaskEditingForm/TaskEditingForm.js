import { Component } from 'react';

class TaskEditingForm extends Component {
  state = {
    newLabelTask: '',
    prevLabelTask: '',
    isError: false
  };

  componentDidMount() {
    const { labelTask } = this.props;
    this.setState({ newLabelTask: labelTask, prevLabelTask: labelTask });
  }

  onChange = (e) => {
    const { value } = e.target;
    this.setState({ newLabelTask: value });
  };

  onClickEnterAndEsc = (e) => {
    const { toggleIsEditTask, onEditTask, id } = this.props;
    const { newLabelTask, prevLabelTask } = this.state;
    if (e.keyCode === 13) {
      if (newLabelTask !== '') {
        onEditTask(id, newLabelTask);
        toggleIsEditTask();
      } else {
        this.setState({ isError: true });
        setTimeout(() => this.setState({ isError: false }), 2500);
      }
    }
    if (e.keyCode === 27) {
      onEditTask(id, prevLabelTask);
      this.setState({ newLabelTask: prevLabelTask });
      toggleIsEditTask();
    }
  };

  render() {
    const { newLabelTask, isError } = this.state;

    return (
      <>
        <input
          className='edit'
          type='text'
          value={newLabelTask}
          onChange={this.onChange}
          onKeyDown={(e) => this.onClickEnterAndEsc(e)}
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
  }
}

export default TaskEditingForm;
