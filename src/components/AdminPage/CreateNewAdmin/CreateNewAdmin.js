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

const CreateNewAdmin = (props) => {
    if(!props.newAdmin.show) {
        return null;
    }

    return <div style={backDropStyle}>
        <div style={modalStyle}>
            <h1>Create New Admin</h1>
            <label>Admin Username</label>
            <input onChange={props.handleNewAdminChange} name="username" type="text" />
            <label>Admin Password</label>
            <input onChange={props.handleNewAdminChange} name="password" type="text" />
            <button onClick={props.addNewAdmin}>Create New Admin</button>
            <button onClick={props.closeNewAdmin}>Close Modal</button>
        </div>
    </div>
}

export default CreateNewAdmin;