import React from 'react';
import GenderGraph from './ByGenderGraph/ByGenderGraph';
import EducationGraph from './ByEducationLevelGraph/ByEducationLevelGraph';
import POCGraph from './POCGraph/POCGraph';
import EmployedByGenderGraph from './EmployedByGender/EmployedByGender';
import WageGainData from './WageGainByTrack/WageGainByTrack';


const graphWrapper = {
    width: '90%',
    margin: '0 auto',
    textAlign: 'center',
}

const NumberTrained = (props) => {
    return <div>
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
        <WageGainData 
            wageGainData={props.wageGainData}
        />
    </div>
}

export default NumberTrained;