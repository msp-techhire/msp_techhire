import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { USER_ACTIONS } from '../actions/userActions';


// worker Saga: will be fired on "FETCH_USER" actions
function* getPartnerData(action) {
  try {
    const partnerData = yield axios.get(`/api/editPartner/partnerInfo/${action.payload}`)
    yield put({
      type: USER_ACTIONS.SET_SELECTED_PARTNER_DATA,
      payload: partnerData.data,
    })
  } catch (error) {
    console.log(error);
  }
}

function* editPartnerSaga() {
  yield takeEvery(USER_ACTIONS.GET_SELECTED_PARTNER_DATA, getPartnerData);
}

export default editPartnerSaga;