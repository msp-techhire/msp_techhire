import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../../components/Nav/Nav';
import axios from 'axios';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';

import JsonArrayToCsv from '../JsonArrayToCsv/JsonArrayToCsv';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Edit from '@material-ui/icons/Edit';

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
        'Training Status',
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
      personColumnNames: [
        'formatted_id',
        'partner_id',
        'year_of_birth',
        'person_of_color',
        'education_level',
        'city_of_residence',
        'scholarship_recipient',
        'previous_job_experience',
        'pre_training_wage',
        'training_start_date',
        'training_status',
        'training_end_date',
        'training_type',
        'exit_status',
        'classroom_or_online',
        'start_date',
        'title',
        'company',
        'starting_wage',
        'second_start_date',
        'second_title',
        'second_company',
        'second_starting_wage'
      ],
      searchCounter: 0,
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

  addElement = (parentId, elementTag, elementId, html) => {
    let parent = document.getElementById(parentId);
    let newElement = document.createElement(elementTag);
    newElement.setAttribute('class', 'il-block');
    newElement.setAttribute('id', 'drop-' + elementId);
    newElement.innerHTML = html;
    parent.append(newElement);
  }

  removeElement = elementId => {
    const element = document.getElementById(elementId);
    element.parentNode.removeChild(element);
  }

  setNewAttribute = (id, attribute, value) => {
    let element = document.getElementById(id);
    element.setAttribute(attribute, value);
  }

  addSearchField = (parentId, id) => {
    this.addElement(parentId, 'div', 'drop-' + id, '');
    this.addElement('drop-' + id, 'select', 'option-' + id, '');
    for (let i = 0; i < 23; i++) {
      this.addElement('option-' + id, 'option', id + '-' + i, this.state.personColumns[i]);
      this.setNewAttribute(id + '-' + i, 'value', this.state.personColumnNames[i]);
    }
    this.setState({ searchCounter: this.state.searchCounter + 1 });
  }

  addSearch = (parent) => {
    let newParent = document.getElementById(parent);
    let selectElement = document.createElement('select');
    let divElement = document.createElement('div');
    divElement.setAttribute('id', 'search-' + this.state.searchCounter)
    selectElement.setAttribute('class', 'il-block');
    for (let i = 0; i < 23; i++) {
      let optionElement = document.createElement('option');
      optionElement.setAttribute('value', this.state.personColumnNames[i]);
      optionElement.innerHTML = this.state.personColumns[i];
      selectElement.append(optionElement);
    }
    let inputElement = document.createElement('input');
    let deleteSearch = document.createElement('button');
    let node = `document.getElementById('search-${this.state.searchCounter}')`;
    deleteSearch.setAttribute('onclick', `${node}.parentElement.removeChild(${node})`);
    deleteSearch.innerHTML = 'Remove';
    divElement.append(selectElement);
    divElement.append(inputElement);
    divElement.append(deleteSearch);
    newParent.append(divElement);
    this.setState({
      searchCounter: this.state.searchCounter + 1
    });
  }

  dropDown = id => {
    return <div className="il-block" id={"drop-" + id}>
      <select id={"option-" + id}>
        <option id={id + "-1"} value="formatted_id">Formatted ID</option>
        <option id={id + "-2"} value="partner_id">Partner ID</option>
        <option id={id + "-3"} value="year_of_birth">Year of Birth</option>
        <option id={id + "-4"} value="person_of_color">Person of Color</option>
        <option id={id + "-5"} value="education_level">Education Level</option>
        <option id={id + "-6"} value="city_of_residence">City of Residence</option>
        <option id={id + "-7"} value="scholarship_recipient">Scholarship Recipient</option>
        <option id={id + "-8"} value="previous_job_experience">Previous Job Experience</option>
        <option id={id + "-9"} value="pre_training_wage">Pre-training Wage</option>
        <option id={id + "-10"} value="training_start_date">Training Start Date</option>
        <option id={id + "-11"} value="training_status">Training Status</option>
        <option id={id + "-12"} value="training_end_date">Training End Date</option>
        <option id={id + "-13"} value="training_type">Training Type</option>
        <option id={id + "-14"} value="exit_status">Exit Status</option>
        <option id={id + "-15"} value="classroom_or_online">Classroom or Online</option>
        <option id={id + "-16"} value="start_date">First Job Start Date</option>
        <option id={id + "-17"} value="title">First Job Title</option>
        <option id={id + "-18"} value="company">First Company</option>
        <option id={id + "-19"} value="starting_wage">First Job Starting Wage</option>
        <option id={id + "-20"} value="second_start_date">Second Job Start Date</option>
        <option id={id + "-21"} value="second_title">Second Job Title</option>
        <option id={id + "-22"} value="second_company">Second Company</option>
        <option id={id + "-23"} value="second_starting_wage">Second Job Starting Wage</option>
      </select>
      <input id={"field-" + id} />
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

  singleFieldSearch = (event) => {
    event.preventDefault();
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
          style={{ cursor: "pointer" }}
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
            <p id="searchTextTopOfPage">
              Search Page
          </p>
          </div>
          <div className="wrapperGridAdmin">
            <div id="inputFieldSearch" className="il-block">
            <button onClick={() => this.addSearch('advanced-search')}>Add Field</button>
              <div id="advanced-search" className="il-block">
                <form onSubmit={this.state.singleFieldSearch}>
                  <TextField
                    id="fieldSearch"
                    onChange={this.handleSearchChange}
                    name="fieldSearchQuery"
                    value={this.state.fieldSearchQuery}
                    label="Search Single Field"
                    placeholder="Search"
                    margin="normal" ></TextField>
                  {buttonDisplayed}
                </form>
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
          </div>
          <div>
            <Table id="searchTableResults">
              <TableHead>
                <TableRow id="tableHeader">
                  <TableCell>Gender</TableCell>
                  <TableCell>POC</TableCell>
                  <TableCell>Ed Level</TableCell>
                  <TableCell>Scholarship</TableCell>
                  <TableCell>Pre-wage</TableCell>
                  <TableCell>Start Date</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Company</TableCell>
                  <TableCell>New wage</TableCell>
                  <TableCell>Exit Status</TableCell>
                  <TableCell>Edit</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentResults.map((person, i) => (
                  <TableRow key={i} id="onHoverTableHighlight">
                    <TableCell>{person.gender}</TableCell>
                    <TableCell>{person.person_of_color}</TableCell>
                    <TableCell>{person.education_level}</TableCell>
                    <TableCell>{person.scholarship_recipient}</TableCell>
                    <TableCell>{person.pre_training_wage}</TableCell>
                    <TableCell>{person.start_date}</TableCell>
                    <TableCell>{person.title}</TableCell>
                    <TableCell>{person.company}</TableCell>
                    <TableCell>{person.starting_wage}</TableCell>
                    <TableCell>{person.exit_status}</TableCell>
                    <TableCell><Edit /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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