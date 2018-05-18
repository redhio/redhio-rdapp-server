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
import './styles/solver.scss';

export default class Solver extends Component {

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
            <span className="main__hero__title__highlight">redhIO</span> Markov Solver
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



    return (
     <div>

        <div className="main__prompt">
          Select a model and a data source for the <span className="main__prompt__highlight">redhIO</span> Solver
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
				<form id="modelform" name="modelform" action="http://api.redh.io:8000/api/solve/fh" method="POST">
					Upload:<input type="file" name="file" id="file"  /><br/>
					Text:<input type="text" name="modeltext" id="modeltext"  /><br/>
					Solvers:<select name="solver">
						  <option value="FH">FiniteHorizon</option>
						  <option value="VI">ValueIteration</option>
						  <option value="PI">PolicyIteration</option>
						  <option value="QRL">QLearning</option>
					</select> <br/>
					Simulations:<input type="text" name="MAX_ITERATIONS" id="MAX_ITERATIONS" defaultValue="50" /><br/>
					Discount:<input type="text" name="gamma" id="gamma" defaultValue="0.92" /><br/>
					Learning:<input type="text" name="epsilon" id="epsilon" defaultValue="0.01" /><br/>
					Products:<input type="text" name="states" id="states" defaultValue="3" /><br/>
					Policies:<input type="text" name="actions" id="actions" defaultValue="2" /><br/>
					<input type="submit" id="submit"  value="Solve" />
						<br/> 
						<br/>
						<textarea name="modeldata" id="modeldata" form="modelform" defaultValue="Enter Finite Horizon model data here..."></textarea> 
						<br/>Price Switching:<br/><textarea name="modelt" id="modelt" form="modelform" defaultValue="[[[ 0.1,  0.9,  0.0 ],
						[ 0.1,  0.0 ,  0.9],
						[ 0.1,  0.0 ,  0.9]],
						
						[[ 1.0 ,  0.0 ,  0.0 ],
						[ 1.0 ,  0.0 ,  0.0 ],
						[ 1.0 ,  0.0 ,  0.0 ]]]"></textarea> 
						<br/>Pricing Policy:<br/><textarea name="modelr" id="modelr" form="modelform" defaultValue="[[ 0.0,  0.0],
						[ 0.0,  1.0],
						[ 4.0,  2.0]]"></textarea> 
						
					<br/><br/>
					
				</form>				
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

Solver.propTypes = {
  account: PropTypes.object
};
