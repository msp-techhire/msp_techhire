import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    selectedPartner: state.editPartnerReducer.selectedPartner,
  });

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
                    <td>{props.selectedPartner.org_name}</td>
                    <td>{props.selectedPartner.address}</td>
                    <td>{props.selectedPartner.director_first_name} {props.selectedPartner.director_last_name}</td>
                    <td>{props.selectedPartner.business_type}</td>
                    <td>{props.selectedPartner.phone_number}</td>
                    <td>{props.selectedPartner.website}</td>
                </tr>
            </tbody>
        </table>
    </div>
}

export default connect(mapStateToProps)(SelectedPartnerInfo);