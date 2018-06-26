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

class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      editOn: false,
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

  // TO DO 
  // adding new posts and edits ---------------

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

  // end adding new gets and edits ----------------

  render() {
    let content = null;

    // TO DO
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
                    <th id="tablePartnerCell">partner_id</th>
                    <th id="tableFormattedCell">formatted_id</th>
                    <th id="tableGenderCell">gender</th>
                    <th id="tableBirthCell">year_of_birth</th>
                    <th id="tablePocCell">person_of_color</th>
                    <th id="tableEducationCell">education_level</th>
                    <th id="tableCityCell">city_of_residence</th>
                    <th id="tableScholarshipCell">scholarship_recipient</th>
                    <th id="tablePreviousJobCell">previous_job_experience</th>
                    <th id="tablePreTrainingWageCell">pre_training_wage</th>
                    <th id="tableStartDateCell">training_start_date</th>
                    <th id="tableTrainingStatusCell">training_status</th>
                    <th id="tableEndDateCell">training_end_date</th>
                    <th id="tableTrainingTypeCell">training_type</th>
                    <th id="tableClassroomOrOnlineCell">classroom_or_online</th>
                    <th id="tableExitStatusCell">exit_status</th>
                    <th id="tableEditButtonCell">edit</th>
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
                      <td><Button id="editButton" variant="outlined" size="small"><Edit /></Button></td>
                      {/* for edit button */}
                      {/* onClick={this.toggleEdit(comments)} */}
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

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(AdminPage);


