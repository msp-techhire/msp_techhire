import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../../components/Nav/Nav';
import axios from 'axios';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


const mapStateToProps = state => ({
  user: state.user,
});

class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      searchQuery: '',
    }
  }

  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && (this.props.user.userName === null || this.props.user.userRole !== 'admin')) {
      this.props.history.push('login');
    }
  }

  logout = () => {
    this.props.dispatch(triggerLogout());
    this.props.history.push('login');
  }

  fetchData = () => {
    axios.get(`/api/admin`, {
      params: {
        search: this.state.searchQuery
      }
    }).then((response) => {
      console.log(response.data);
      this.setState({
        results: response.data
      })
    }).catch((error) => {
      alert('error with GET in Admin file', error);
    })
  }

  handleSearchChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    let content = null;

    let buttonDisplayed = <Button id="searchButtons" variant="outlined" size="small" onClick={this.fetchData}>Search</Button>

    if (this.props.user.userName) {
      content = (
        <div id="mplsPhoto">
          {this.props.data}
          <div id="mplsPhoto">
          </div>
          <div>
            <p id="adminTextTopOfPage">
              Admin Page
          </p>
            <button id="logoutButton"
              onClick={this.logout}>Log Out</button>
          </div>
          <div id="inputFieldSearch">
            <div>
              <TextField
                id="addSearch"
                onChange={this.handleSearchChange}
                name="searchQuery"
                value={this.state.searchQuery}
                label="Enter Search"
                placeholder="Search"
                margin="normal" ></TextField>
              {buttonDisplayed}
            </div>
          </div>
          <div>
            <table id="searchTableResults">
              <tr>
                <th>Partner</th>
                <th>Id</th>
                <th>Gender</th>
                <th>YOB</th>
                <th>POC</th>
                <th>Ed Level</th>
                <th>Residence</th>
                <th>Scholarship</th>
                <th>Pre-experience</th>
                <th>Pre-wage</th>
                <th>Start Date</th>
                <th>Current Status</th>
                <th>End Date</th>
                <th>Type</th>
                <th>Class Type</th>
                <th>Exit Status</th>
                <th>Edit</th>
              </tr>
              <tbody>
                {this.state.results.map((person, i) => (
                  <tr key={i}>
                    <td >{person.partner_id}</td>
                    <td>{person.formatted_id}</td>
                    <td>{person.gender}</td>
                    <td>{person.year_of_birth}</td>
                    <td>{person.person_of_color}</td>
                    <td>{person.education_level}</td>
                    <td>{person.city_of_residence}</td>
                    <td>{person.scholarship_recipient}</td>
                    <td>{person.previous_job_experience}</td>
                    <td>{person.pre_training_wage}</td>
                    <td>{person.training_start_date}</td>
                    <td>{person.training_status}</td>
                    <td>{person.training_end_date}</td>
                    <td>{person.training_type}</td>
                    <td>{person.classroom_or_online}</td>
                    <td>{person.exit_status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    return (
      <div>
        <Nav />
        {content}
      </div>
    );
  }
}

export default connect(mapStateToProps)(AdminPage);


