import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactWebcam from 'react-webcam';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import './styles/webcam.scss';

export default class Webcam extends Component {

  setRef = (webcam) => {
    this.webcam = webcam;
  }

  capture = () => {
    const imageSrc = this.webcam.getScreenshot();
    this.props.onCapture(imageSrc);
  };

  render () {
    return (
      <div className="webcam">
        <div className="webcam__cam">
          <FloatingActionButton mini className="webcam__cam__close"
            onClick={() => this.props.onCancel()}
            backgroundColor="#ffffff"
            iconStyle={{ fill: '#000000' }}>
            <CloseIcon />
          </FloatingActionButton>
          <ReactWebcam audio={false}
            ref={this.setRef}
            style={{ width: '100%' }}
            screenshotFormat="image/jpeg" />
        </div>
        <div className="webcam__controls">
          <RaisedButton primary label="Classify Webcam Image" onClick={this.capture} />
        </div>
      </div>
    );
  }
}

Webcam.propTypes = {
  onCapture: PropTypes.func,
  onCancel: PropTypes.func
};
