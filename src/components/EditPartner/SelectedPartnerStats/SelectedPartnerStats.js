import React from 'react';

const SelectedPartnerStats = (props) => {

    return <div>
        <h1>Selected Partner Stats</h1>
        <p>Average Wage Pre Program: ${props.partnerStats.pre}</p>
        <p>Average Wage Post Program: ${props.partnerStats.post}</p>
        <p>Number of students: {props.partnerStats.count}</p>
        </div>
    
}

export default SelectedPartnerStats;