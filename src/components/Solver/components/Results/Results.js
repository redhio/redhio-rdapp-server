import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import { confirmClassification } from 'services/web3Api';
import { toastError } from 'services/toastEmitter';
import SolverWidgetContainer from './components/SolverWidgetContainer';

import './styles/results.scss';
import './styles/SolverApp.css';

export default class Results extends Component {

  constructor() {
    super();
    this.state = { isClassificationCorrect: null };
  }

  setClassificationCorrect(isClassificationCorrect) {
    this.setState({ isClassificationCorrect });
    confirmClassification().then((response) => {
    }).catch((error) => {
      toastError('Error Signing Up', error.message.substring(0, 200));
    });
  }

  renderData() {
    return this.props.data.map((result) => {
      return (
        <div className="results__body__data__row" key={result.label}>
          <div className="results__body__data__row__label">
            { result.label }
          </div>
          <div className="results__body__data__row__confidence">
            { result.confidence }
          </div>
        </div>
      );
    });
  }

  render () {
    return (
      <div className="results">
        <div className="results__body">
          <div className="results__body__image-container">
            <img className="results__body__image-container__image" src={this.props.imageSrc}
              alt="Classified image" />
          </div>
          <div className="results__body__data">
            { this.renderData() }
          </div>
        </div>
        <div className="results__controls">
          { this.state.isClassificationCorrect === null
            ? <div className="results__controls__question">
              <div className="results__controls__question__text">
                Was our classification accurate?
              </div>
              <div className="results__controls__question__buttons">
                <RaisedButton label="Yes" primary onClick={() => this.setClassificationCorrect(true)} />
                <RaisedButton label="No" onClick={() => this.setClassificationCorrect(false)} />
              </div>
            </div>
            : <RaisedButton label="Start Over" primary onClick={() => this.props.onCancel()} />
          }
          <div>
          This is where the graph goes
          </div>

        </div>
      </div>
    );
  }
}

Results.propTypes = {
  imageSrc: PropTypes.string,
  data: PropTypes.array,
  onCancel: PropTypes.func
};
