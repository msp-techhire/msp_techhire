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

const NewUsername = (props) => {
    if (!props.newUserShow) {
        return null;
    }
    return <div style={backDropStyle}>
        <div style={modalStyle}>
            <h1>Hello New User</h1>
            <form>
                <div className="formGroupNewUser">
                    <label htmlFor="newUsername">Username</label>
                    <input id="newUsername" onChange={props.handleNewUserChange} name="username" type="text"/>
                </div>
                <div className="formGroupNewUser">
                    <label htmlFor="newPassword">Password</label>
                    <input id="newPassword" onChange={props.handleNewUserChange} name="password" type="password"/>
                </div>
                <div class="buttonDiv">
                    <Button variant="raised" color="primary" onClick={props.addNewUser}>Submit</Button>
                    <Button variant="raised" color="secondary" onClick={props.closeNewUserModal}>Close</Button>
                </div>
            </form>
        </div>
    </div>
}

export default NewUsername;