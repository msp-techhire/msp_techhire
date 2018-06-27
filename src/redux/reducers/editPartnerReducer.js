import { combineReducers } from 'redux';
import { USER_ACTIONS } from '../actions/userActions';

const selectedPartner = (state = {}, action) => {
  switch (action.type) {
    case USER_ACTIONS.SET_SELECTED_PARTNER_DATA:
      return action.payload[0];
    default:
      return state;
  }
};


export default combineReducers({
  selectedPartner,
});