import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import { confirmClassification } from 'services/web3Api';
import { toastError } from 'services/toastEmitter';
import './styles/results.scss';

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
	   
        <div className="results__body__data__row" key={result.response_data['label']}>
          <div className="results__body__data__row__confidence">
            { result.response_data['rank'] }
			
          </div>
          <div className="results__body__data__row__label">
            { result.response_data['label'] }
          </div>
          <div className="results__body__data__row__confidence">
            { result.response_data['confidence'] }
          </div><br/>
		<textarea name="modelt" id="modelt" form="modelform" defaultValue={ result.response_data['label'] }></textarea>

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
