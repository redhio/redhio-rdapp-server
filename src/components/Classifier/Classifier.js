import React, { Component } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import WebcamIcon from 'material-ui/svg-icons/image/photo-camera';
import CircularProgress from 'material-ui/CircularProgress';
import shortid from 'shortid';
import Joyride from 'react-joyride';
import Browse from './components/Browse';
import Webcam from './components/Webcam';
import Results from './components/Results';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { purchaseClassification, getModels } from 'services/web3Api';
import { classifyImage } from 'services/redhioApi';
import { toastError } from 'services/toastEmitter';
import './styles/classifier.scss';

export default class Classifier extends Component {

  constructor() {
    super();
    this.state = {
      imageSrc: null,
      results: null,
      captureMethod: null,
      availableModels: [],
      selectedModel: null,
      isLoading: false
    };
    this.steps = [
      {
        title: 'Wallet Id',
        text: 'This is your wallet address',
        selector: '.main__walletId',
        position: 'top',
        type: 'hover',
        style: {
          mainColor: '#aa0000'
        }
      },
      {
        title: 'SLA',
        text: 'This is your contract SLA',
        selector: '.main__sla',
        position: 'top',
        type: 'hover',
        style: {
          mainColor: '#aa0000'
        }
      }
    ];
  }

  componentDidMount() {
    mixpanel.track('Usage');
    getModels().then((availableModels) => {
      this.setState({ availableModels, selectedModel: availableModels[0].name });
    }).catch((error) => {
      toastError('Error loading models', error);
    });
  }

  capture(imageSrc) {
    this.setState({ isLoading: true });
    let fileName = '';
    if (typeof imageSrc === 'string') {
      fileName = shortid.generate() + '.jpg';
    } else {
      fileName = imageSrc.name;
    }
    purchaseClassification(fileName).then((response) => {
      return classifyImage(imageSrc);
    }).then((response) => {
      if (typeof imageSrc === 'string') {
        this.setState({ imageSrc, results: response, isLoading: false });
      } else {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.setState({ imageSrc: e.target.result, results: response, isLoading: false });
        };
        reader.readAsDataURL(imageSrc);
      }
    }).catch((error) => {
      this.setState({ isLoading: false });
      toastError('Error Classifying Image', error.message.substring(0, 200));
    });
  };

  renderModelItems() {
    return this.state.availableModels.map((model) => {
      return (
        <MenuItem key={model.name} value={model.name} primaryText={model.name} />
      );
    });
  }

  renderContent() {
	  /*
    if (!this.props.account) {
      return (
        <div className="main__hero">
          <div className="main__hero__title">
            <span className="main__hero__title__highlight">redhIO</span> Image Classifier
          </div>
          <div className="main__hero__subtitle">
            <Link to="signup">Sign up</Link> or <Link to="login">Log In</Link> to continue
          </div>
        </div>
      );
    }
	*/
    if (this.state.results) {
      return (
        <Results imageSrc={this.state.imageSrc} data={this.state.results}
          onCancel={() => this.setState({ results: null, imageSrc: null, captureMethod: null })} />
      );
    }

    if (this.state.captureMethod === 'webcam') {
      return (
        <Webcam onCancel={() => this.setState({ captureMethod: null })}
          onCapture={(imageSrc) => this.capture(imageSrc)} />
      );
    }

    return (
      <div>

        <div className="main__prompt">
          Select a model and image source for the <span className="main__prompt__highlight">redhIO</span> Classifier
        </div>
        { this.state.isLoading
          ? <div className="main__body">
            <div className="main__body__loading">
              <CircularProgress />
            </div>
          </div>
          : <div className="main__body">
            <div className="main__body__select">
              <SelectField
                floatingLabelText="Model"
                fullWidth
                value={this.state.selectedModel}
                onChange={(event, index, selectedModel) => this.setState({ selectedModel })}>
                { this.renderModelItems() }
              </SelectField>
            </div>
            <div className="main__body__options">
              <Browse onSelectFile={(file) => this.capture(file[0])} />
              <button className="main__body__options__button" onClick={() => { this.setState({ captureMethod: 'webcam' }) }}>
                <WebcamIcon style={{ height: 100, width: 100, color: '#ffffff' }} />
                <div className="main__body__options__button__text">Webcam</div>
              </button>
            </div>
          </div>
        }
        <div className="main__fineprint">
          <span className="main__walletId">
            Wallet:
          </span>
        </div>
        <div className="main__fineprint">
          <span className="main__sla">
            SLA: ABC123
          </span>
        </div>
      </div>
    );
  }

  render () {
    return (
      <div className="container-narrow">
        <div className="main">
          { this.renderContent() }
        </div>
      </div>
    );
  }
}

Classifier.propTypes = {
  account: PropTypes.object
};
