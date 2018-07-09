import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../../components/Nav/Nav';
import axios from 'axios';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';

import JsonArrayToCsv from '../JsonArrayToCsv/JsonArrayToCsv';
import EditStudentModal from './EditStudentModal/EditStudentModal';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Edit from '@material-ui/icons/Edit';
import CreateNewAdmin from './CreateNewAdmin/CreateNewAdmin';

// import Modal from './modal/modal';

const PAGE_LENGTH = 25;

const mapStateToProps = state => ({
  user: state.user,
});

class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selection: null,
      value: '',
      field: '*',
      results: [],
      resultsLength: 0,
      currentPage: 0,
      totalPages: 0,
      searchQuery: '',
      fieldSearchQuery: '',
      fieldName: '',
      editStudent: {},
      newAdmin: {
        show: false,
        username: '',
        password: '',
      },
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
      searchFields: [],
      partners: [],
    }
  }

  handleValueChange = event => {
    this.setState({
      value: event.target.value
    });
  }

  /* Field Displays START */
  all = () => {
    return <input
      type="text"
      className="advanced-search"
      onLoad={this.handleValueChange}
      onChange={this.handleValueChange} />
  }

  formattedId = () => {
    return <input
      type="text"
      className="advanced-search"
      placeholder="ie. P-1015"
      onLoad={this.handleValueChange}
      onChange={this.handleValueChange} />
  }

  partnerId = () => {
    return <select
      className="advanced-search"
      onLoad={this.handleValueChange}
      onChange={this.handleValueChange}>
      <option value="">--Select--</option>
      {this.state.partners.map(partner => <option key={partner.id} value={partner.id}>{partner.org_name}</option>)}
    </select>
  }

  gender = () => {
    return <select
      className="advanced-search"
      onLoad={this.handleValueChange}
      onChange={this.handleValueChange}>
      <option value="">--Select--</option>
      <option value="Male">Male</option>
      <option value="Female">Female</option>
      <option value="Other">Other</option>
      <option value="Unreported">Unreported</option>
    </select>
  }

  yearOfBirth = () => {
    return <input
      type="number"
      className="advanced-search"
      placeholder="ie. 1985"
      onLoad={this.handleValueChange}
      onChange={this.handleValueChange} />
  }

  personOfColor = () => {
    return <select
      className="advanced-search"
      onLoad={this.handleValueChange}
      onChange={this.handleValueChange}>
      <option value="">--Select--</option>
      <option value="Yes">Yes</option>
      <option value="No">No</option>
      <option value="Unreported">Unreported</option>
    </select>
  }

  educationLevel = () => {
    return <select
      className="advanced-search"
      onLoad={this.handleValueChange}
      onChange={this.handleValueChange}>
      <option value="">--Select--</option>
      <option value="HS/GED">HS/GED</option>
      <option value="Some College">Some College</option>
      <option value="Associates">Associates</option>
      <option value="Bachelors">Bachelors</option>
      <option value="Graduate and Beyond">Graduate and Beyond</option>
    </select>
  }

  cityOfResidence = () => {
    return <input
      type="text"
      className="advanced-search"
      placeholder="ie. Minneapolis"
      onLoad={this.handleValueChange}
      onChange={this.handleValueChange} />
  }

  scholarshipRecipient = () => {
    return <select
      className="advanced-search"
      onLoad={this.handleValueChange}
      onChange={this.handleValueChange}>
      <option value="">--Select--</option>
      <option value="Yes">Yes</option>
      <option value="No">No</option>
    </select>
  }

  previousJobExperience = () => {
    return <input
      type="text"
      className="advanced-search"
      placeholder="ie. Manager"
      onLoad={this.handleValueChange}
      onChange={this.handleValueChange} />
  }

  preTrainingWage = () => {
    return <input
      type="number"
      className="advanced-search"
      placeholder="ie. 15.25"
      onLoad={this.handleValueChange}
      onChange={this.handleValueChange} />
  }

  trainingStartDate = () => {
    return <input
      type="text"
      className="advanced-search"
      placeholder="DD/MM/YYYY"
      onLoad={this.handleValueChange}
      onChange={this.handleValueChange} />
  }

  trainingStatus = () => {
    return <select
      className="advanced-search"
      onLoad={this.handleValueChange}
      onChange={this.handleValueChange}>
      <option value="">--Select--</option>
      <option value="In Training">In Training</option>
      <option value="Graduated">Graduated</option>
      <option value="Removed">Removed</option>
      <option value="Withdrew">Withdrew</option>
    </select>
  }

  trainingEndDate = () => {
    return <input
      type="text"
      className="advanced-search"
      placeholder="DD/MM/YYYY"
      onLoad={this.handleValueChange}
      onChange={this.handleValueChange} />
  }

  trainingType = () => {
    return <input
      type="text"
      className="advanced-search"
      placeholder="ie. IT Fundamentals"
      onLoad={this.handleValueChange}
      onChange={this.handleValueChange} />
  }

  exitStatus = () => {
    return <select
      className="advanced-search"
      onLoad={this.handleValueChange}
      onChange={this.handleValueChange}>
      <option value="">--Select--</option>
      <option value="Entered Employment">Entered Employment</option>
      <option value="Entered Military">Entered Military</option>
      <option value="Enrolled in Additional Training">Enrolled in Additional Training</option>
      <option value="Health/Medical">Health/Medical</option>
      <option value="Institutionalized">Institutionalized</option>
      <option value="Incarcerated">Incarcerated</option>
    </select>
  }

  classroomOrOnline = () => {
    return <select
      className="advanced-search"
      onLoad={this.handleValueChange}
      onChange={this.handleValueChange}>
      <option value="">--Select--</option>
      <option value="Classroom">Classroom</option>
      <option vlaue="Online">Online</option>
    </select>
  }

  startDate = () => {
    return <input
      type="text"
      className="advanced-search"
      placeholder="DD/MM/YYYY"
      onLoad={this.handleValueChange}
      onChange={this.handleValueChange} />
  }

  title = () => {
    return <input
      type="text"
      className="advanced-search"
      placeholder="ie. Junior Developer"
      onLoad={this.handleValueChange}
      onChange={this.handleValueChange} />
  }

  company = () => {
    return <input
      type="text"
      className="advanced-search"
      placeholder="ie. Microsoft"
      onLoad={this.handleValueChange}
      onChange={this.handleValueChange} />
  }

  startingWage = () => {
    return <input
      type="number"
      className="advanced-search"
      placeholder="ie. 20.25"
      onLoad={this.handleValueChange}
      onChange={this.handleValueChange} />
  }

  secondStartDate = () => {
    return <input
      type="text"
      className="advanced-search"
      placeholder="DD/MM/YYYY"
      onLoad={this.handleValueChange}
      onChange={this.handleValueChange} />
  }

  secondTitle = () => {
    return <input
      type="text"
      className="advanced-search"
      placeholder="ie. Web Developer"
      onLoad={this.handleValueChange}
      onChange={this.handleValueChange} />
  }

  secondCompany = () => {
    return <input
      type="text"
      className="advanced-search"
      placeholder="ie. Google"
      onLoad={this.handleValueChange}
      onChange={this.handleValueChange} />
  }

  secondStartingWage = () => {
    return <input
      type="number"
      className="advanced-search"
      placeholder="ie. 22.50"
      onLoad={this.handleValueChange}
      onChange={this.handleValueChange} />
  }
  /* Field Displays END */

  handleFieldChange = event => {
    const selection = event.target.value;
    let setSelection;
    this.setState({ value: null });
    switch (selection) {
      case '*':
        setSelection = this.all();
        break;
      case 'formatted_id':
        setSelection = this.formattedId();
        break;
      case 'partner_id':
        setSelection = this.partnerId();
        break;
      case 'gender':
        setSelection = this.gender();
        break;
      case 'year_of_birth':
        setSelection = this.yearOfBirth();
        break;
      case 'person_of_color':
        setSelection = this.personOfColor();
        break;
      case 'education_level':
        setSelection = this.educationLevel();
        break;
      case 'city_of_residence':
        setSelection = this.cityOfResidence();
        break;
      case 'scholarship_recipient':
        setSelection = this.scholarshipRecipient();
        break;
      case 'previous_job_experience':
        setSelection = this.previousJobExperience();
        break;
      case 'pre_training_wage':
        setSelection = this.preTrainingWage();
        break;
      case 'training_start_date':
        setSelection = this.trainingStartDate();
        break;
      case 'training_status':
        setSelection = this.trainingStatus();
        break;
      case 'training_end_date':
        setSelection = this.trainingEndDate();
        break;
      case 'training_type':
        setSelection = this.trainingType();
        break;
      case 'exit_status':
        setSelection = this.exitStatus();
        break;
      case 'classroom_or_online':
        setSelection = this.classroomOrOnline();
        break;
      case 'start_date':
        setSelection = this.startDate();
        break;
      case 'title':
        setSelection = this.title();
        break;
      case 'company':
        setSelection = this.company();
        break;
      case 'starting_wage':
        setSelection = this.startingWage();
        break;
      case 'second_start_date':
        setSelection = this.secondStartDate();
        break;
      case 'second_title':
        setSelection = this.secondTitle();
        break;
      case 'second_company':
        setSelection = this.secondCompany();
        break;
      case 'second_starting_wage':
        setSelection = this.secondStartingWage();
        break;
      default:
        setSelection = this.all();
        break;
    }
    this.setState({
      selection: setSelection,
      field: event.target.value,
    });
  }

  // getPartnerIds = () => {
  //   axios.get('/')
  // }
  fetchAll = () => {
    let data;
    axios.get(`/api/admin/all`).then(response => {
      const data = response.data;
      const totalPages = Math.ceil(data.length / PAGE_LENGTH);
      this.setState({
        results: data,
        resultsLength: data.length,
        currentPage: 1,
        totalPages: totalPages,
      });
    }).catch(error => {
      console.error(`ERROR trying to GET /api/admin/all: ${error}`);
      alert('Oops! Something went wrong!');
    });
  }

  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    this.setState({ selection: this.all() });
    axios.get(`/api/admin/partners`).then(response => {
      this.setState({
        partners: response.data,
      }, () => console.log(this.state.partners));
    });
    this.fetchAll();
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

  openNewAdmin = () => {
    this.setState({
      newAdmin: {
        show: true
      }
    });
  }

  closeNewAdmin = () => {
    this.setState({
      newAdmin: {
        show: false
      }
    });
  }

  addNewAdmin = () => {
    axios({
      method: 'POST',
      url: '/api/summary/newAdmin',
      data: {
        username: this.state.newAdmin.username,
        password: this.state.newAdmin.password,
      }
    })
    .then(response => this.closeNewAdmin())
    .catch(err => console.log(err))
  }

  handleNewAdminChange = (event) => {
    this.setState({
      newAdmin: {
        ...this.state.newAdmin,
        [event.target.name]: event.target.value
      }
    });
  }

  /*
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
    selectElement.setAttribute('id', `drop-${this.state.searchCounter}`);
    for (let i = 0; i < 23; i++) {
      let optionElement = document.createElement('option');
      optionElement.setAttribute('value', this.state.personColumnNames[i]);
      optionElement.innerHTML = this.state.personColumns[i];
      selectElement.append(optionElement);
    }
    let inputElement = document.createElement('input');
    let deleteSearch = document.createElement('button');
    let node = `document.getElementById('search-${this.state.searchCounter}')`;
    deleteSearch.setAttribute('onclick', `${node}.parentElement.removeChild(${node}); `);
    deleteSearch.innerHTML = 'Remove';
    divElement.append(selectElement);
    divElement.append(inputElement);
    divElement.append(deleteSearch);
    newParent.append(divElement);
    this.setState({
      searchFields: [...this.state.searchFields, `search-${this.state.searchCounter}`],
      searchCounter: this.state.searchCounter + 1,
    });
  }
  */

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
    for (let field of this.state.searchFields) {
      const searchField = document.getElementById(field);
      if (searchField) {
        console.log(searchField.childNodes[0].nodeValue);
      }
    }
    // const name = this.state.fieldName;
    // const query = this.state.fieldSearchQuery;
    // axios.get(`/api/admin/${name}?search=${query}`).then(response => {
    //   this.setState({
    //     results: response.data
    //   });
    // }).catch(error => {
    //   console.error(`ERROR trying to GET /api/admin/field/:name?search=[QUERY]:\n${error}`);
    //   alert('Error in field search.');
    // });
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

  search = () => {
    if (this.state.field === '*') {
      this.setState({ searchQuery: this.state.value }, () => this.fetchData());
    } else {
      axios.get(`/api/admin/field/${this.state.field}?search=${this.state.value}`)
        .then(response => {
          const data = response.data;
          const totalPages = Math.ceil(data.length / PAGE_LENGTH);
          this.setState({
            results: data,
            resultsLength: data.length,
            currentPage: 1,
            totalPages: totalPages,
          });
        }).catch(error => {
          console.error(`ERROR trying to GET /api/admin/field/:name?search=[query]: ${error}`);
          alert("Uh-oh! Something went wrong with the search!");
        });
    }
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
              Search
          </p>
          </div>
          <div>
            <button id="addNewAdmin" onClick={this.openNewAdmin}>Add New Admin Account</button>
            <CreateNewAdmin
              addNewAdmin={this.addNewAdmin}
              closeNewAdmin={this.closeNewAdmin}
              newAdmin={this.state.newAdmin}
              handleNewAdminChange={this.handleNewAdminChange}
            />
          </div>
          <div className="wrapperGridAdmin">
            <div id="inputFieldSearch" className="il-block">
              {/* <div className="il-block">
                <TextField
                  id="addSearch"
                  onChange={this.handleSearchChange}
                  name="searchQuery"
                  value={this.state.searchQuery}
                  label="Search Everything"
                  placeholder="Search"
                  margin="normal" ></TextField>
                {buttonDisplayed}
              </div> */}
            </div><br />
            <div id="advanced-search">
              <div id="first-adv-search">
                <div className="AdvancedSearch">
                  <select className="advanced-search" onChange={this.handleFieldChange}>
                    <option value="*">All Fields</option>
                    <option value="formatted_id">Formatted ID</option>
                    <option value="partner_id">Partner</option>
                    <option value="gender">Gender</option>
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
                  {this.state.selection}
                  <button id="searchSubmit" onClick={this.search}>Search</button>
                </div>
              </div>
              <div id="second-adv-search">
              </div>
              <div id="third-adv-search">
              </div>
            </div>
          </div>
          <div>
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
                  {/* <TableCell>Edit</TableCell> */}
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
                    {/* <TableCell><EditStudentModal person={person}/></TableCell> */}
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