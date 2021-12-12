export const loginReducer=(state={username:"NA",token:"NA",usertype:"NA",message:""},action)=>{
    switch(action.type){
        case "LOGIN_SUCCESS":
            return {...action.data,message:""};
        case "LOGIN_FAILURE":
            return {...state,message:"Login Credentials incorrect"};
        case "SET_EMP_FOR_MANAGER":
            let empForManager=action.empForManager;
            return {...state,empForManager};
        case "SET_EMP_FOR_WFM_MEMBER":
                let empForWfmMember=action.empForWfmMember;
                return {...state,empForWfmMember};
        case "SET_EMP_FROM_SOFTLOCK":
            let empFromSoftLock=action.empFromSoftLock;
            return {...state,empFromSoftLock};
        default:
            return state
    }
}