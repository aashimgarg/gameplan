const initState = {
  authError:null
}

const authReducer = (state = initState, action) => {
  switch (action.type){
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        authError: null
      } 
    case 'LOGIN_ERROR':
      return {
        ...state,
        authError: 'Login Failed'
      }
    case 'LOGOUT_SUCCESS':
      console.log('----LOGOUT SUCCESS------')
      return {
        ...state,
        authError: null
      } 
    case 'LOGOUT_ERROR':
      return {
        ...state,
        authError: 'Logout Failed'
      }
    case 'SIGNUP_SUCCESS':
      console.log('----LOGOUT SUCCESS------')
      return {
        ...state,
        authError: null
      }
    case 'SIGNUP_ERROR':
      return {
        ...state,
        authError: action.err.message
        // the error is according to the action i.e if email is wrong then please enter correct email similar with password
      }         
    default:
      return state ;
  }
  
};

export default authReducer;

