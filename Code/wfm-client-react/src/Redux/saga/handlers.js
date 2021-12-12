import axios from 'axios'
import {
  put,
  call
} from 'redux-saga/effects';

export function* loginHandler(action) {
  try {
    let result = yield call(axios.post, "http://localhost:8000/users/signin", action.data)
    console.log(result.data)

    localStorage.setItem("username", result.data.username)
    localStorage.setItem("usertype", result.data.usertype)
    localStorage.setItem("token", result.data.token)

    yield put({
      type: "LOGIN_SUCCESS", data:
      {
        username: result.data.username,
        usertype: result.data.usertype,
        token: result.data.token
      }
    })
  }
  catch (e) {
    yield put({ type: "LOGIN_FAILURE" })
  }

}

export function* getEmpForManagerSaga() {
  try {
    const username = localStorage.getItem("username");
    let result = yield call(axios.get, "http://localhost:8000/users/getEmployeesForManager?name=" + username)
    console.log(result.data,"result")
    yield put({
      type: "SET_EMP_FOR_MANAGER", empForManager: result.data
    })
  }
  catch (e) {
    console.error("Error in getEmpForManagerSaga : ", e)
  }

}

export function* getEmpForWfmMemberSaga() {
  try {
    const username = localStorage.getItem("username");
    let result = yield call(axios.get, "http://localhost:8000/users/getEmployeesForWfmMember?name=" + username)
    yield put({
      type: "SET_EMP_FOR_WFM_MEMBER", empForWfmMember: result.data
    })
  }
  catch (e) {
    console.error("Error in getEmpForWfmMemberSaga : ", e)
  }

}

export function* getEmpFromSoftLockSaga(req) {
  try {
    let result = yield call(axios.get, "http://localhost:8000/users/getEmployeesFromSoftLock?id=" + req.empId)
    yield put({
      type: "SET_EMP_FROM_SOFTLOCK", empFromSoftLock: result.data
    })
  }
  catch (e) {
    console.error("Error in getEmpFromSoftLockSaga : ", e)
  }

}

export function* updateEmpStatusFromSoftLockSaga(req) {
  try {
    let result = yield call(axios.post, "http://localhost:8000/users/updateReqStatus?id=" + req.empId,req.status)
  }
  catch (e) {
    console.error("Error in updateEmpStatusFromSoftLockSaga : ", e)
  }

}

export function* insertEmpReqToSoftLockSaga(req) {
  try {
    let result = yield call(axios.post, "http://localhost:8000/users/insertReqMessage" , req)
  }
  catch (e) {
    console.error("Error in insertEmpReqToSoftLockSaga : ", e)
  }

}