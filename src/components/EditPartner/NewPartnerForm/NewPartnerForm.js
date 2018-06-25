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
            <h1>Hello New Form</h1>
            <label htmlFor="orgName">Organization Name</label>
            <input onChange={this.handleChange} type="text" name="orgName" id="orgName"value={this.state.orgName}/>
        </form>
    }
}

export default NewPartnerForm

