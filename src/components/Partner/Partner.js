
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { USER_ACTIONS } from '../../redux/actions/userActions';
// import Grid from '@material-ui/core/Grid';
import CsvParse from '@vtex/react-csv-parse';
import swal from 'sweetalert';
import axios from 'axios';

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
    // this.fetchData();
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && (this.props.user.userName === null || this.props.user.userRole !== 'partner')) {
      this.props.history.push('login');
    }
  }

  handleData = data => {
    this.setState({ data })
    this.postPartnerData();
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
        <div>
          <table id="searchStudentTableResults">
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Scholarship Recipient</th>
              <th>Pre-training Wage</th>
              <th>Training Start Date</th>
              <th>Training Status</th>
              <th>Training End Date</th>
              <th>Training Type</th>
              <th>Job Placement Date</th>
              <th>Hiring Job Title</th>
              <th>Hiring Company</th>
              <th>Starting Wage</th>
            </tr>
            </thead>
            <tbody>
              {this.state.partnerList.map((person, i) => (
                <tr key={i}>
                  <td>{person.formatted_id}</td>
                  <td>{person.scholarship_recipient}</td>
                  <td>{person.pre_training_wage}</td>
                  <td>{person.training_start_date}</td>
                  <td>{person.training_status}</td>
                  <td>{person.training_end_date}</td>
                  <td>{person.training_type}</td>
                  <td>{person.start_date}</td>
                  <td>{person.title}</td>
                  <td>{person.company}</td>
                  <td>{person.starting_wage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <CsvParse
          keys={keys}
          onDataUploaded={this.handleData}
          onError={this.handleError}
          render={onChange => <input type="file" onChange={onChange} />}
        />
        {this.state.data && (
          <pre>{JSON.stringify(this.state.data, null, 2)}</pre>
        )}

        {this.state.error && (
          <pre>{JSON.stringify(this.state.error, null, 2)}</pre>
        )}
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