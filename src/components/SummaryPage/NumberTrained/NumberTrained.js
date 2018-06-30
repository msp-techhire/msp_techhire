import React from 'react';
import GenderGraph from './ByGenderGraph/ByGenderGraph';
import EducationGraph from './ByEducationLevelGraph/ByEducationLevelGraph';
import POCGraph from './POCGraph/POCGraph';
import EmployedByGenderGraph from './EmployedByGender/EmployedByGender';


const graphWrapper = {
    width: '90%',
    margin: '0 auto',
    textAlign: 'center',
}

const NumberTrained = (props) => {
    return <div>
        <p>Total Male: {props.trainingData.numberEmployedMale}</p>
        <p>Total Female: {props.trainingData.numberEmployedFemale}</p>
        <p>Total Unreported: {props.trainingData.numberEmployedUnreported}</p>
        <p>Total Other: {props.trainingData.numberEmployedOther}</p>
        <div style={graphWrapper}>
            <GenderGraph 
                trainingData={props.trainingData}
            />
            <EducationGraph 
                trainingData={props.trainingData}
            />
            <POCGraph 
                trainingData={props.trainingData}
            />
        </div>
        <EmployedByGenderGraph 
            trainingData={props.trainingData}
        />
    </div>
}

export default NumberTrained;