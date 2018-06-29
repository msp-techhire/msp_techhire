import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../../components/Nav/Nav';
import axios from 'axios';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';

import JsonArrayToCsv from '../JsonArrayToCsv/JsonArrayToCsv';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Edit from '@material-ui/icons/Edit'

// import Modal from './modal/modal';


const mapStateToProps = state => ({
  user: state.user,
});

class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      searchQuery: '',
      fieldSearchQuery: '',
      fieldName: '',
      editStudent: {},
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
      this.setState({
        results: response.data
      })
    }).catch((error) => {
      alert('error with GET in Admin file', error);
    })
  }

  singleFieldSearch = () => {
    const name = this.state.fieldName;
    const query = this.state.fieldSearchQuery;
    axios.get(`/api/admin/${name}?search=${query}`).then(response => {
      this.setState({
        results: response.data
      });
    }).catch(error => {
      console.error(`ERROR trying to GET /api/admin/field/:name?search=[QUERY]:\n${error}`);
      alert('Error in field search.');
    });
  }

  handleSearchChange = (event) => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    })
  }

  editStudent = person => {
    this.setState({editStudent: person}, () => {
      let student = this.state.editStudent;
      console.log(student);
    });
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
          <div id="inputFieldSearch" className="il-block">
            <div className="il-block">
              <TextField
                id="fieldSearch"
                onChange={this.handleSearchChange}
                name="fieldSearchQuery"
                value={this.state.fieldSearchQuery}
                label="Search Single Field"
                placeholder="Search"
                margin="normal" ></TextField>
              {buttonDisplayed}
            </div>
            <div className="il-block">
              <TextField
                id="addSearch"
                onChange={this.handleSearchChange}
                name="searchQuery"
                value={this.state.searchQuery}
                label="Search Everything"
                placeholder="Search"
                margin="normal" ></TextField>
              {buttonDisplayed}
            </div>
          </div>
          <JsonArrayToCsv convert={this.state.results} />
          <div>
            <table id="searchTableResults">
              <thead>
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
              </thead>
              <tbody>
                {this.state.results.map((person, i) => (
                  <tr key={i}>
                    <td>{person.partner_id}</td>
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
                    {/* <td><Modal /></td> */}
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


