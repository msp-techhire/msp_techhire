import React from 'react';

const SelectedPartnerStats = (props) => {

    return <div id="selectedPartnerStatsDiv">
        <div className="factsWrapperPartnerStats">
            <div className="factsBubblePartnerStats">
                <h3 className="selectedPartnerStatsText">Number of students: </h3>
                <p className="selectedPartnerStatsTextCount">{props.partnerStats.count}</p>
            </div>
            <div className="factsBubblePartnerStats">
                <h3 className="selectedPartnerStatsText">Average Wage Pre-Program: </h3>
                <p className="selectedPartnerStatsTextCount">${props.partnerStats.pre}</p>               
            </div>
            <div className="factsBubblePartnerStats">
                <h3 className="selectedPartnerStatsText">Average Wage Post-Program: </h3>
                <p className="selectedPartnerStatsTextCount">${props.partnerStats.post}</p>
            </div>
        </div>
        </div>
}

export default SelectedPartnerStats;