import React, { Component } from 'react';
import { connect } from 'react-redux';
import EditPartnerInfoForm from '../EditPartnerInfoForm/EditPartnerInfoForm';

const mapStateToProps = state => ({
    testSelectedPartner: state.editPartnerReducer.selectedPartner,
});

class SelectedPartnerInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
        };
    }

    //To open/close edit partner modal
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
                        <td>{this.props.selectedPartner.orgName}</td>
                        <td>{this.props.selectedPartner.orgAddress}</td>
                        <td>{this.props.selectedPartner.directorFirst} {this.props.selectedPartner.directorLast}</td>
                        <td>{this.props.selectedPartner.businessType}</td>
                        <td>{this.props.selectedPartner.orgPhone}</td>
                        <td>{this.props.selectedPartner.orgWebsite}</td>
                    </tr>
                </tbody>
            </table>
            <button onClick={this.openModal}>Edit Partner Information</button>
            <EditPartnerInfoForm 
                show={this.state.open}
                closeModal={this.closeModal}
                selectedPartner={this.props.selectedPartner}
                handleEditChange={this.props.handleEditChange}
                updatePartnerInfo={this.props.updatePartnerInfo}
                selectedPartnerID={this.props.selectedPartnerID}
            />
        </div>
    }
}

export default connect(mapStateToProps)(SelectedPartnerInfo);