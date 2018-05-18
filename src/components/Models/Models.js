import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, browserHistory } from 'react-router';
import CircularProgress from 'material-ui/CircularProgress';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { RaisedButton, TextField } from 'material-ui';
import { toastError } from 'services/toastEmitter';
import './styles/signup.scss';

export default class Signup extends Component {

  constructor() {
    super();
    this.state = { username: '', email: '', password: '', repeatPassword: '', isLoading: false };
  }

  componentDidMount() {
    mixpanel.track('Sign-up');
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
      if (value !== this.state.password) {
        return false;
      }
      return true;
    });
  }

  submit() {
    this.setState({ isLoading: true });
    this.props.signup(this.state.username, this.state.email, this.state.password).then((account) => {
      this.setState({ isLoading: false });
      browserHistory.push('/');
    }).catch((error) => {
      this.setState({ isLoading: false });
      toastError('Error Signing Up', error.message.substring(0, 200));
    });
  }

  render () {
    return (
      <div className="container-narrow">
        <div className="signup">
          <div className="form">
            <div className="form__title">
              Sign Up
            </div>
            <div className="form__subtitle">
              Create a user account to try out our image classifier
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
                  fullWidth
                  name="email"
                  floatingLabelText="Email"
                  value={this.state.email}
                  validators={['required', 'isEmail']}
                  errorMessages={['Email is required', 'please enter a valid email']}
                  onChange={(e) => this.setState({ email: e.target.value })} />
                <TextValidator
                  name="password"
                  type="password"
                  fullWidth
                  value={this.state.password}
                  onChange={(e) => this.setState({ password: e.target.value })}
                  validators={['required']}
                  errorMessages={['Password is required']}
                  floatingLabelText="Password" />
                <TextValidator
                  name="repeatPassword"
                  type="password"
                  fullWidth
                  value={this.state.repeatPassword}
                  onChange={(e) => this.setState({ repeatPassword: e.target.value })}
                  validators={['required', 'isPasswordMatch']}
                  errorMessages={['Password confirmation is required', 'passwords do not match']}
                  floatingLabelText="Confirm Password" />
              </div>
              <div className="form__submit">
                { this.state.isLoading
                  ? <CircularProgress />
                  : <RaisedButton type="submit" fullWidth primary label="Sign Up" />
                }
              </div>
            </ValidatorForm>
            <div className="form__subtext">
              Already signed up? <Link to="login">Log In</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Signup.propTypes = {
  signup: PropTypes.func
};
