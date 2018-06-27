import React, { Component } from 'react';
import { connect } from 'react-redux';
import EditPartnerInfoForm from '../EditPartnerInfoForm/EditPartnerInfoForm';

const mapStateToProps = state => ({
    selectedPartner: state.editPartnerReducer.selectedPartner,
});

class SelectedPartnerInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false
        };
    }

    openModal = () => {
        this.setState({ open: true });
    }

    closeModal = () => {
        this.setState({ open: false });
    }

    render() {
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
                        <td>{this.props.selectedPartner.org_name}</td>
                        <td>{this.props.selectedPartner.address}</td>
                        <td>{this.props.selectedPartner.director_first_name} {this.props.selectedPartner.director_last_name}</td>
                        <td>{this.props.selectedPartner.business_type}</td>
                        <td>{this.props.selectedPartner.phone_number}</td>
                        <td>{this.props.selectedPartner.website}</td>
                    </tr>
                </tbody>
            </table>
            <button onClick={this.openModal}>Edit Partner Information</button>
            <EditPartnerInfoForm 
                show={this.state.open}
                closeModal={this.closeModal}
            />
        </div>
    }
}

export default connect(mapStateToProps)(SelectedPartnerInfo);