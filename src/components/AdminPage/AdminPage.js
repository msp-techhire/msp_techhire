import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../../components/Nav/Nav';
import axios from 'axios';


import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Delete from '@material-ui/icons/Delete'
import Edit from '@material-ui/icons/Edit'


const mapStateToProps = state => ({
  user: state.user,
});

class AdminPage extends Component {

  // TO DO
  // work in progress for search
  // need dummy data to test

  // adding fields to search

  constructor(props) {
    super(props);
    this.state = {
      results: [],
      training_id: 3,
      gender: '',
      person_of_color: true,
      education_level: 'HS/GED',
      city_of_residence: 'Minneapolis',
      scholarship_recipient: true, 
      previous_job_experience: 'Employee',
      pre_training_wage: 10,
      training_start_date: '1800-01-01', 
      training_status: 'In training',
      training_end_date: '1800-01-01', 
      exit_status: 'Entered Employment',
      editOn: false,
    }
  }

  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });

    // TO DO
    // work in progress for search
    // need dummy data to test

    // adding data fetch

    this.fetchData();
    this.setState({
      subtopic: this.props.match.params.id
    })
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

  // TO DO
  // work in progress for search
  // need dummy data to test

  // adding new gets, posts, edits, and deletes ---------------

  fetchData() {
    axios.get(`/api/admin/${this.props.match.params.id}`).then((response) => {
      console.log(response.data[0]);
      this.setState({
        results: response.data,
        gender: '',
      })
    }).catch((error) => {
      alert('error with GET in Admin file');
    })
  }

  sendData = () => {
    console.log('button clicked');
    axios.post('/api/admin', this.state).then((response) => {
      console.log('success');
      this.fetchData();
    }).catch((error) => {
      alert('POST error in Admin file');
      console.log(error);
    });
  }

  dataDelete = id => {
    console.log(this.state.results);
    const deletion = `/api/admin/${id}`
    axios.delete(deletion).then((response) => {
      this.fetchData();
      console.log('success with delete!');
    }).catch((error) => {
      alert('There was a problem with DELETE Admin')
    })
  }

  // PUT

  addEdit = (gender) => {
    console.log('adding edit', gender);
    axios.put(`/api/admin/${this.state.editId}`, { gender: this.state.gender })
      .then((response) => {
        console.log('put response', response);
        this.fetchData();
        this.setState({
          editOn: false
        })
      })
      .catch((error) => {
        console.log('put/add error in addEdit Admin', error);
      });
  }

  toggleEdit = (searchToEdit) => () =>
    this.setState({
      editOn: true,
      gender: searchToEdit.gender,
      editId: searchToEdit.id
    });

    handleSearchChange = (event) => {
      this.setState({
        [event.target.name]: event.target.value
      })
    }

  // end adding new gets, posts, edits, and deletes ----------------

  render() {
    let content = null;

    // TO DO
    // work in progress for search
    // need dummy data to test

    // adding toggled buttons for edit

    let buttonDisplayed = <Button id="searchButtons" variant="outlined" color="secondary" onClick={this.sendData}>Add search</Button>
    if (this.state.editOn) {
      buttonDisplayed = <Button id="searchButtons" variant="outlined" color="secondary" onClick={this.addEdit}>Submit Edit</Button>
    }


    if (this.props.user.userName) {
      content = (
        <div>
          {this.props.data}
          <div>
            <p>
              Admin Page
          </p>
            <button id="logoutButton"
              onClick={this.logout}>Log Out</button>
          </div>

          {/* TO DO */}
          {/* work in progress for search */}
          {/* need dummy data to test */}

          {/* input fields and buttons */}

          <div id="inputFieldSearchAndResource">
            <div>
              <TextField
                id="addSearch"
                onChange={this.handleSearchChange}
                name="gender"
                value={this.state.gender}
                label="Enter Search"
                placeholder="Search"
                margin="normal" ></TextField>
              {buttonDisplayed}
            </div>
          </div>
          <div>
            <ul id="searchButtons">
              {this.state.results.map((person, i) => (
                <li key={i} >
                  {this.props.user.userId === person.gender ?
                    <span>
                      <Button id="deleteButton" onClick={(() => this.dataDelete(person.id))} variant="outlined" size="small"><Delete /></Button>
                      <Button id="editButton" onClick={this.toggleEdit(person)} variant="outlined" size="small"><Edit /></Button>
                    </span>
                    : ''}
                  <Button id="displayInfo">{person.gender}</Button>
                </li>
              ))}
            </ul>
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

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(AdminPage);

