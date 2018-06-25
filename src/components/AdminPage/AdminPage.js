import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../../components/Nav/Nav';
import axios from 'axios';


import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
// import Delete from '@material-ui/icons/Delete'
// import Edit from '@material-ui/icons/Edit'


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
      // gender: '',
      editOn: false,
      searchQuery: '',
    }
  }

  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });

    // TO DO
    // work in progress for search
    // need dummy data to test

    // adding data fetch

    this.fetchData();
    // this.setState({
    //   gender: this.props.match.params.id
    // })
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

  fetchData = () => {
    axios.get(`/api/admin`).then((response) => {
      console.log(response.data);
      this.setState({
        results: response.data,
        searchQuery: '',
      })
    }).catch((error) => {
      alert('error with GET in Admin file', error);
    })
  }

  // sendData = () => {
  //   console.log('button clicked');
  //   axios.post('/api/admin', this.state).then((response) => {
  //     console.log('success');
  //     this.fetchData();
  //   }).catch((error) => {
  //     alert('POST error in Admin file');
  //     console.log(error);
  //   });
  // }

  // dataDelete = id => {
  //   console.log(this.state.results);
  //   const deletion = `/api/admin/${id}`
  //   axios.delete(deletion).then((response) => {
  //     this.fetchData();
  //     console.log('success with delete!');
  //   }).catch((error) => {
  //     alert('There was a problem with DELETE Admin')
  //   })
  // }

  // PUT

  // addEdit = (taco) => {
  //   console.log('adding edit', taco);
  //   axios.put(`/api/admin/${this.state.editId}`, { searchQuery: this.state })
  //     .then((response) => {
  //       console.log('put response', response);
  //       this.fetchData();
  //       this.setState({
  //         editOn: false
  //       })
  //     })
  //     .catch((error) => {
  //       console.log('put/add error in addEdit Admin', error);
  //     });
  // }

  // toggleEdit = (searchToEdit) => () =>
  //   this.setState({
  //     editOn: true,
  //     searchQuery: searchToEdit.id,
  //     editId: searchToEdit.id
  //   });

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

    let buttonDisplayed = <Button id="searchButtons" variant="outlined" color="secondary" onClick={this.fetchData}>Search</Button>
    // if (this.state.editOn) {
    //   buttonDisplayed = <Button id="searchButtons" variant="outlined" color="secondary" onClick={this.addEdit}>Submit Edit</Button>
    // }


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
            <Paper>
              <Table id="searchTableResults">
                <TableHead>
                  <TableRow>
                    <TableCell>id</TableCell>
                    <TableCell>training_id</TableCell>
                    <TableCell>gender</TableCell>
                    <TableCell>year_of_birth</TableCell>
                    <TableCell>person_of_color</TableCell>
                    <TableCell>education_level</TableCell>
                    <TableCell>city_of_residence</TableCell>
                    <TableCell>scholarship_recipient</TableCell>
                    <TableCell>previous_job_experience</TableCell>
                    <TableCell>pre_training_wage</TableCell>
                    <TableCell>training_start_date</TableCell>
                    <TableCell>training_end_date</TableCell>
                    <TableCell>exit_status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.results.map((person, i) => (
                  <TableRow key={i}>
                    <TableCell>{person.id}</TableCell>
                    <TableCell>{person.training_id}</TableCell>
                    <TableCell>{person.gender}</TableCell>
                    <TableCell>{person.year_of_birth}</TableCell>
                    <TableCell>{person.person_of_color}</TableCell>
                    <TableCell>{person.education_level}</TableCell>
                    <TableCell>{person.city_of_residence}</TableCell>
                    <TableCell>{person.scholarship_recipient}</TableCell>
                    <TableCell>{person.previous_job_experience}</TableCell>
                    <TableCell>{person.pre_training_wage}</TableCell>
                    <TableCell>{person.training_start_date}</TableCell>
                    <TableCell>{person.training_end_date}</TableCell>
                    <TableCell>{person.exit_status}</TableCell>
                  </TableRow>

                  ))};
                </TableBody>
              </Table>
            </Paper>
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


