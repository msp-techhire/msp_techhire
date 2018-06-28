import React from 'react';
import EditPartnerInfoForm from '../EditPartnerInfoForm/EditPartnerInfoForm';


const SelectedPartnerInfo = (props) => {

        return <div>
            <h1>Partner Information</h1>
            <table id="selectedPartnerTable">
                <thead>
                    <tr>
                        <th>Org Name</th>
                        <th>Address</th>
                        <th>Director</th>
                        <th>Business Type</th>
                        <th>Phone Number</th>
                        <th>Website</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{props.selectedPartner.orgName}</td>
                        <td>{props.selectedPartner.orgAddress}</td>
                        <td>{props.selectedPartner.directorFirst} {props.selectedPartner.directorLast}</td>
                        <td>{props.selectedPartner.businessType}</td>
                        <td>{props.selectedPartner.orgPhone}</td>
                        <td>{props.selectedPartner.orgWebsite}</td>
                    </tr>
                </tbody>
            </table>
            <button onClick={props.openEditPartnerModal}>Edit Partner Information</button>
            <EditPartnerInfoForm 
                show={props.show}
                closeEditPartnerModal={props.closeEditPartnerModal}
                selectedPartner={props.selectedPartner}
                handleEditChange={props.handleEditChange}
                updatePartnerInfo={props.updatePartnerInfo}
                selectedPartnerID={props.selectedPartnerID}
            />
        </div>
}

export default SelectedPartnerInfo;