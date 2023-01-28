import { Component } from 'react';

class Timer extends Component {
  state = {
    isActiveBtnPlay: false,
    isActiveBtnPause: true
  };

  componentDidMount() {
    const { isRunTimer } = this.props;
    if (isRunTimer) {
      this.setState({ isActiveBtnPlay: true, isActiveBtnPause: false });
    } else {
      this.setState({ isActiveBtnPlay: false, isActiveBtnPause: true });
    }
  }

  componentDidUpdate(prevProps) {
    const { done: prevDone } = prevProps;
    const { done, stopTimer } = this.props;

    if (done !== prevDone) {
      if (done) {
        this.setState({ isActiveBtnPlay: true, isActiveBtnPause: true });
        stopTimer();
      } else {
        this.setState({ isActiveBtnPlay: false, isActiveBtnPause: true });
      }
    }
  }

  isDone = (done) => {
    const { stopTimer } = this.props;
    if (done) {
      this.setState({ isActiveBtnPlay: true, isActiveBtnPause: true });
      stopTimer();
    } else {
      this.setState({ isActiveBtnPlay: true, isActiveBtnPause: true });
    }
  };

  toggleActiveBtn = (btn) => {
    const { startTimer, stopTimer, toggleActiveTimer } = this.props;
    switch (btn) {
      case 'play': {
        this.setState({ isActiveBtnPlay: true, isActiveBtnPause: false });
        startTimer();
        toggleActiveTimer();
        break;
      }
      case 'pause': {
        this.setState({ isActiveBtnPlay: false, isActiveBtnPause: true });
        stopTimer();
        toggleActiveTimer();
        break;
      }
      default:
        // eslint-disable-next-line no-console
        console.log('Вероятно пошло что-то не так. Мы в этом разберёмся :)');
        break;
    }
  };

  render() {
    const { time } = this.props;
    const { isActiveBtnPlay, isActiveBtnPause } = this.state;

    const formatTime = `${Math.floor(time / 60)
      .toString()
      .padStart(2, '0')}:${Math.floor(time % 60)
      .toString()
      .padStart(2, '0')}`;

    return (
      <>
        <button
          className='icon icon-play'
          type='button'
          aria-label='btn-play-timer'
          disabled={isActiveBtnPlay}
          onClick={() => this.toggleActiveBtn('play')}
        />
        <button
          className='icon icon-pause disabled'
          type='button'
          aria-label='btn-pause-timer'
          disabled={isActiveBtnPause}
          onClick={() => this.toggleActiveBtn('pause')}
        />
        {formatTime}
      </>
    );
  }
}

export default Timer;
