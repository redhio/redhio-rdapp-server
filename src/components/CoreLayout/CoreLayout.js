import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { browserHistory, Router } from 'react-router';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Toast from 'components/common/Toast';
import Header from './components/Header';
import {
  onSuccess,
  onInfo,
  onError,
  removeSuccessListener,
  removeInfoListener,
  removeErrorListener
} from 'services/toastEmitter';
import './styles/coreLayout.scss';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#aa0000'
  }
});

export default class CoreLayout extends Component {

  componentDidMount() {
    onSuccess((message, submessage, time) => {
      this.refs.toast.success(message, { submessage, time });
    });
    onInfo((message, submessage, time) => {
      this.refs.toast.info(message, { submessage, time });
    });
    onError((message, submessage, time) => {
      this.refs.toast.error(message, { submessage, time });
    });
  }

  logout() {
    this.props.logout();
  }

  render () {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="body">
          <Toast ref="toast" />
          <div className="header">
            <Header account={this.props.account} onLogout={() => this.logout()} />
          </div>
          <div>
            {this.props.children}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

CoreLayout.propTypes = {
  children: PropTypes.node,
  account: PropTypes.object,
  logout: PropTypes.func
};
