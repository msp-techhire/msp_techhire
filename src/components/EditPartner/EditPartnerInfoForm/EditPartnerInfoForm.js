import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    selectedPartner: state.editPartnerReducer.selectedPartner,
  });

class EditPartnerInfoForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            orgName: this.props.orgName,
            orgAbbreviation: '',
            orgAddress: '',
            orgWebsite: '',
            orgPhone: '',
            directorFirst: '',
            directorLast: '',
            businessType: '',
        }
    }

    componentDidMount() {
        this.getInitialState();
    }

    getInitialState = () => {
        this.setState({
            orgName: this.props.selectedPartner.org_name,
            orgAbbreviation: this.props.selectedPartner.org_abbr,
            orgAddress: this.props.selectedPartner.address,
            orgWebsite: this.props.selectedPartner.website,
            orgPhone: this.props.selectedPartner.phone_number,
            directorFirst: this.props.selectedPartner.director_first_name,
            directorLast: this.props.selectedPartner.director_last_name,
            businessType: this.props.selectedPartner.business_type,
        });
    }

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
            <input type="text" value={this.props.orgName} name="orgName" onChange={this.handleChange}/>
            <input type="text" placeholder={this.props.orgAbbreviation} name="orgAbbreviation" onChange={this.handleChange}/>
            <input type="text" placeholder={this.props.address} name="orgAddress" onChange={this.handleChange}/>
            <input type="text" placeholder={this.props.directorFirst} name="directorFirst" onChange={this.handleChange}/>
            <input type="text" placeholder={this.props.directorLast} name="directorLast" onChange={this.handleChange}/>
            <input type="text" placeholder={this.props.businessType} name="businessType" onChange={this.handleChange}/>
            <input type="text" placeholder={this.props.phoneNumber} name="orgPhone" onChange={this.handleChange}/>
            <input type="text" placeholder={this.props.website} name="orgWebsite" onChange={this.handleChange}/>
            <button onClick={this.props.closeModal}>Close Edit Modal</button>
        </div>
    }
}

export default connect(mapStateToProps)(EditPartnerInfoForm);