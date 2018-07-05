import React from 'react';
import { Bar } from 'react-chartjs-2';

const EmployedByGenderGraph = (props) => {

    return <div classNmae="graphDisplaySummaryPage">
        <Bar
            data={{
                labels: ['Female', 'Male', 'Other', 'Unnreported'],
                datasets: [
                    {
                        label: 'Gender',
                        data: [props.trainingData.numberEmployedFemale, props.trainingData.numberEmployedMale, props.trainingData.numberEmployedOther, props.trainingData.numberEmployedUnreported],
                        backgroundColor: 'rgba(176, 189, 99, 0.6)'
                    }
                ],
            }}
            options={{
                title: {
                    display: true,
                    text: 'Number Employed',
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
}

export default EmployedByGenderGraph