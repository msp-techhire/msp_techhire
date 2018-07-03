import React from 'react';
import { Bar } from 'react-chartjs-2';

const GenderGraph = (props) => {

        return (
            <div classNmae="graphDisplaySummaryPage">
                <Bar
                    data={{labels: ['Female', 'Male', 'Other', 'Unreported'],
                    datasets: [
                        {
                            label: 'By Gender',
                            data: [props.trainingData.totalFemale, props.trainingData.totalMale, props.trainingData.otherGender, props.trainingData.unreportedGender],
                            backgroundColor: 'rgba(1, 164, 215, 0.6)'
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