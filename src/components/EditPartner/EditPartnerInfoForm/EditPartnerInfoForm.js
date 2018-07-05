import React from 'react';

const backDropStyle = {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 50,
}

const modalStyle = {
    backgroundColor: '#fff',
    borderRadius: 5,
    maxWidth: 600,
    minHeight: 500,
    margin: '0 auto',
    padding: 30,
    position: 'relative'
}

const EditPartnerInfoForm = (props) => {

    if (!props.show) {
        return null;
    }

    return <div style={backDropStyle}>
        <div style={modalStyle}>
            <h1 className="textSelectPartner">Edit Partner</h1>
            <form>
                <div className="formGroup">
                    <label htmlFor="orgEditName">Organization Name</label>
                    <input type="text" value={props.selectedPartner.orgName} name="orgName" onChange={props.handleEditChange} id="orgEditName" />
                </div>

                <div className="formGroup">
                    <label htmlFor="orgEditAbbr">Organization Abbreviation</label>
                    <input type="text" value={props.selectedPartner.orgAbbreviation} name="orgAbbreviation" onChange={props.handleEditChange} id="orgEditAbbr" />
                </div>

                <div className="formGroup">
                    <label htmlFor="orgEditAddress">Organization Address</label>
                    <input type="text" value={props.selectedPartner.orgAddress} name="orgAddress" onChange={props.handleEditChange} id="orgEditAddress" />
                </div>

                <div className="formGroup">
                    <label htmlFor="editDirFirst">Director First</label>
                    <input type="text" value={props.selectedPartner.directorFirst} name="directorFirst" onChange={props.handleEditChange} id="editDirFirst" />
                </div>

                <div className="formGroup">
                    <label htmlFor="editDirLast">Director Last</label>
                    <input type="text" value={props.selectedPartner.directorLast} name="directorLast" onChange={props.handleEditChange} id="editDirLast" />
                </div>

                <div className="formGroup">
                    <label htmlFor="orgEditPhone">Organization Phone</label>
                    <input type="text" value={props.selectedPartner.orgPhone} name="orgPhone" onChange={props.handleEditChange} id="orgEditPhone" />
                </div>

                <div className="formGroup">
                    <label htmlFor="orgEditWebsite">Organization Website</label>
                    <input type="text" value={props.selectedPartner.orgWebsite} name="orgWebsite" onChange={props.handleEditChange} id="orgEditWebsite" />
                </div>

                <div className="formGroup">
                    <label htmlFor="editBusinessType">Business Type</label>
                    <select onChange={props.handleEditChange} defaultValue={props.selectedPartner.businessType} name="businessType" id="editBusinessType">
                        <option value="For-profit">For-profit</option>
                        <option value="Non-profit">Non-profit</option>
                        <option value="School/College">School/College</option>
                        <option value="other">other</option>
                    </select>
                </div>
            </form>
            <button onClick={() => props.updatePartnerInfo(Number(props.selectedPartnerID))}>Update Partner Info</button>
            <button onClick={props.closeEditPartnerModal}>Close Edit Page</button>
        </div>
    </div>
}

export default EditPartnerInfoForm;