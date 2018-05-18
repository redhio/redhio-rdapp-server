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
          <div className="results__body__data__row__label">
            { result.name }

          </div>
          <div className="results__body__data__row__confidence">
            { result.response_data['label'] }
          </div>
          <div className="results__body__data__row__confidence">
            { result.response_data['confidence'] }
          </div>
		  <div className="results__body__data__row" key={result.response_data['label']}>
			  <div className="results__body__data__row__label">
				{ result.response_data['label'] }
			  </div>

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
          <div className="table">
            <table>
            <tr>
              <th>Company</th>
              <th>Contact</th>
              <th>Country</th>
            </tr>
            <tr>
              <td>Alfreds Futterkiste</td>
              <td>Maria Anders</td>
              <td>Germany</td>
            </tr>
            <tr>
              <td>Centro comercial Moctezuma</td>
              <td>Francisco Chang</td>
              <td>Mexico</td>
            </tr>
            <tr>
              <td>Ernst Handel</td>
              <td>Roland Mendel</td>
              <td>Austria</td>
            </tr>
            <tr>
              <td>Island Trading</td>
              <td>Helen Bennett</td>
              <td>UK</td>
            </tr>
            <tr>
              <td>Laughing Bacchus Winecellars</td>
              <td>Yoshi Tannamuri</td>
              <td>Canada</td>
            </tr>
            <tr>
              <td>Magazzini Alimentari Riuniti</td>
              <td>Giovanni Rovelli</td>
              <td>Italy</td>
            </tr>
          </table>
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
