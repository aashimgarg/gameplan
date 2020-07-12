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
    default:
      return state ;
  }
  
};

export default authReducer;

