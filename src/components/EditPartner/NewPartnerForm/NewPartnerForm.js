import React, { Component } from 'react';
import axios from 'axios';

class NewPartnerForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            orgName: '',
            orgAbbreviation: '',
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
        axios({
            method: 'POST',
            url: '/api/editPartner/newPartner',
            data: this.state,
        })
        .then((response) => {
            console.log(response);
            this.setState({
                orgName: '',
                orgAbbreviation: '',
                orgAddress: '',
                orgWebsite: '',
                orgPhone: '',
                directorFirst: '',
                directorLast: '',
                businessType: '',
            });
            this.props.getPartners();
        })
        .catch(err => console.log(err));
    }

    render() {

        return <div> 
             <h2>Register New Partner</h2>
            <form onSubmit={this.handleSubmit}>
                
                <div className="formGroup">
                <label htmlFor="orgName">Organization Name</label>
                <input onChange={this.handleChange} type="text" name="orgName" id="orgName"value={this.state.orgName}/>
                </div>

                <div className="formGroup">
                <label htmlFor="orgAbbreviation">Organization Abbreviation</label>
                <input onChange={this.handleChange} type="text" name="orgAbbreviation" id="orgAbbreviation"value={this.state.orgAbbreviation}/>
                </div>

                <div className="formGroup">
                <label htmlFor="orgAddress">Address</label>
                <input onChange={this.handleChange} type="text" name="orgAddress" id="orgAddress"value={this.state.orgAddress}/>
                </div>

                <div className="formGroup">
                <label htmlFor="orgWebsite">Website</label>
                <input onChange={this.handleChange} type="text" name="orgWebsite" id="orgWebsite"value={this.state.orgWebsite}/>
                </div>

                <div className="formGroup">
                <label htmlFor="orgPhone">Phone Number</label>
                <input onChange={this.handleChange} type="text" name="orgPhone" id="orgPhone"value={this.state.orgPhone}/>
                </div>

                <div className="formGroup">
                <label htmlFor="directorFirst">Director First Name</label>
                <input onChange={this.handleChange} type="text" name="directorFirst" id="directorFirst"value={this.state.directorFirst}/>
                </div>

                <div className="formGroup">
                <label htmlFor="directorLast">Director Last Name</label>
                <input onChange={this.handleChange} type="text" name="directorLast" id="directorLast"value={this.state.directorLast}/>
                </div>

                <div className="formGroup">
                <label htmlFor="businessType">Business Type</label>
                <input onChange={this.handleChange} type="text" name="businessType" id="businessType"value={this.state.businessType}/>
                </div>

                <input type="submit"/>
            </form>
        </div>
    }
}

export default NewPartnerForm

