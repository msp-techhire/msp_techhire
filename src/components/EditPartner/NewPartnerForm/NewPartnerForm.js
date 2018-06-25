import React, { Component } from 'react';

class NewPartnerForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            orgName: '',
            orgAddress: '',
            orgWebsite: '',
            orgPhone: '',
            directorFirst: '',
            directorLast: '',
            businessType: '',
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            orgName: '',
            orgAddress: '',
            orgWebsite: '',
            orgPhone: '',
            directorFirst: '',
            directorLast: '',
            businessType: '',
        });
    }

    render() {

        return <form onSubmit={this.handleSubmit}>
            <h2>Register New Partner</h2>
            <div>
                <label htmlFor="orgName">Organization Name</label>
                <input onChange={this.handleChange} type="text" name="orgName" id="orgName"value={this.state.orgName}/>
            </div>
            <div>
                <label htmlFor="orgAddress">Address</label>
                <input onChange={this.handleChange} type="text" name="orgAddress" id="orgAddress"value={this.state.orgAddress}/>
            </div>
            <div>
                <label htmlFor="orgWebsite">Website</label>
                <input onChange={this.handleChange} type="text" name="orgWebsite" id="orgWebsite"value={this.state.orgWebsite}/>
                <label htmlFor="orgPhone">Phone Number</label>
                <input onChange={this.handleChange} type="text" name="orgPhone" id="orgPhone"value={this.state.orgPhone}/>
            </div>
            <div>
                <label htmlFor="directorFirst">Director First Name</label>
                <input onChange={this.handleChange} type="text" name="directorFirst" id="directorFirst"value={this.state.directorFirst}/>
                <label htmlFor="directorLast">Director Last Name</label>
                <input onChange={this.handleChange} type="text" name="directorLast" id="directorLast"value={this.state.directorLast}/>
                <label htmlFor="businessType">Business Type</label>
                <input onChange={this.handleChange} type="text" name="businessType" id="businessType"value={this.state.businessType}/>
            </div>
            <input type="submit"/>
        </form>
    }
}

export default NewPartnerForm

