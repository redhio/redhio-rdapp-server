import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CloseIcon from 'material-ui/svg-icons/navigation/close';

export default class ToastMessage extends Component {
  componentDidMount() {
    const { time } = this.props;

    if (time > 0) {
      setTimeout(() => {
        this._removeSelf();
      }, time);
    }
  }

  _removeSelf() {
    const { onRemoveToast, id } = this.props;
    onRemoveToast(id);
  }

  render() {
    const { message, submessage, type } = this.props;

    const className = 'toast toast--' + type;

    return (
      <div className={className}>
        <div className="toast__text">
          <span className="paragraph">{message}</span>
          {submessage && (<span className="toast__text__submessage">{submessage}</span>)}
        </div>
        <button type="button" onClick={() => this._removeSelf()} className="toast__close">
          <CloseIcon />
        </button>
      </div>
    );
  }
}

ToastMessage.defaultProps = {
  id: '',
  message: null,
  submessage: null,
  type: 'info',
  time: 0,
  onRemoveToast: () => { }
};

ToastMessage.propTypes = {
  id: PropTypes.string,
  message: PropTypes.string,
  submessage: PropTypes.string,
  type: PropTypes.oneOf(['info', 'success', 'error']),
  time: PropTypes.number,
  onRemoveToast: PropTypes.func
};
