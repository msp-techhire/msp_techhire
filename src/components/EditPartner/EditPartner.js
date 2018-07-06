import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import PartnerDropdown from './PartnerDropdown/PartnerDropdown';
import { triggerLogout } from '../../redux/actions/loginActions';
import NewPartnerForm from './NewPartnerForm/NewPartnerForm';
import SelectedPartnerInfo from './SelectedPartnerInfo/SelectedPartnerInfo';
import SelectedPartnerStats from './SelectedPartnerStats/SelectedPartnerStats';


const mapStateToProps = state => ({
  user: state.user,
  selectedPartner: state.editPartnerReducer.selectedPartner,
});

class EditPartner extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newPartnerModal: {
        open: false,
      },
      editPartnerModal: {
        open: false
      },
      newUserModal: {
        open: false
      },
      newUser: {
        username: '',
        password: '',
      },
      selectedPartnerID: this.props.selectedPartner.id,
      partnerList: [],
      partnerStats: {},
      newOrg: {
        orgName: '',
        orgAbbreviation: '',
        orgAddress: '',
        orgCity: '',
        orgZip: '',
        orgWebsite: '',
        orgPhoneAreaCode: '',
        orgPhoneFirstThree: '',
        orgPhoneLastFour: '',
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

  tempState = {};

  /* PRESENTATION FUNCTIONS: START */
  fill = (state, id, value) => {
    if (state === 'orgName') {
      this.tempState = {};
    }
    let element = document.getElementById(id);
    element.value = value;
    this.tempState = {...this.tempState, [state]: value};
    if (state === 'businessType') {
      this.setState({
        newOrg: {...this.tempState}
      });
    }
  }
  
  formAutofill = () => {
      this.fill('orgName', 'newOrgName', 'TechSpec University');
      this.fill('orgAbbreviation', 'newOrgAbbreviation', 'U');
      this.fill('orgAddress', 'newOrgAddress', '3000 Localhost Drive');
      this.fill('orgCity', 'newOrgCity', 'Minneapolis');
      this.fill('orgZip', 'newOrgZip', '55442');
      this.fill('orgWebsite', 'newOrgWebsite', 'www.techspec-university.com');
      this.fill('orgPhoneAreaCode', 'newOrgPhoneOne', '612');
      this.fill('orgPhoneFirstThree', 'newOrgPhoneTwo', '555');
      this.fill('orgPhoneLastFour', 'newOrgPhoneThree', '2018');
      this.fill('directorFirst', 'newDirectorFirst', 'Victor');
      this.fill('directorLast', 'newDirectorLast', 'Colton');
      this.fill('businessType', 'newBusinessType', 'For-profit');
  }
  /* PRESENTATION FUNCTIONS: END */

  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    this.getPartners();
    if (this.state.selectedPartnerID === undefined) {
      this.getPartnerData(1);
      this.getPartnerStats(1);
      this.setState({
        selectedPartnerID: 1
      });
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
  /* OPEN AND CLOSE NEW PARTNER MODALS */
  /* ------------------------------ */
  openNewPartnerModal = () => {
    this.setState({ newPartnerModal: { open: true } });
  }

  closeNewPartnerModal = () => {
    this.setState({ newPartnerModal: { open: false } });
  }

  /* ------------------------------ */
  /* OPEN AND CLOSE EDIT PARTNER MODALS */
  /* ------------------------------ */

  openEditPartnerModal = () => {
    this.setState({ editPartnerModal: {open: true }});
  }

  closeEditPartnerModal = () => {
    this.setState({ editPartnerModal: {open: false }});
  }

  /* ------------------------------ */
  /* OPEN AND CLOSE NEW USER MODALS */
  /* ------------------------------ */

  openNewUserModal = () => {
    this.setState({ newUserModal: {open: true }});
  }

  closeNewUserModal = () => {
    this.setState({ newUserModal: {open: false }});
  }

  /* ------------------------------ */
  /* GET SELECTED PARTNER*/
  /* ------------------------------ */
  selectPartnerFromDropdown = (event) => {
    this.getPartnerData(event.target.value);
    this.getPartnerStats(event.target.value);
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
      this.state.newOrg.orgZip === '' || this.state.newOrg.orgCity === '' || this.state.newOrg.orgWebsite === '' || this.state.newOrg.orgPhoneAreaCode === '' || 
      this.state.newOrg.orgPhoneFirstThree === '' || this.state.newOrg.orgPhoneLastFour === '' || this.state.newOrg.directorFirst === '' ||
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
            orgCity: '',
            orgZip: '',
            orgWebsite: '',
            orgPhoneAreaCode: '',
            orgPhoneFirstThree: '',
            orgPhoneLastFour: '',
            directorFirst: '',
            directorLast: '',
            businessType: '',
          }
        });
        this.getPartners();
        this.closeNewPartnerModal();
      })
      .catch(err => console.log(err));
  }

  /* ------------------------------ */
  /* FUNCTION FOR NEW USER */
  /* ------------------------------ */

  handleNewUserChange = (event) => {
    this.setState({
      newUser: {
        ...this.state.newUser,
        [event.target.name]: event.target.value
      }
    });
  }

  addNewUser = (event) => {
    event.preventDefault();
    const objectToSend = {
      id: this.state.selectedPartnerID,
      username: this.state.newUser.username,
      password: this.state.newUser.password,
    };

    axios({
      method: 'POST',
      url: '/api/editPartner/newUser',
      data: objectToSend,
    })
    .then(response => console.log(response))
    .catch(err => console.log(err));
    this.closeNewUserModal();
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
      data: this.state.selectedPartner,
    })
      .then((response) => {
        console.log(response);
      })
      .catch(err => console.log(err));
      this.closeEditPartnerModal();
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

  getPartnerStats = (id) => {
    axios({
      method: 'GET',
      url:`/api/editpartner/partnerstats/${id}`
    })
    .then(response => {
      let objectForState = {
        pre: Number(response.data[0].pre).toFixed(2),
        post: Number(response.data[0].post).toFixed(2),
        count: Number(response.data[0].count),
      }
      this.setState({
        partnerStats: objectForState,
      });
    })
    .catch(err => console.log(err));
  }

  render() {
    let content = null;

    if (this.props.user.userName) {
      content = (
        <div id="editPartnerPage" className="appWrap">

          <h1 className="textSelectPartner">Select A Partner</h1>
          <PartnerDropdown
            partners={this.state.partnerList}
            selectPartnerFromDropdown={this.selectPartnerFromDropdown}
          />
          <SelectedPartnerInfo
            selectedPartner={this.state.selectedPartner}
            handleEditChange={this.handleEditChange}
            updatePartnerInfo={this.updatePartnerInfo}
            selectedPartnerID={this.state.selectedPartnerID}
            openEditPartnerModal={this.openEditPartnerModal}
            closeEditPartnerModal={this.closeEditPartnerModal}
            show={this.state.editPartnerModal.open}
            newUserShow={this.state.newUserModal.open}
            openNewUserModal={this.openNewUserModal}
            closeNewUserModal={this.closeNewUserModal}
            handleNewUserChange={this.handleNewUserChange}
            addNewUser={this.addNewUser}
          />
          <button id="addNewPartnerButton" variant="outlined" value="showModal" onClick={this.openNewPartnerModal}>Add New Partner</button>

          <NewPartnerForm
            show={this.state.newPartnerModal.open}
            getPartners={this.getPartners}
            closeNewPartnerModal={this.closeNewPartnerModal}
            handleSubmit={this.handleFormSubmit}
            handleChange={this.handleFormChange}
            newOrg={this.state.newOrg}
            fill={this.fill}
            formAutofill={this.formAutofill}
          />
          <SelectedPartnerStats 
            partnerStats={this.state.partnerStats}
          />
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