import React from 'react';

const SelectedPartnerStats = (props) => {

    return <div>
        <h1 className="textSelectPartner">Selected Partner Stats</h1>
        <div className="factsWrapperPartnerStats">
        <p className="textBubblePartnerStats">Average Wage Pre-Program: </p>
        <p className="factsBubblePartnerStats">${props.partnerStats.pre}</p>
        <p className="textBubblePartnerStats">Average Wage Post-Program: </p>
        <p className="factsBubblePartnerStats">${props.partnerStats.post}</p>
        <p className="textBubblePartnerStats">Number of students: </p>
        <p className="factsBubblePartnerStats">{props.partnerStats.count}</p>
        </div>
        </div>
    
}

export default SelectedPartnerStats;