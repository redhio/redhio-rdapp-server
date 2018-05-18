import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { browserHistory, Link } from 'react-router';
import LogoImg from './assets/logo.png';
import './styles/header.scss';

export default class Header extends Component {

  gotoPath(path, e) {
    if (e) {
      e.preventDefault();
    }
    browserHistory.push(path);
  }

  render () {
    return (
      <div className="header-container">
        <a href="" onClick={(e) => this.gotoPath('/', e)}>
          <img src={LogoImg} className="header-container__logo" alt="Redh.io" />
        </a>
        { this.props.account
          ? <div className="header-container__navigation">
            <div className="header-container__navigation__button">
              <FlatButton label="Dashboard" primary onClick={() => this.gotoPath('')} />
              <FlatButton label="Profile" primary onClick={() => this.gotoPath('')} />
              <FlatButton label="Classifier" primary onClick={() => this.gotoPath('classifier')} />
              <FlatButton label="Engines" primary onClick={() => this.gotoPath('')} />
              <FlatButton label="Log Out" primary onClick={() => this.props.onLogout()} />
            </div>
          </div>
          : <div className="header-container__navigation">
            <div className="header-container__navigation__button">
              <FlatButton label="Log In" primary onClick={() => this.gotoPath('login')} />
            </div>
            <div>
              <RaisedButton primary label="Sign Up" onClick={() => this.gotoPath('signup')} />
            </div>
          </div>
        }
      </div>
    );
  }
}

Header.propTypes = {
  account: PropTypes.object,
  onLogout: PropTypes.func
};
