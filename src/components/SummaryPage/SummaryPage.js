import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import Nav from '../../components/Nav/Nav';
import NumberTrained from './NumberTrained/NumberTrained';
import JsonArrayToCsv from '../JsonArrayToCsv/JsonArrayToCsv';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';


const mapStateToProps = state => ({
  user: state.user,
});

class SummaryPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trainingData: {},
      data: [],
    }
  }

  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    this.fetchAll();
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && (this.props.user.userName === null || this.props.user.userRole !== 'admin')) {
      this.props.dispatch(triggerLogout());
      this.props.history.push('login');
    }
  }

  logout = () => {
    this.props.dispatch(triggerLogout());
    this.props.history.push('login');
  }

  calculateTrainingData = () => {
    let totalFemale = 0;
    let totalMale = 0;
    let otherGender = 0;
    let unreportedGender = 0;
    let highSchool = 0;
    let someCollege = 0;
    let associates = 0;
    let bachelors = 0;
    let graduatePlus = 0;
    let POCTrue = 0;
    let POCFalse = 0;
    let POCUnreported = 0;
    let numberEmployedMale = 0;
    let numberEmployedFemale = 0;
    let numberEmployedOther = 0;
    let numberEmployedUnreported = 0;

    this.state.data.forEach(student => {
      switch (student.gender) {
        case 'Female':
          totalFemale = totalFemale + 1;
          break;
        case 'Male':
          totalMale = totalMale + 1;
          break;
        case 'Other':
          otherGender = otherGender + 1;
          break;
        default:
          unreportedGender = unreportedGender + 1;
          break
      }

      switch (student.education_level) {
        case 'HS/GED':
          highSchool = highSchool + 1;
          break;
        case 'Some College':
          someCollege = someCollege + 1;
          break;
        case 'Associates':
          associates = associates + 1;
          break;
        case 'Bachelors':
          bachelors = bachelors + 1;
          break;
        case 'Graduate and Beyond':
          graduatePlus = graduatePlus + 1;
          break;
      }

      switch (student.person_of_color) {
        case 'Yes':
          POCTrue = POCTrue + 1;
          break;
        case 'No':
          POCFalse = POCFalse + 1;
          break;
        case 'Unreported':
          POCUnreported = POCUnreported + 1;
          break
      }

      if(student.title !== '' && student.title !== null) {
        switch (student.gender) {
          case 'Female':
            numberEmployedFemale = numberEmployedFemale + 1;
            break;
          case 'Male':
            numberEmployedMale = numberEmployedMale + 1;
            break;
          case 'Other':
            numberEmployedOther = numberEmployedOther + 1;
            break;
          default:
            numberEmployedUnreported = numberEmployedUnreported + 1;
            break
        }
      }

    });

    this.setState({
      trainingData: {
        totalTrained: this.state.data.length,
        totalMale,
        totalFemale,
        otherGender,
        unreportedGender,
        highSchool,
        someCollege,
        associates,
        bachelors,
        graduatePlus,
        POCTrue,
        POCFalse,
        POCUnreported,
        numberEmployedMale,
        numberEmployedFemale,
        numberEmployedOther,
        numberEmployedUnreported
      }
    });
  }

  fetchAll = () => {
    console.log(this.props.user.userRole);
    axios.get('/api/summary', {
      params: {
        role: this.props.user.userRole,
      }
    })
    .then(response => {
      const data = response.data;
      this.setState({
        data,
      });
      this.calculateTrainingData();
    })
    .catch(error => console.log(`ERROR trying to GET /api/summary: ${error}`));
  }

  render() {
    let content = null;

    if (this.props.user.userName) {
      content = (
        <div>
          <h1>Summary Page</h1>
          <NumberTrained 
            trainingData={this.state.trainingData}
          />
          <button id="logoutButton" onClick={this.logout}>Log Out</button>
          <div>
            <JsonArrayToCsv convert={this.state.data} />
            {JSON.stringify(this.state.data[0])}
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
export default connect(mapStateToProps)(SummaryPage);

