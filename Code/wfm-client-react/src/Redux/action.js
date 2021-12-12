import {
  GET_EMP_FOR_MANAGER,
  GET_EMP_FOR_WFM_MEMBER,
  GET_EMP_FROM_SOFTLOCK,
  UPDATE_EMP_FROM_SOFTLOCK,
  INSERT_EMPREQ_TO_SOFTLOCK
} from './types';

const getEmpForManager = () => ({
  type: GET_EMP_FOR_MANAGER,
});

const getEmpForWfmMember = () => ({
  type: GET_EMP_FOR_WFM_MEMBER
});

const getEmpFromSoftLock = (empId) => ({
  type: GET_EMP_FROM_SOFTLOCK,
  empId
});

const updateEmpFromSoftLock = (empId, status) => ({
  type: UPDATE_EMP_FROM_SOFTLOCK,
  empId, status
});

const insertEmpReqToSoftLock = (id, manager, reqMessage) => ({
  type: INSERT_EMPREQ_TO_SOFTLOCK,
  id, manager, reqMessage
});

export {
  getEmpForManager,
  getEmpForWfmMember,
  getEmpFromSoftLock,
  updateEmpFromSoftLock,
  insertEmpReqToSoftLock
};