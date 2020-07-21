const initState = {
  authError: null,
  isLoggingUp: false,
  isSigningUp: false
}

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return {
        ...state,
        authError: null,
        isLoggingUp: true
      }
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        authError: null,
        isLoggingUp: false
      }
    case 'LOGIN_ERROR':
      return {
        ...state,
        authError: 'Login Failed',
        isLoggingUp: false
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
    case 'SIGNUP_REQUEST':
      console.log('----LOGOUT SUCCESS------')
      return {
        ...state,
        authError: null,
        isSigningUp:true
      }
    case 'SIGNUP_SUCCESS':
      console.log('----LOGOUT SUCCESS------')
      return {
        ...state,
        authError: null,
        isSigningUp:false
      }
    case 'SIGNUP_ERROR':
      return {
        ...state,
        authError: action.err.message,
        // the error is according to the action i.e if email is wrong then please enter correct email similar with password
       isSigningUp:false
      }
    default:
      return state;
  }

};

export default authReducer;

