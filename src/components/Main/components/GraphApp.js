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
                {/* Add Widgets to display */}
                <ListWidgetContainer href="http://api.redh.io:8000/stats/top" heading="Top Ranked Models" rowspan={3} />
                <NumberWidgetContainer href="http://api.redh.io:8000/stats/models" heading="Published Models" />
                <GraphWidgetContainer href="http://api.redh.io:8000/stats/utilization" heading="Usage Over Time" colspan={2} rowspan={2} />
                <NumberWidgetContainer href="http://api.redh.io:8000/stats/engines" heading="Engines" />
                <NumberWidgetContainer href="http://api.redh.io:8000/stats/subscriptions" heading="Subscriptions'" />
                <NumberWidgetContainer href="http://api.redh.io:8000/stats/response" heading="4 Hour Response %" />
                <NumberWidgetContainer href="http://api.redh.io:8000/stats/solved" heading="7 Day Solved %" />
            </div>

        );
    }
}

export default App;
