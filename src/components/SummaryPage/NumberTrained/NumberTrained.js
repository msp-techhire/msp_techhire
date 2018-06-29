import React from 'react';
import GenderGraph from './ByGenderGraph/ByGenderGraph';
import EducationGraph from './ByEducationLevelGraph/ByEducationLevelGraph';
import POCGraph from './POCGraph/POCGraph';


const graphWrapper = {
    width: '90%',
    margin: '0 auto',
    textAlign: 'center',
}

const NumberTrained = (props) => {
    return <div>
        <p>Total: {props.trainingData.totalTrained}</p>
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
    </div>
}

export default NumberTrained;