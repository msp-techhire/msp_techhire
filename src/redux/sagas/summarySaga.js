import { takeEvery } from 'redux-saga/effects';
import { USER_ACTIONS } from '../actions/userActions';


// worker Saga: will be fired on "FETCH_USER" actions
function* getWageData() {
  try {
    console.log('getWageData ran');
    // const wageData = yield axios.get(`/api/editPartner/partnerInfo/${action.payload}`)
    // yield put({
    //   type: USER_ACTIONS.SET_SELECTED_PARTNER_DATA,
    //   payload: partnerData.data,
    // })
  } catch (error) {
    console.log(error);
  }
}

function* summarySaga() {
  yield takeEvery(USER_ACTIONS.GET_WAGE_DATA, getWageData);
}

export default summarySaga;