import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../../components/Nav/Nav';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';
import axios from 'axios';

import JsonArrayToCsv from '../JsonArrayToCsv/JsonArrayToCsv';


const mapStateToProps = state => ({
  user: state.user,
});
 
class SummaryPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      columns: [],
      rows: [],
      csv: [],
    }
  }
  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER});
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
  
  fetchAll = () => {
    console.log(this.props.user.userRole);
    axios.get('/api/summary', {
      params: {
        role: this.props.user.userRole,
      }
    }).then(response => {
      const data = response.data;
      this.setState({
        data: data,
        columns: Object.keys(data[0]),
      });
      // for (let row of data) {
      //   for (let cell of columns) {

      //   }
      // }
    }).catch(error => {
      console.log(`ERROR trying to GET /api/summary: ${error}`);
    });
  }

  render() {
    let content = null;
    console.log(content);

    if (this.props.user.userName) {
      content = (
        <div>
          <p>
            Summary Page
          </p>
          <button id="logoutButton"
            onClick={this.logout}>Log Out</button>
            <button id="test" onClick={this.fetchAll}>Test</button>
            <div>
              <JsonArrayToCsv convert="test" />
              {JSON.stringify(this.state.data)}
            </div>
        </div>
      );
    }

    return (
      <div>
        <Nav />
        { content }
      </div>
    ); 
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(SummaryPage);
