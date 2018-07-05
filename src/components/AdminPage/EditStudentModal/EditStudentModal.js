import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/Textfield';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';

export default class FormDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      person: this.props.person,
      personColumns: [
        'ID',
        'Formatted ID',
        'Partner ID',
        'Year of Birth',
        'Person of Color',
        'City of Residence',
        'Scholarship Recipient',
        'Previous Job Experience',
        'Pre-training Wage',
        'Training Start Date',
        'Training Type',
        'Exit Status',
        'Classroom or Online',
        'First Job Start Date',
        'First Job Title',
        'First Company',
        'First Job Starting Wage',
        'Second Job Start Date',
        'Second Job Title',
        'Second Company',
        'Second Job Starting Wage',
      ],
    }
  }
  state = {
    open: false,
  };

  saveChanges = () => {
    axios.put('/api/admin', {
      body: {
        person: this.state.person,
      },
    }).then(response => {
      console.log(response.data);
    }).catch(error => {
      console.error(`ERROR trying to PUT /api/admin: ${error}`);
      alert('ERROR trying to update student data');
    });
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <Button onClick={this.handleClickOpen}>Edit</Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Edit Student Information</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Formatted Id<TextField
                margin="dense"
                id={"person" + person.id}
              />
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}