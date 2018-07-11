import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';
import Edit from '@material-ui/icons/Edit';

export default class FormDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      person: this.props.person,
    }
  }
  state = {
    open: false,
  };

  saveChanges = () => {
    axios.put(`/api/admin/id/${this.state.person.id}`, {
      body: {
        person: this.state.person,
      },
    }).then(response => {
    }).catch(error => {
      console.error(`ERROR trying to PUT`);
      alert('ERROR trying to update');
    });
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const person = this.state.person;
    return (
      <div>
        <Button onClick={this.handleClickOpen}><Edit /></Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Edit Student Information</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Formatted ID:
              <TextField
                margin="dense"
                id={"person" + person.id}
                value={person.id}
              />
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}