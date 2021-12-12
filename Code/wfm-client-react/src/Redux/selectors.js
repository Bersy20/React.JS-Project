import * as R from 'ramda';

const empForManager = state => R.pathOr('', [ 'loginData','empForManager'], state);
const empForWfmMember = state => R.pathOr('', [ 'loginData','empForWfmMember'], state);
const username = state => R.pathOr('',['loginData','username'], state);
const empFromSoftLock = state => R.pathOr('',['loginData','empFromSoftLock'],state);

const selectors = {
    empForManager,
    empForWfmMember,
    username,
    empFromSoftLock
  };
  
  export default selectors;
  