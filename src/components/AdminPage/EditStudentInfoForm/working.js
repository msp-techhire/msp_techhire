// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import axios from 'axios';

// import Nav from '../../../components/Nav/Nav';

// import { USER_ACTIONS } from '../../../redux/actions/userActions';
// import PartnerDropDown from '../../EditPartner/PartnerDropdown/PartnerDropdown';
// import { triggerLogout } from '../../../redux/actions/loginActions';
// import NewPartnerForm from '../../EditPartner/NewPartnerForm/NewPartnerForm';
// import SelectedPartnerInfo from '../../EditPartner/SelectedPartnerInfo/SelectedPartnerInfo';


// const mapStateToProps = state => ({
//   user: state.user,
//   selectedPartner: state.editPartnerReducer.selectedPartner,
// });

// class EditStudent extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       newPartnerModal: {
//         open: false,
//       },
//       editPartnerModal: {
//         open: false,
//       },
//       selectedPartnerId: this.props.selectedPartner.id,
//       partnerList: [],
//       newOrg: {
//         orgName: '',
//         orgAbbreviation: '',
//         orgAddress: '',
//         orgWebsite: '',
//         orgPhone: '',
//         directorFirst: '',
//         directorLast: '',
//         businessType: '',
//       },
//       selectedPartner: {
//         orgName: '',
//         orgAbbreviation: '',
//         orgAddress: '',
//         orgWebsite: '',
//         orgPhone: '',
//         directorFirst: '',
//         directorLast: '',
//         businessType: '',
//       }
//     }
//   }

//   componentDidMount() {
//     this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
//     this.getPartners();
//     if (this.state.selectedPartnerID === undefined) {
//       this.getPartnerData(1);
//     }
//   }

//   componentDidUpdate() {
//     if (!this.props.user.isLoading && (this.props.user.userName === null || this.props.user.userRole !== 'admin')) {
//       this.props.history.push('login');
//     }
//   }

//   logout = () => {
//     this.props.dispatch(triggerLogout());
//     this.props.history.push('login');
//   }

//   /* ------------------------------ */
//   /* OPEN AND CLOSE NEW PARTNER MODALS */
//   /* ------------------------------ */
//   openNewPartnerModal = () => {
//     this.setState({ newPartnerModal: { open: true } });
//   }

//   closeNewPartnerModal = () => {
//     this.setState({ newPartnerModal: { open: false } });
//   }

//   /* ------------------------------ */
//   /* OPEN AND CLOSE EDIT PARTNER MODALS */
//   /* ------------------------------ */

//   openEditPartnerModal = () => {
//     this.setState({ editPartnerModal: {open: true }});
//   }

//   closeEditPartnerModal = () => {
//     this.setState({ editPartnerModal: {open: false }});
//   }

//   /* ------------------------------ */
//   /* GET SELECTED PARTNER */
//   /* ------------------------------ */
//   selectedPartnerFromDropdown = (event) => {
//     this.getPartnerData(event.target.value);
//     this.setState({
//       selectedPartnerID: event.target.value,
//     });
//   }

//   /* ------------------------------ */
//   /* FUNCTIONS FOR NEW PARTNERS */
//   /* ------------------------------ */
//   handleFormChange = (event) => {
//     this.setState({
//       newOrg: {
//         ...this.state.newOrg,
//         [event.target.name]: event.target.value,
//       }
//     });
//   }

//   handleFormSubmit = (event) => {
//     event.preventDefault();
//     if (this.state.newOrg.orgName === '' || this.state.newOrg.orgAbbreviation === '' || this.state.newOrg.orgAddress ===)
//   }
// }