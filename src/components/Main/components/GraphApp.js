import React, { Component } from 'react';

// Import widgets being used in this component
import NumberWidgetContainer from '../components/NumberWidgetContainer';
import ListWidgetContainer from '../components/ListWidgetContainer';
import GraphWidgetContainer from '../components/GraphWidgetContainer';

// Add in styles
import '../styles/GraphApp.css';

class GraphApp extends Component {
    render() {
        return (
            <div className="GraphApp">
            <ListWidgetContainer href="http://api.redh.io:8000/stats/top" heading="Top Ranked Models" rowspan={2} />
            <NumberWidgetContainer href="http://api.redh.io:8000/stats/models" heading="Published Models" />
            <NumberWidgetContainer href="http://api.redh.io:8000/stats/solved" heading="7 Day Solved %" />
            <NumberWidgetContainer href="http://api.redh.io:8000/stats/response" heading="4 Hour Response %" />
            <GraphWidgetContainer href="http://api.redh.io:8000/stats/utilization" heading="Usage Over Time" colspan={3} rowspan={1} />
        </div>

        );
    }
}

export default App;
