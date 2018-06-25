import React, { Component } from 'react';

class NewPartnerForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            orgName: '',
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {

        return <form>
            <h2>Register New Partner</h2>
            <div>
                <label htmlFor="orgName">Organization Name</label>
                <input onChange={this.handleChange} type="text" name="orgName" id="orgName"value={this.state.orgName}/>
            </div>
            
            <label htmlFor="orgName">Address</label>
            <input onChange={this.handleChange} type="text" name="orgName" id="orgName"value={this.state.orgName}/>
            <label htmlFor="orgName">Website</label>
            <input onChange={this.handleChange} type="text" name="orgName" id="orgName"value={this.state.orgName}/>
            <label htmlFor="orgName">Phone Number</label>
            <input onChange={this.handleChange} type="text" name="orgName" id="orgName"value={this.state.orgName}/>
            <label htmlFor="orgName">Director First Name</label>
            <input onChange={this.handleChange} type="text" name="orgName" id="orgName"value={this.state.orgName}/>
            <label htmlFor="orgName">Director Last Name</label>
            <input onChange={this.handleChange} type="text" name="orgName" id="orgName"value={this.state.orgName}/>
            <label htmlFor="orgName">Business Type</label>
            <input onChange={this.handleChange} type="text" name="orgName" id="orgName"value={this.state.orgName}/>
        </form>
    }
}

export default NewPartnerForm

