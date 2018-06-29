import React from 'react';
import { Bar } from 'react-chartjs-2';

const graphStyle = {
    width: '29%',
    maxWidth: 600,
    height: 300,
    margin: '0 auto',
    padding: 30,
    display: 'inline-block',
}


const EducationGraph = (props) => {

        return (
            <div style={graphStyle}>
                <Bar
                    data={{labels: ['High School', 'Some College', 'Associates', 'Bachelors', 'Graduate Plus'],
                    datasets: [
                        {
                            label: 'By Education Level',
                            data: [props.trainingData.highSchool, props.trainingData.someCollege, props.trainingData.associates, 
                                   props.trainingData.bachelors, props.trainingData.graduatePlus],
                            backgroundColor: 'rgba(176, 189, 99, 0.6)'
                        }
                    ],}}
                    options={{
                        title: {
                            display: true,
                            text: 'Total by Education Level',
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

export default EducationGraph;