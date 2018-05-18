import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, browserHistory } from 'react-router';
import CircularProgress from 'material-ui/CircularProgress';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { RaisedButton, TextField } from 'material-ui';
import { toastError } from 'services/toastEmitter';
import './styles/login.scss';

export default class Login extends Component {

  constructor() {
    super();
    this.state = { username: '', password: '', isLoading: false };
  }

  submit() {
    this.setState({ isLoading: true });
    this.props.login(this.state.username, this.state.password).then((account) => {
      this.setState({ isLoading: false });
      browserHistory.push('/');
    }).catch((error) => {
      this.setState({ isLoading: false });
      toastError('Error Loggin In', error.message);
    });
  }

  render () {
    return (
      <div className="container-narrow">
        <div className="login">
          <div className="form">
            <div className="form__title">
              Log In
            </div>
            <ValidatorForm onSubmit={() => this.submit()}>
              <div>
                <TextValidator
                  fullWidth
                  name="username"
                  floatingLabelText="User Name"
                  value={this.state.username}
                  validators={['required']}
                  errorMessages={['User name is required']}
                  onChange={(e) => this.setState({ username: e.target.value })} />
                <TextValidator
                  name="password"
                  type="password"
                  fullWidth
                  value={this.state.password}
                  onChange={(e) => this.setState({ password: e.target.value })}
                  validators={['required']}
                  errorMessages={['Password is required']}
                  floatingLabelText="Password" />
              </div>
              <div className="form__submit">
                { this.state.isLoading
                  ? <CircularProgress />
                  : <RaisedButton type="submit" fullWidth primary label="Login" />
                }
              </div>
            </ValidatorForm>
            <div className="form__subtext">
              Don't have an account? <Link to="signup">Sign Up</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func
};
