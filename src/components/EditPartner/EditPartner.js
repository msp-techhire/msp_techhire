import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import Nav from '../../components/Nav/Nav';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import PartnerDropdown from './PartnerDropdown/PartnerDropdown';
import { triggerLogout } from '../../redux/actions/loginActions';
import NewPartnerForm from './NewPartnerForm/NewPartnerForm';
import SelectedPartnerInfo from './SelectedPartnerInfo/SelectedPartnerInfo';


const mapStateToProps = state => ({
  user: state.user,
  selectedPartner: state.editPartnerReducer.selectedPartner,
});

class EditPartner extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedPartnerID: this.props.selectedPartner.id,
      partnerList: [],
    }
  }

  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    this.getPartners();
    if(this.state.selectedPartnerID === undefined) {
      this.getPartnerData(1);
    }
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
    this.getPartnerData(event.target.value);
    this.setState({
      selectedPartnerID: event.target.value,
    });
  }

  getPartners = () => {
    axios({
      method: 'GET',
      url: `/api/editPartner/partners`
    })
    .then((response) => {
      this.setState({
        partnerList: response.data
      });
    })
    .catch(err => console.log(err))
  }

  getPartnerData = (id) => {
    let action = {
      type: USER_ACTIONS.GET_SELECTED_PARTNER_DATA,
      payload: id,
    };
    this.props.dispatch(action);
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
            getPartnerData={this.getPartnerData}
          />

          <p>
            Selected Partner is {this.props.selectedPartner.org_name}
          </p>
          <SelectedPartnerInfo />
          <NewPartnerForm />
          <button id="logoutButton" onClick={this.logout}>Log Out</button>
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