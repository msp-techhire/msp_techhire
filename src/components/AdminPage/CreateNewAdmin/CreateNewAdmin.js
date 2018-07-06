import React from 'react';
import Button from '@material-ui/core/Button';

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

const CreateNewAdmin = (props) => {
    if(!props.newAdmin.show) {
        return null;
    }

    return <div style={backDropStyle}>
        <div style={modalStyle}>
            <h1>Create New Admin Account</h1>
            <div className="formGroup">
                <label>Admin Username</label>
                <input onChange={props.handleNewAdminChange} name="username" type="text" />
            </div>
            <div className="formGroup">
                <label>Admin Password</label>
                <input onChange={props.handleNewAdminChange} name="password" type="password" />
            </div>
            <div className="buttonDiv">
                <Button variant="raised" color="primary" onClick={props.addNewAdmin}>Submit</Button>
                <Button variant="raised" color="secondary" onClick={props.closeNewAdmin}>Close</Button>
            </div>
        </div>
    </div>
}

export default CreateNewAdmin;