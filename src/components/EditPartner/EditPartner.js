import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import Nav from '../../components/Nav/Nav';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import PartnerDropdown from './PartnerDropdown/PartnerDropdown';
import { triggerLogout } from '../../redux/actions/loginActions';


const mapStateToProps = state => ({
  user: state.user,
});

class EditPartner extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedPartner: '',
      partnerList: ['this', 'is', 'a', 'test'],
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

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  getPartners = () => {
    axios({
      method: 'GET',
      url: ''
    })
    .then((response) => {
      console.log(response);
    })
    .catch(err => console.log(err))
  }

  render() {
    let content = null;

    if (this.props.user.userName) {
      content = (
        <div>

          <h1>Hello Edit Partner</h1>
          <PartnerDropdown 
            partners={this.state.partnerList}
            handleChange={this.handleChange}
          />

          <p>
            Edit Partner Page
          </p>
          <button id="logoutButton"
            onClick={this.logout}>Log Out</button>
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
export default connect(mapStateToProps)(EditPartner);