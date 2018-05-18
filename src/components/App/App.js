import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { browserHistory, Router } from 'react-router';

export default class App extends Component {

  render () {
    return (
      <div style={{ height: '100%' }}>
        <Router history={browserHistory} children={this.props.routes} />
      </div>
    );
  }
}

App.propTypes = {
  routes: PropTypes.array
};

