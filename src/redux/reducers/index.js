import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import editPartnerReducer from './editPartnerReducer';

const store = combineReducers({
  user,
  login,
  editPartnerReducer
});

export default store;
