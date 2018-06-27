// import { call, put, takeEvery } from 'redux-saga/effects';
// import axios from 'axios'

// function* partnerSaga() {
//     yield takeEvery('FETCH_PARTNER_DATA', fetchPartnerData);
//     yield takeEvery('ADD_PARTNER_DATA', postPartnerData)
//     yield takeEvery('SET_PARTNER_DATA', )
//   }

// function* postPartnerData(action) {
//     try{
//       const partnerData = yield call(axios.post, '/api/partner', action.payload);
//       console.log(partnerData);
//       yield dispatch({
//         type: 'FETCH_PARTNER_DATA',
//       })
//     } catch (error) {}
//   }

//   function* fetchPartnerData() {
//     try{
//       const partnerResponse = yield call(axios.get, '/api/partner');
//       yield dispatch({
//         type: 'SET_PARTNER_DATA',
//         payload: partnerResponse.data
//       })
//     } catch (error) {}
//   }