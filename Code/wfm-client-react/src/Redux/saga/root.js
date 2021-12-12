import {takeEvery,all} from 'redux-saga/effects'
import { loginHandler, getEmpForManagerSaga, getEmpForWfmMemberSaga, getEmpFromSoftLockSaga, updateEmpStatusFromSoftLockSaga,insertEmpReqToSoftLockSaga} from './handlers'

import {
    GET_EMP_FOR_MANAGER,
    GET_EMP_FOR_WFM_MEMBER,
    GET_EMP_FROM_SOFTLOCK,
    UPDATE_EMP_FROM_SOFTLOCK,
    INSERT_EMPREQ_TO_SOFTLOCK
  } from '../types';

function* watchGetEmpForManager() {
    yield takeEvery(GET_EMP_FOR_MANAGER, getEmpForManagerSaga);
  }

  function* watchLogin() {
    yield takeEvery("LOGIN_ACTION", loginHandler);
  }

  function* watchGetEmpForWfmMember() {
    yield takeEvery(GET_EMP_FOR_WFM_MEMBER, getEmpForWfmMemberSaga);
  }

  function* watchGetEmpFromSoftLock() {
    yield takeEvery(GET_EMP_FROM_SOFTLOCK, getEmpFromSoftLockSaga);
  }

  function* watchUpateEmpFromSoftLock() {
    yield takeEvery(UPDATE_EMP_FROM_SOFTLOCK, updateEmpStatusFromSoftLockSaga);
  }

  function* watchInsertEmpReqToSoftLock() {
    yield takeEvery(INSERT_EMPREQ_TO_SOFTLOCK, insertEmpReqToSoftLockSaga);
  }

  export function* rootSaga() {
    yield all([
      watchGetEmpForManager(),
      watchLogin(),
      watchGetEmpForWfmMember(),
      watchGetEmpFromSoftLock(),
      watchUpateEmpFromSoftLock(),
      watchInsertEmpReqToSoftLock()
    ]);
  }

// export function* rootSaga(){
//     yield takeEvery("LOGIN_ACTION",loginHandler)
//     yield takeEvery("GET_EMP_FOR_MANAGER",getEmpForManagerSaga)
// }