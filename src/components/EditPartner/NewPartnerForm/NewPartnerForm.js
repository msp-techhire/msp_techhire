import React from 'react';

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

const NewPartnerForm = (props) => {

        if(!props.show) {
            return null;
        }

        return <div style={backDropStyle}> 
            <div style={modalStyle}>
                <h2>Register New Partner</h2>
                <form>
                    
                    <div className="formGroup">
                    <label htmlFor="orgName">Organization Name</label>
                    <input onChange={props.handleChange} type="text" name="orgName" id="orgName" value={props.orgName}/>
                    </div>

                    <div className="formGroup">
                    <label htmlFor="orgAbbreviation">Organization Abbreviation</label>
                    <input onChange={props.handleChange} type="text" name="orgAbbreviation" id="orgAbbreviation" value={props.orgAbbreviation}/>
                    </div>

                    <div className="formGroup">
                    <label htmlFor="orgAddress">Address</label>
                    <input onChange={props.handleChange} type="text" name="orgAddress" id="orgAddress" value={props.orgAddress}/>
                    </div>

                    <div className="formGroup">
                    <label htmlFor="orgWebsite">Website</label>
                    <input onChange={props.handleChange} type="text" name="orgWebsite" id="orgWebsite" value={props.orgWebsite}/>
                    </div>

                    <div className="formGroup">
                    <label htmlFor="orgPhone">Phone Number</label>
                    <input onChange={props.handleChange} type="text" name="orgPhone" id="orgPhone" value={props.orgPhone}/>
                    </div>

                    <div className="formGroup">
                    <label htmlFor="directorFirst">Director First Name</label>
                    <input onChange={props.handleChange} type="text" name="directorFirst" id="directorFirst" value={props.directorFirst}/>
                    </div>

                    <div className="formGroup">
                    <label htmlFor="directorLast">Director Last Name</label>
                    <input onChange={props.handleChange} type="text" name="directorLast" id="directorLast" value={props.directorLast}/>
                    </div>

                    <div className="formGroup">
                    <label htmlFor="businessType">Business Type</label>
                    <select onChange={props.handleChange} defaultValue="" name="businessType" id="businessType">
                        <option value="" disabled></option>
                        <option value="For-profit">For-profit</option>
                        <option value="Non-profit">Non-profit</option>
                        <option value="School/College">School/College</option>
                        <option value="other">other</option>
                    </select>
                    </div>
                </form>
                <button onClick={props.handleSubmit}>Submit Partner Organization</button>
                <button onClick={props.closeModal}>Close Modal</button>
            </div>
        </div>
}

export default NewPartnerForm

