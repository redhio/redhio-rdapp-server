import React, { Component } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import WebcamIcon from 'material-ui/svg-icons/image/photo-camera';
import CircularProgress from 'material-ui/CircularProgress';
import shortid from 'shortid';
import Joyride from 'react-joyride';
import Results from './components/Results';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { purchaseClassification, getModels } from 'services/web3Api';
import { classifyImage } from 'services/redhioApi';
import { toastError } from 'services/toastEmitter';
import './styles/main.scss';
import "../../../node_modules/react-vis/dist/style.css";
import {XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries} from 'react-vis';
import GraphWidgetContainer from './components/GraphWidgetContainer';
import NumberWidgetContainer from './components/NumberWidgetContainer';
import ListWidgetContainer from './components/ListWidgetContainer';


import './styles/GraphApp.css';

export default class Main extends Component {

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








  renderContent() {
    if (!this.props.account) {
      return (
        <div className="main__hero">
          <div className="main__hero__title">
            Welcome to <span className="main__hero__title__highlight">redhIO</span>
          </div>
          <div className="main__hero__subtitle">
            <Link to="signup">Sign up</Link> or <Link to="login">Log In</Link> to continue
          </div>
        </div>
      );
    }



    return (
      <div>

        <div className="main__prompt">
          Welcome to the <span className="main__prompt__highlight">redhIO</span> Dashboard
        </div>
        { this.state.isLoading
          ? <div className="main__body">
            <div className="main__body__loading">
              <CircularProgress />
            </div>
          </div>
          : <div className="main__body">
            <div className="main__body__select">

            </div>
            <div className="GraphApp">
              <ListWidgetContainer href="http://api.redh.io:8000/stats/top" heading="Top Ranked Models" rowspan={2} />
              <NumberWidgetContainer href="http://api.redh.io:8000/stats/models" heading="Published Models" />
              <NumberWidgetContainer href="http://api.redh.io:8000/stats/solved" heading="7 Day Solved %" />
              <NumberWidgetContainer href="http://api.redh.io:8000/stats/response" heading="4 Hour Response %" />
              <GraphWidgetContainer href="http://api.redh.io:8000/stats/utilization" heading="Usage Over Time" colspan={3} rowspan={1} />
            </div>
          </div>
        }
        <div className="main__fineprint">
          <span className="main__walletId">
            Wallet: { this.props.account.walletId }
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
      <div className="container-wide">
          { this.renderContent() }

      </div>
    );
  }
}

Main.propTypes = {
  account: PropTypes.object
};
