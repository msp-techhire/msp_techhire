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

const PAGE_LENGTH = 25;

const mapStateToProps = state => ({
  user: state.user,
});

class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      resultsLength: 0,
      currentPage: 0,
      totalPages: 0,
      searchQuery: '',
      fieldSearchQuery: '',
      fieldName: '',
      editStudent: {},
      personColumns: [
        'Formatted ID',
        'Partner ID',
        'Year of Birth',
        'Person of Color',
        'Education Level',
        'City of Residence',
        'Scholarship Recipient',
        'Previous Job Experience',
        'Pre-training Wage',
        'Training Start Date',
        'Training Type',
        'Training End Date',
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

  dropDown = id => {
    <div>
      <select id={"option-"+id}>
        <option value="formatted_id">Formatted ID</option>
        <option value="partner_id">Partner ID</option>
        <option value="year_of_birth">Year of Birth</option>
        <option value="person_of_color">Person of Color</option>
        <option value="education_level">Education Level</option>
        <option value="city_of_residence">City of Residence</option>
        <option value="scholarship_recipient">Scholarship Recipient</option>
        <option value="previous_job_experience">Previous Job Experience</option>
        <option value="pre_training_wage">Pre-training Wage</option>
        <option value="training_start_date">Training Start Date</option>
        <option value="training_status">Training Status</option>
        <option value="training_end_date">Training End Date</option>
        <option value="training_type">Training Type</option>
        <option value="exit_status">Exit Status</option>
        <option value="classroom_or_online">Classroom or Online</option>
        <option value="start_date">First Job Start Date</option>
        <option value="title">First Job Title</option>
        <option value="company">First Company</option>
        <option value="starting_wage">First Job Starting Wage</option>
        <option value="second_start_date">Second Job Start Date</option>
        <option value="second_title">Second Job Title</option>
        <option value="second_company">Second Company</option>
        <option value="second_starting_wage">Second Job Starting Wage</option>
      </select>
      <input id={"field-"+id} />
    </div>
  }

  getTableColumns = tableName => {
    axios.get(`/api/admin/columns/${tableName}`).then(response => {
      const data = response.data;
      let columns = [];
      for (let item of data) {
        columns.push(item.column_name);
      }
      this.setState({
        personColumns: columns,
      });
    }).catch(error => {
      console.error(`ERROR trying to GET /api/admin/columns/:name: ${error}`);
      alert('Error: Retrieving table columns was unsuccessful.');
    });
  }

  fetchData = () => {
    axios.get(`/api/admin`, {
      params: {
        search: this.state.searchQuery
      }
    }).then((response) => {
      const data = response.data;
      const totalPages = Math.ceil(data.length / PAGE_LENGTH);
      this.setState({
        results: data,
        resultsLength: data.length,
        currentPage: 1,
        totalPages: totalPages,
      });
    }).catch((error) => {
      console.error(error);
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
    });
  }

  editStudent = person => {
    this.setState({ editStudent: person }, () => {
      let student = this.state.editStudent;
      console.log(student);
    });
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

  render() {
    let content = null;

    let buttonDisplayed = <Button id="searchButtons" variant="outlined" size="small" onClick={this.fetchData}>Search</Button>

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
          className="page-listing il-block"
          style={{ fontSize: "14pt", cursor: "pointer" }}
          onClick={() => this.goToPage(i + 1)}>{this.listPage(i + 1)}</a> </span>
      );
    }

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
                  <th>Gender</th>
                  <th>POC</th>
                  <th>Ed Level</th>
                  <th>Scholarship</th>
                  <th>Pre-wage</th>
                  <th>Start Date</th>
                  <th>Title</th>
                  <th>Company</th>
                  <th>New wage</th>
                  <th>Exit Status</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {currentResults.map((person, i) => (
                  <tr key={i}>
                    <td>{person.gender}</td>
                    <td>{person.person_of_color}</td>
                    <td>{person.education_level}</td>
                    <td>{person.scholarship_recipient}</td>
                    <td>{person.pre_training_wage}</td>
                    <td>{person.start_date}</td>
                    <td>{person.title}</td>
                    <td>{person.company}</td>
                    <td>{person.starting_wage}</td>
                    <td>{person.exit_status}</td>
                    {/* <td><Modal /></td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ textAlign: "center" }}>
            {pages}<br />
            Total results: {this.state.resultsLength}
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


