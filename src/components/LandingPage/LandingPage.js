import React, { Component } from 'react';
import {
  HashRouter as Router,
  Redirect
} from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = state => ({ state });

class LandingPage extends Component {

  render() {
    let user = this.props.state.user;
    let userRole = user.userRole;
    if (userRole === 'admin') {
      this.content = <Redirect to="/admin" />
    } else if (userRole === 'partner') {
      this.content = <Redirect to="/partner" />
    } else {
      this.content = <Redirect to="/login" />
    }
    return(
      <Router>
        { this.content }
      </Router>
    )
  }
}

export default connect(mapStateToProps)(LandingPage);