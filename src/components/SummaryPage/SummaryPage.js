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
      totalTrained: 0,
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

  calculateTotalTrained = () => {
    this.setState({
      totalTrained: this.state.data.length,
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
      this.calculateTotalTrained();
    })
    .catch(error => console.log(`ERROR trying to GET /api/summary: ${error}`));
  }

  render() {
    let content = null;

    if (this.props.user.userName) {
      content = (
        <div>
          <h1>Summary Page</h1>
          <p>{this.state.totalTrained}</p>
          <NumberTrained 
            data={this.state.data}
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
