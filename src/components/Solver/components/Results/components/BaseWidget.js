import React, { Component } from 'react';

// Import components
import BaseLoading from './BaseLoading';

//Import styling
import '../styles/BaseWidget.css';

class BaseWidget extends Component {
    constructor(props) {
        super(props);

        // Create inline styles to make grid elements span multiple rows/columns
        this.spanStyles = {};
        if (props.colspan !== 1) {
            this.spanStyles.gridColumn = `span ${props.colspan}`;
        }
        if (props.rowspan !== 1) {
            this.spanStyles.gridRow = `span ${props.rowspan}`;
        }
    }

    render() {
        return (
            <div style={this.spanStyles} className="BaseWidget">
                <div className="header">
                    <h2>
                        {this.props.heading}
                    </h2>
                    {/* Conditionally show the loading spinner */}
                    {this.props.loading ? <Loading /> : ""}
                </div>
                <div className="content">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

// Provide default settings for when they aren't supplied
BaseWidget.defaultProps = {
    heading: "Unnamed BaseWidget",
    colspan: 1,
    rowspan: 1
}

// Enforce the type of props to send to this component
BaseWidget.propTypes = {
    heading: React.PropTypes.string,
    colspan: React.PropTypes.number,
    rowspan: React.PropTypes.number,
    children: React.PropTypes.element.isRequired
}

export default BaseWidget;
