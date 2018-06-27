
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import Grid from '@material-ui/core/Grid';
import CsvParse from '@vtex/react-csv-parse'
import swal from 'sweetalert'
import axios from 'axios'
const mapStateToProps = state => ({
  user: state.user,
});

class Partner extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: null,
      error: null
    }
  }
  componentDidMount() {
    this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && (this.props.user.userName === null || this.props.user.userRole !== 'partner')) {
      this.props.history.push('login');
    }
  }

  handleData = data => {
    this.setState({ data })
    this.postPartnerData();
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
        swal('There was a problem.',  'Please fill out all fields.');
      })
  }

  render() {
    const keys = [
      "partner_id", "formatted_id", "gender", "year_of_birth", 
      "person_of_color", "education_level", "city_of_residence", 
      "scholarship_recipient", "previous_job_experience", 
      "pre_training_wage", "training_start_date", 
      "training_status", "training_end_date", "training_type", "classroom_or_online",
      "exit_status", "start_date", "title", "company", "starting_wage", "end_date"
    ]
  
    return (
      <div>
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