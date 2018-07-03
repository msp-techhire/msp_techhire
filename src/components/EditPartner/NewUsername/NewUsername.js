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
                    <input id="newUsername" type="text"/>
                </div>
                <div className="formGroupNewUser">
                    <label htmlFor="newPassword">Password</label>
                    <input id="newPassword" type="text"/>
                </div>
                <input type="submit" onClick={props.addNewUser}/>
                <button type="button" onClick={props.closeNewUserModal}>Close Modal</button>
            </form>
        </div>
    </div>
}

export default NewUsername;