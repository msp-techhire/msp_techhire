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
      trainingData: {
        totalTrained: 0,
      },
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
    let unreported = 0;
    this.state.data.forEach(student => {
      if (student.gender === 'Female') {
          totalFemale = totalFemale + 1;
      } else if(student.gender === 'Male') {
        totalMale = totalMale + 1;
      } else {
        unreported = unreported + 1;
      }
    });
    this.setState({
      trainingData: {
        totalTrained: this.state.data.length,
        totalMale,
        totalFemale,
        unreported,
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
            {JSON.stringify(this.state.data)}
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
