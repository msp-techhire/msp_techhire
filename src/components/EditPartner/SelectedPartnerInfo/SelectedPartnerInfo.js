import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    selectedPartner: state.editPartnerReducer.selectedPartner,
  });

const SelectedPartnerInfo = (props) => {

    return <div>
        <h1>Hello Selected Partner</h1>
        <table>
            <thead>
                <tr>
                    <th>Org Name</th>
                    <th>Director</th>
                    <th>Address</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{props.selectedPartner.org_name}</td>
                    <td>{props.selectedPartner.director_first_name} {props.selectedPartner.director_last_name}</td>
                    <td>{props.selectedPartner.address}</td>
                </tr>
            </tbody>
        </table>
    </div>
}

export default connect(mapStateToProps)(SelectedPartnerInfo);