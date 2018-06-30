import React from 'react';

const WageGainData = (props) => {
    return <div> 
    <h1>Wage Gain Data</h1>
    <p>{props.wageGainData.softwareDevelopment.preWage}</p>
    <p>{props.wageGainData.softwareDevelopment.postWage}</p>
    <p>{props.wageGainData.softwareDevelopment.wageGrowth}</p>
    <p>{props.wageGainData.softwareDevelopment.wageGrowthPercentage}</p>
    </div>

}

export default WageGainData;