// import React from 'react';
// import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';

// export default class FormDialog extends React.Component {
//   state = {
//     open: false,
//   };

//   handleClickOpen = () => {
//     this.setState({ open: true });
//   };

//   handleClose = () => {
//     this.setState({ open: false });
//   };

//   render() {
//     return (
//       <div style={{display:"inline-block"}}>
//         <Button  onClick={this.handleClickOpen}>Edit</Button>
//         <Dialog
//           open={this.state.open}
//           onClose={this.handleClose}
//           aria-labelledby="form-dialog-title"
//         >
//           <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
//           <DialogContent>
//             <DialogContentText>
//               Change any of the fields
//             </DialogContentText>
//             <TextField
//               autoFocus
//               margin="dense"
//               id="name"
//               label="Email Address"
//               type="email"
//               fullWidth
//             />
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={this.handleClose} color="primary">
//               Cancel
//             </Button>
//             <Button onClick={this.handleClose} color="primary">
//               Subscribe
//             </Button>
//           </DialogActions>
//         </Dialog>
//       </div>
//     );
//   }
// }