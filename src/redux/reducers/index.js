import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import editPartnerReducer from './editPartnerReducer';
import search from './searchReducer';

const store = combineReducers({
  user,
  login,
  editPartnerReducer,
  search,
});

export default store;