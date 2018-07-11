import React, { Component } from 'react';
import { connect } from 'react-redux';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import CsvParse from '@vtex/react-csv-parse';
import swal from 'sweetalert';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import { triggerLogout } from '../../redux/actions/loginActions';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import DialogContentText from '@material-ui/core/DialogContentText';

library.add(faInfoCircle)

const PAGE_LENGTH = 25;

const mapStateToProps = state => ({
  user: state.user,
});

const styles = theme => ({
  container: {
      justifyContent: 'center',
      
  },
});

class Partner extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: null,
      error: null,
      results: [],
      resultsLength: 0,
      currentPage: 0,
      totalPages: 0,
    }
  }
  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    this.fetchData();
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && (this.props.user.userName === null || this.props.user.userRole !== 'partner')) {
      this.props.history.push('login');
    }
  }

  handleData = data => {
    this.setState({ data })
    this.deletePerson();
    this.fetchData();
  }

  handleError = error => {
    this.setState({ error })
  }

  postPartnerData = () => {
    axios.post('/api/partner', this.state.data)
      .then((response) => {
        console.log('success');
        swal({
          title: 'You have successfully added data!',
          icon: 'success'
        });
      })
      .catch((error) => {
        swal('There was a problem.', 'Please fill out all fields.');
      })
  }

  fetchData = () => {
    axios.get(`/api/partner`)
      .then((response) => {
        const data = response.data;
        const totalPages = Math.ceil(data.length / PAGE_LENGTH);
        this.setState({
          results: data,
          resultsLength: data.length,
          currentPage: 1,
          totalPages: totalPages,
        });
      }).catch((error) => {
        alert('error with GET in Partner page', error);
      })
  }

  deletePerson = () => {
    axios.delete('/api/partner')
      .then((response) => {
        console.log(response);
        this.postPartnerData();
      })
      .then((response) => {
        console.log(response);
        window.location.reload();
      })
      .catch((error) => {
        console.log('error on delete: ', error);
        alert('You can only delete you added');
      })
  };

  logout = () => {
    this.props.dispatch(triggerLogout());
    this.props.history.push('login');
  }

  goToPage = page => {
    this.setState({
      currentPage: page,
    });
  }

  listPage = page => {
    if (this.state.currentPage === page) return <span style={{ color: "blue" }}>{page}</span>
    return <span style={{ textDecoration: "underline" }}>{page}</span>
  }

handleClickOpen = () => {
    this.setState({ open: true });
};

handleClose = () => {
    this.setState({ open: false })
};
  
  render() {
    const { classes } = this.props;
    let currentResults = [];
    let lowerResults = (this.state.currentPage - 1) * PAGE_LENGTH;
    let upperResults = this.state.currentPage * PAGE_LENGTH;
    for (let i = lowerResults; i < upperResults; i++) {
      if (this.state.results[i]) currentResults.push(this.state.results[i]);
    }

    let pages = [];
    for (let i = 0; i < this.state.totalPages; i++) {
      pages.push(<span key={`page-${i}`}>
        <a
          className="page-listing-il-block"
          style={{ cursor: "pointer" }}
          onClick={() => this.goToPage(i + 1)}>{this.listPage(i + 1)}</a> </span>
      );
    }
    const keys = [
      "formatted_id", "partner_id", "gender", "year_of_birth",
      "person_of_color", "education_level", "city_of_residence",
      "scholarship_recipient", "previous_job_experience",
      "pre_training_wage", "training_start_date",
      "training_status", "training_end_date", "training_type",
      "exit_status", "classroom_or_online", "start_date", "title",
      "company", "starting_wage", "second_start_date",
      "second_title", "second_company", "second_starting_wage"
    ]

    return (
      <div>
        <div id="photoPartnerPage"></div>
        <button id="logOutButton" size="medium" color="primary" style={{float: "right", marginRight: "67px"}}
          onClick={this.logout}>Log Out
            </button>
        <h1 className="partnerTextTopOfPage">Partner Portal</h1>
        <div>
          <CsvParse
            keys={keys}
            onDataUploaded={this.handleData}
            onError={this.handleError}
            render={onChange => <div><input className="chooseFilePartnerPageButton" type="file" id="file" onChange={onChange} />
              <label htmlFor="file">Upload File</label></div>}
          />
        </div>
        <div>
        <p onClick={this.handleClickOpen}>
        <FontAwesomeIcon icon={faInfoCircle} 
        style = {{color: "black",  fontSize: "30px",
        marginLeft: "143px",
        marginTop: "-43px",
        float: "left"
      }}
        /></p>
        <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogContent>
                      <DialogContentText>
                      To upload student data, click on the "Upload File" button.  Navigate to the spreadsheet used to report MSP TechHire student data and click "Open".
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Close
            </Button>
          </DialogActions>
                    </Dialog>
        </div>
        <div>
          <Table id="partnerTableResults">
            <TableHead>
              <TableRow id="tableHeader">
                <TableCell>Student ID</TableCell>
                <TableCell>Scholarship Recipient</TableCell>
                <TableCell>Pre-training Wage</TableCell>
                <TableCell>Training Start Date</TableCell>
                <TableCell>Training Status</TableCell>
                <TableCell>Training End Date</TableCell>
                <TableCell>Training Type</TableCell>
                <TableCell>Job Placement Date</TableCell>
                <TableCell>Hiring Job Title</TableCell>
                <TableCell>Hiring Company</TableCell>
                <TableCell>Starting Wage</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentResults.map((person, i) => (
                <TableRow key={i}>
                  <TableCell>{person.formatted_id}</TableCell>
                  <TableCell>{person.scholarship_recipient}</TableCell>
                  <TableCell>{person.pre_training_wage}</TableCell>
                  <TableCell>{person.training_start_date}</TableCell>
                  <TableCell>{person.training_status}</TableCell>
                  <TableCell>{person.training_end_date}</TableCell>
                  <TableCell>{person.training_type}</TableCell>
                  <TableCell>{person.start_date}</TableCell>
                  <TableCell>{person.title}</TableCell>
                  <TableCell>{person.company}</TableCell>
                  <TableCell>{person.starting_wage}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div id="pagesPerSearchDisplay" style={{ textAlign: "center" }}>
          {pages}<br />
          Total results: {this.state.resultsLength}
        </div>
      </div>
    )
  }
}
Partner.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(Partner));