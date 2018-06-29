import React from 'react';

const NumberTrained = (props) => {
    return <div>
        <h1>Number Trained</h1>
        <p>{props.trainingData.totalTrained}</p>
        <p>{props.trainingData.totalFemale}</p>
        <p>{props.trainingData.totalMale}</p>
        <p>{props.trainingData.unreported}</p>
    </div>
}

export default NumberTrained;