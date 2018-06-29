import React from 'react';

const NumberTrained = (props) => {
    return <div>
        <h1>Number Trained</h1>
        <p>Total: {props.trainingData.totalTrained}</p>
        <p>Female: {props.trainingData.totalFemale}</p>
        <p>Male: {props.trainingData.totalMale}</p>
        <p>Unreported Gender: {props.trainingData.unreportedGender}</p>
        <p>High School: {props.trainingData.highSchool}</p>
        <p>Some College: {props.trainingData.someCollege}</p>
        <p>Associates: {props.trainingData.associates}</p>
        <p>Bachelors: {props.trainingData.bachelors}</p>
        <p>Graduate and Beyond: {props.trainingData.graduatePlus}</p>
    </div>
}

export default NumberTrained;