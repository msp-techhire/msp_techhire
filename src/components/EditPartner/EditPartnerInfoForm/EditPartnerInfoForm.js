import React from 'react';


const EditPartnerInfoForm = (props) => {

        if (!props.show) {
            return null;
        }
    
        return <div>
            <h1>Edit Partner Info Form</h1>
            <input type="text" value={props.selectedPartner.orgName} name="orgName" onChange={props.handleEditChange}/>
            <input type="text" value={props.selectedPartner.orgAbbreviation} name="orgAbbreviation" onChange={props.handleEditChange}/>
            <input type="text" value={props.selectedPartner.orgAddress} name="orgAddress" onChange={props.handleEditChange}/>
            <input type="text" value={props.selectedPartner.directorFirst} name="directorFirst" onChange={props.handleEditChange}/>
            <input type="text" value={props.selectedPartner.directorLast} name="directorLast" onChange={props.handleEditChange}/>
            <input type="text" value={props.selectedPartner.businessType} name="businessType" onChange={props.handleEditChange}/>
            <input type="text" value={props.selectedPartner.orgPhone} name="orgPhone" onChange={props.handleEditChange}/>
            <input type="text" value={props.selectedPartner.orgWebsite} name="orgWebsite" onChange={props.handleEditChange}/>
            <button onClick={() => props.updatePartnerInfo(Number(props.selectedPartnerID))}>Update Partner Info</button>
            <button onClick={props.closeEditPartnerModal}>Close Edit Page</button>
        </div>
}

export default EditPartnerInfoForm;