import React from 'react';
import { Bar } from 'react-chartjs-2';

const graphStyle = {
    maxWidth: 700,
    height: 350,
    margin: '0 auto',
    padding: 30,
    display: 'inline-block',
    }

const POCGraph = (props) => {

        return (
            <div style = {graphStyle} className="graphDisplaySummaryPage">
                <Bar
                    data={{labels: ['True', 'False', 'Unreported'],
                    datasets: [
                        {
                            label: 'Person of Color',
                            data: [props.trainingData.POCTrue, props.trainingData.POCFalse, props.trainingData.POCUnreported],
                            backgroundColor: 'rgba(1, 164, 215, 0.6)'
                        }
                    ],}}
                    options={{
                        title: {
                            display: true,
                            text: 'Person of Color',
                            fontSize: 25,
                        },
                        legend: {
                            display: true,
                            position: 'bottom',
                        },
                        maintainAspectRatio: false,
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true,
                                }
                            }]
                        }
                    }}
                />
            </div>
        )
}

export default POCGraph;