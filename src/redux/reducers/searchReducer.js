import { combineReducers } from 'redux';
import { SEARCH_ACTIONS } from '../actions/searchActions';

const field = (state = '*', action) => {
  switch (action.type) {
    case SEARCH_ACTIONS.SET_SEARCH_FIELD:
      return action.payload;
    default:
      return state;
  }
}

const query = (state = '', action) => {
  switch (action.type) {
    case SEARCH_ACTIONS.SET_SEARCH_QUERY:
      return action.payload;
    default:
      return state;
  }
}

export default combineReducers({
  field,
  query,
});