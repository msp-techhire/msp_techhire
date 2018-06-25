import { put, takeEvery } from 'redux-saga/effects';
import { USER_ACTIONS } from '../actions/userActions';

// worker Saga: will be fired on "FETCH_USER" actions
function* getPartnerData(action) {
  try {
    console.log('HEYOOOOOOO');
    console.log(action.payload);
  } catch (error) {
    console.log(error);
  }
}

function* editPartnerSaga() {
  yield takeEvery(USER_ACTIONS.GET_PARTNER_DATA, getPartnerData);
}

export default editPartnerSaga;