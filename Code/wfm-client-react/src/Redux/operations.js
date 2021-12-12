import { 
    getEmpForManager,
    getEmpForWfmMember,
    getEmpFromSoftLock,
    updateEmpFromSoftLock,
    insertEmpReqToSoftLock
  } from './action';
  
  const dispatchgetEmpForManager = dispatch => () => {
    dispatch(getEmpForManager());
  };

  const dispatchgetEmpForWfmMember = dispatch => () => {
    dispatch(getEmpForWfmMember());
  };

  const dispatchgetEmpFromSoftLock = dispatch => (empId) => {
    dispatch(getEmpFromSoftLock(empId));
  };
  
  const dispatchUpdateEmpFromSoftLock = dispatch => (empId,status) => {
    dispatch(updateEmpFromSoftLock(empId,status))
  }

  const dispatchInsertEmpStatusToSoftLock=dispatch=>(id,manager,reqMessage)=>{
    dispatch(insertEmpReqToSoftLock(id,manager,reqMessage))
  }

  const operations = {
    dispatchgetEmpForManager,
    dispatchgetEmpForWfmMember,
    dispatchgetEmpFromSoftLock,
    dispatchUpdateEmpFromSoftLock,
    dispatchInsertEmpStatusToSoftLock
  };
  
  export default operations;
  