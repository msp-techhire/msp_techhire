import React from 'react';

const SelectedPartnerStats = (props) => {

    return <div id="selectedPartnerStatsDiv">
        <div className="factsWrapperPartnerStats">
            <div className="factsBubblePartnerStats">
                <h3>Number of students: </h3>
                <p>{props.partnerStats.count}</p>
            </div>
            <div className="factsBubblePartnerStats">
                <h3>Average Wage Pre-Program: </h3>
                <p>${props.partnerStats.pre}</p>               
            </div>
            <div className="factsBubblePartnerStats">
                <h3>Average Wage Post-Program: </h3>
                <p>${props.partnerStats.post}</p>
            </div>
        </div>
        </div>
    
}

export default SelectedPartnerStats;