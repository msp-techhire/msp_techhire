import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    testSelectedPartner: state.editPartnerReducer.selectedPartner,
  });

class EditPartnerInfoForm extends Component {

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        if (!this.props.show) {
            return null;
        }
    
        return <div>
            <h1>Edit Partner Info Form</h1>
            <input type="text" value={this.props.selectedPartner.orgName} name="orgName" onChange={this.props.handleEditChange}/>
            <input type="text" value={this.props.selectedPartner.orgAbbreviation} name="orgAbbreviation" onChange={this.props.handleEditChange}/>
            <input type="text" value={this.props.selectedPartner.orgAddress} name="orgAddress" onChange={this.props.handleEditChange}/>
            <input type="text" value={this.props.selectedPartner.directorFirst} name="directorFirst" onChange={this.props.handleEditChange}/>
            <input type="text" value={this.props.selectedPartner.directorLast} name="directorLast" onChange={this.props.handleEditChange}/>
            <input type="text" value={this.props.selectedPartner.businessType} name="businessType" onChange={this.props.handleEditChange}/>
            <input type="text" value={this.props.selectedPartner.orgPhone} name="orgPhone" onChange={this.props.handleEditChange}/>
            <input type="text" value={this.props.selectedPartner.orgWebsite} name="orgWebsite" onChange={this.props.handleEditChange}/>
            <button onClick={this.props.closeModal}>Close Edit Modal</button>
        </div>
    }
}

export default connect(mapStateToProps)(EditPartnerInfoForm);