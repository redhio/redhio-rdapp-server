import React, { Component } from 'react';
import shortid from 'shortid';
import { CSSTransitionGroup } from 'react-transition-group';
import ToastMessage from './components/ToastMessage';
import './styles/toast.scss';

export const ToastType = {
  info: 'info',
  success: 'success',
  error: 'error'
};

export default class Toast extends Component {
  constructor() {
    super();
    this.state = { toasts: [] };
  }

  success(message = '', options = {}) {
    options.type = ToastType.success;

    this.show(message, options);
  }

  error(message = '', options = {}) {
    options.type = ToastType.error;

    this.show(message, options);
  }

  info(message = '', options = {}) {
    options.type = ToastType.info;

    this.show(message, options);
  }

  show(message = '', options = {}) {
    const toast = {
      id: shortid.generate(),
      message,
      ...options
    };
    this.setState(prevState => ({
      toasts: prevState.toasts.concat(toast)
    }));
  }

  _removeToast(id) {
    this.setState(prevState => ({
      toasts: prevState.toasts.filter(a => a.id !== id)
    }));
  }

  removeAll() {
    this.setState({ toasts: [] });
  }

  render() {
    return (
      <div className="toast__container">
        <CSSTransitionGroup transitionName="toast__transition"
          transitionEnterTimeout={250}
          transitionLeaveTimeout={250}>
          {this.state.toasts.map(toast => {
            return (<ToastMessage key={toast.id} {...toast} onRemoveToast={e => this._removeToast(e)} />);
          })}
        </CSSTransitionGroup>
      </div>
    );
  }
}
