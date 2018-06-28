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
      open: false,
      selectedPartnerID: this.props.selectedPartner.id,
      partnerList: [],
      newOrg: {
        orgName: '',
        orgAbbreviation: '',
        orgAddress: '',
        orgWebsite: '',
        orgPhone: '',
        directorFirst: '',
        directorLast: '',
        businessType: ''
      },
      selectedPartner: {
        orgName: '',
        orgAbbreviation: '',
        orgAddress: '',
        orgWebsite: '',
        orgPhone: '',
        directorFirst: '',
        directorLast: '',
        businessType: '',
      }
    }
  }

  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    this.getPartners();
    if (this.state.selectedPartnerID === undefined) {
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

/* ------------------------------ */
/* OPEN AND CLOSE MODALS */
/* ------------------------------ */
  openModal = () => {
    this.setState({ open: true });
  }

  closeModal = () => {
    this.setState({ open: false });
  }

/* ------------------------------ */
/* GET SELECTED PARTNER*/
/* ------------------------------ */
  handleChange = (event) => {
    this.getPartnerData(event.target.value);
    this.setState({
      selectedPartnerID: event.target.value,
    });
  }

  /* ------------------------------ */
/* FUNCTIONS FOR NEW PARTNERS */
/* ------------------------------ */
  handleFormChange = (event) => {
    this.setState({
      newOrg: {
        ...this.state.newOrg,
        [event.target.name]: event.target.value,
      }
    });
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    if (this.state.newOrg.orgName === '' || this.state.newOrg.orgAbbreviation === '' || this.state.newOrg.orgAddress === '' ||
      this.state.newOrg.orgWebsite === '' || this.state.newOrg.orgPhone === '' || this.state.newOrg.directorFirst === '' ||
      this.state.newOrg.directorLast === '' || this.state.newOrg.businessType === '') {
      return alert('Please complete all fields!');
    }
    axios({
      method: 'POST',
      url: '/api/editPartner/newPartner',
      data: this.state.newOrg,
    })
      .then((response) => {
        console.log(response);
        this.setState({
          newOrg: {
            orgName: '',
            orgAbbreviation: '',
            orgAddress: '',
            orgWebsite: '',
            orgPhone: '',
            directorFirst: '',
            directorLast: '',
            businessType: '',
          }
        });
        this.getPartners();
        this.closeModal();
      })
      .catch(err => console.log(err));
  }

  /* ------------------------------ */
/* FUNCTIONS TO EDIT PARTNERS */
/* ------------------------------ */
  handleEditChange = (event) => {
    this.setState({
      selectedPartner: {
        ...this.state.selectedPartner,
        [event.target.name]: event.target.value,
      }
    });
  }

  updatePartnerInfo = (id) => {
    axios({
      method: 'PUT',
      url: `/api/editPartner/updatePartner/${id}`,
      data: this.state.selectedPartner
    })
    .then((response) => {
      console.log(response);
    })
    .catch(err => console.log(err));
  }

 /* ------------------------------ */
/* FUNCTIONS TO RETRIEVE DATA */
/* ------------------------------ */
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
    // let action = {
    //   type: USER_ACTIONS.GET_SELECTED_PARTNER_DATA,
    //   payload: id,
    // };
    // this.props.dispatch(action);
    axios({
      method: 'GET',
      url: `/api/editPartner/partnerInfo/${id}`,
    })
    .then((result) => {
      let selectedPartner = result.data[0];
      this.setState({
        selectedPartner: {
          orgName: selectedPartner.org_name,
          orgAbbreviation: selectedPartner.org_abbr,
          orgAddress: selectedPartner.address,
          orgWebsite: selectedPartner.website,
          orgPhone: selectedPartner.phone_number,
          directorFirst: selectedPartner.director_first_name,
          directorLast: selectedPartner.director_last_name,
          businessType: selectedPartner.business_type,
        }
      });
    })
    .catch(err => console.log(err));
  }



  render() {
    let content = null;

    if (this.props.user.userName) {
      content = (
        <div id="editPartnerPage">

          <h1>Select A Partner</h1>
          <PartnerDropdown
            partners={this.state.partnerList}
            handleChange={this.handleChange}
            getPartnerData={this.getPartnerData}
          />
          <SelectedPartnerInfo 
            selectedPartner={this.state.selectedPartner}
            handleEditChange={this.handleEditChange}
            updatePartnerInfo={this.updatePartnerInfo}
            selectedPartnerID={this.state.selectedPartnerID}
          />
          <button value="showModal" onClick={this.openModal}>Add New Partner</button>
          <NewPartnerForm
            show={this.state.open}
            getPartners={this.getPartners}
            closeModal={this.closeModal}
            handleSubmit={this.handleFormSubmit}
            handleChange={this.handleFormChange}
            newOrg={this.state.newOrg}
          />
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