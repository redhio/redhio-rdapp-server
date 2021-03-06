import React, { Component } from 'react';

// Import components
import BaseWidget from '../components/BaseWidget';

//Import graphing component
import { Line } from 'react-chartjs-2';

// Import styling
import '../styles/SolverWidget.css';

class SolverWidget extends Component {
    constructor(props) {
        super(props);

        // Set the initial state for the graphing component
        this.state = {
            values: {
                labels: ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"],
                datasets: []
            },
            chartOptions: {
                responsive: true,
                maintainAspectRatio: false,
                scaleShowGridLines: false,
                scales: {
                    xAxes: [{
                        ticks: {
                            fontFamily: "'Didact Gothic', sans-serif",
                            fontSize: 18,
                            fontColor: "#3a3838",
                        },
                        gridLines: {
                            display: false
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            fontFamily: "'Didact Gothic', sans-serif",
                            fontSize: 18,
                            fontColor: "#3a3838",
                        },
                        gridLines: {
                            display: false
                        }
                    }],
                },
                legend: {
                    display: false
                }
            }
        }
    }

    // Update the state based on changing props
    componentWillReceiveProps(nextProps) {
        if (this.props.data !== nextProps.data) {
            //Only update if the data has actually changed
            this.generateDatasets(nextProps);
        }
    }

    //Convert the data received in props to a format the graphing component likes
    generateDatasets(props) {
        let datasets = [];

        //Create a dataset object that Chart.js to understand
        props.data.forEach(function (data) {
            datasets.push({
                label: data.label,
                data: data.data,
                fill: false,
                tension: 0,
                borderColor: data.color,
                borderWidth: 8,
                pointRadius: 0,
                pointHitRadius: 10
            });
        }, this);

        //Let the React wrapper for Chart.js update the view
        this.setState({
            values: {
                datasets
            }
        });
    }

    render() {
        return (
            // Wrap the graphing component in the generic wrapper
            <Widget heading={this.props.heading} colspan={this.props.colspan} rowspan={this.props.rowspan} loading={this.props.loading}>
                <div className="SolverWidget">
                    <Line data={this.state.values} options={this.state.chartOptions} />
                </div>
            </Widget>
        );
    }
}

// Enforce the type of props to send to this component
SolverWidget.propTypes = {
    heading: React.PropTypes.string,
    colspan: React.PropTypes.number,
    rowspan: React.PropTypes.number,
    loading: React.PropTypes.bool.isRequired,
    data: React.PropTypes.arrayOf(React.PropTypes.object)
}

export default SolverWidget;
