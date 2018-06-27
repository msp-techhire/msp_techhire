import React, { Component } from 'react';
import axios from 'axios';

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
        if(this.state.orgName === '' || this.state.orgAbbreviation === '' || this.state.orgAddress === '' ||
            this.state.orgWebsite === '' || this.state.orgPhone === '' || this.state.directorFirst === '' ||
            this.state.directorLast === '' || this.state.businessType === '') {
                return alert('Please complete all fields!');
            }
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
            this.props.closeModal();
        })
        .catch(err => console.log(err));
    }

    render() {
        if(!this.props.show) {
            return null;
        }

        return <div style={backDropStyle}> 
            <div style={modalStyle}>
                <h2>Register New Partner</h2>
                <form>
                    
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
                    <select onChange={this.handleChange} name="businessType" id="businessType">
                        <option value="" disabled selected></option>
                        <option value="For-profit">For-profit</option>
                        <option value="Non-profit">Non-profit</option>
                        <option value="School/College">School/College</option>
                        <option value="other">other</option>
                    </select>
                    </div>
                </form>
                <button onClick={this.handleSubmit}>Submit Partner Organization</button>
                <button onClick={this.props.closeModal}>Close Modal</button>
            </div>
        </div>
    }
}

export default NewPartnerForm

