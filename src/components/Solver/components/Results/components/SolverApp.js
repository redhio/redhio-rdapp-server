import React, { Component } from 'react';

// Import widgets being used in this component
import SolverWidgetContainer from '../components/SolverWidgetContainer';

// Add in styles
import '../styles/SolverApp.css';

class SolverApp extends Component {
    render() {
        return (
            <div className="SolverApp">
            <SolverWidgetContainer href="http://api.redh.io:8000/stats/utilization" heading="Usage Over Time" colspan={3} rowspan={1} />
        </div>

        );
    }
}

export default App;
