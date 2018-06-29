import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';

const graphStyle = {
    width: '40%',
    maxWidth: 600,
    height: 500,
    margin: '0 auto',
    padding: 30,
}


const GenderGraph = (props) => {

        return (
            <div style={graphStyle}>
                <Bar
                    data={{labels: ['Female', 'Male', 'Unreported'],
                    datasets: [
                        {
                            label: 'By Gender',
                            data: [props.trainingData.totalFemale, props.trainingData.totalMale, props.trainingData.unreportedGender],
                            backgroundColor: 'rgba(230, 126, 34, 0.6)'
                        }
                    ],}}
                    options={{
                        title: {
                            display: true,
                            text: 'Total by Gender',
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

export default GenderGraph;