
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { USER_ACTIONS } from '../../redux/actions/userActions';
// import Grid from '@material-ui/core/Grid';
import CsvParse from '@vtex/react-csv-parse';
import swal from 'sweetalert';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const mapStateToProps = state => ({
  user: state.user,
});

class Partner extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: null,
      error: null,
      partnerList: []
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
    // this.postPartnerData();
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
        console.log(response.data);
        this.setState({
          partnerList: response.data
        })
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

  render() {
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
        <h1 className="partnerTextTopOfPage">Partner Page</h1>
        <h2 className="partnerTextDownloadFiles">Download Files</h2>
        <div>
        <CsvParse
          keys={keys}
          onDataUploaded={this.handleData}
          onError={this.handleError}
          render={onChange => <input className="chooseFilePartnerPageButton" type="file" onChange={onChange}/> }
        />
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
              {this.state.partnerList.map((person, i) => (
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
        {/* {this.state.data && (
          <pre>{JSON.stringify(this.state.data, null, 2)}</pre>
        )}

        {this.state.error && (
          <pre>{JSON.stringify(this.state.error, null, 2)}</pre>
        )} */}
      </div>
    )
    // let content = null;
    // if (this.props.user.userName) {
    //   content = (

    //     <div>
    //         <Grid item xs="12" zeroMinWidth>
    //             <form onSubmit={this.handleSubmit}>
    //               <label>
    //                 Upload file:
    //                 <input type="file" accept=".csv" /> 
    //                 {/* ref={input => {this.fileInput = input}} */}
    //               </label>
    //               <br />
    //               <button type="submit">Submit</button>
    //             </form>
    //           </Grid>
    //     </div>
    //   );
    // }

    //   return (
    //     <div>
    //       { content }
    //     </div>
    //   );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(Partner);