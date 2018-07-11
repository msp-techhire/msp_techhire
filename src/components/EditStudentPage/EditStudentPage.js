import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../../components/Nav/Nav';
import axios from 'axios';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Edit from '@material-ui/icons/Edit'


const mapStateToProps = state => ({
  user: state.user,
});

class EditStudentPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      editOn: false,
      searchStudentQuery: '',
    }
  }

  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && (this.props.user.userName === null)) {  
      this.props.history.push('login');
    }
  }

  logout = () => {
    this.props.dispatch(triggerLogout());
    this.props.history.push('login');
  }

  fetchData = () => {
    axios.get(`/api/studentEdit`, {
      params: {
        search: this.state.searchStudentQuery
      }
    }).then((response) => {
      this.setState({
        results: response.data
      })
    }).catch((error) => {
      alert('error with GET');
    })
  }

  addEdit = (newEdit) => {
    axios.put(`/api/studentEdit/${this.state.editId}`, { searchStudentQuery: this.state })
      .then((response) => {
        this.fetchData();
        this.setState({
          editOn: false
        })
      })
      .catch(error => {
        console.error(`ERROR trying to PUT`);
        alert('Error: Edit was unsuccessful.');
      });
  }

  toggleEdit = (searchStudentToEdit) => () =>
    this.setState({
      editOn: true,
      searchStudentQuery: searchStudentToEdit.id,
      editId: searchStudentToEdit.id
    });

  handleSearchStudentChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    let content = null;

    let toggleButtonDisplayed = <Button id="editStudentButtons" variant="outlined" size="small" onClick={this.fetchStudentData}>Search</Button>
    if (this.state.editOn) {
      toggleButtonDisplayed = <Button id="editStudentButtons" variant="outlined" size="small" onClick={this.addEdit}>Submit Edit</Button>
    }

    if (this.props.user.userName) {
      content = (
        <div id="mplsPhoto">
          {this.props.data}
          <div id="mplsPhoto">
          </div>
          <div>
            <p id="adminTextTopOfPage">
              Edit Student Page
          </p>
            <button id="logoutButton"
              onClick={this.logout}>Log Out</button>
          </div>
          <div id="studentFieldSearch">
            <div>
              {toggleButtonDisplayed}
              <TextField
                id="addSearch"
                onChange={this.handleSearchStudentChange}
                name="searchStudentQuery"
                value={this.state.searchStudentQuery}
                label="Student Search"
                placeholder="Search Student"
                margin="normal" ></TextField>
            </div>
            <div>
              <table id="searchStudentTableResults">
                <tr>
                  <th>Partner</th>
                  <th>Id</th>
                  <th>Gender</th>
                  <th>YOB</th>
                  <th>POC</th>
                  <th>Ed Level</th>
                  <th>Residence</th>
                  <th >Scholarship</th>
                  <th>Pre-experience</th>
                  <th >Pre-wage</th>
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
                      <td><Button id="editButton" variant="outlined" size="small" onClick={this.toggleEdit(person)}><Edit /></Button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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

export default connect(mapStateToProps)(EditStudentPage);


