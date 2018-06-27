import { all } from 'redux-saga/effects';
import userSaga from './userSaga';
import loginSaga from './loginSaga';
import editPartnerSaga from './editPartnerSaga';


export default function* rootSaga() {
  yield all([
    userSaga(),
    loginSaga(),
    editPartnerSaga(),
    // watchIncrementAsync()
  ]);
}
