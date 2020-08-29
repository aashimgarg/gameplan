const initState = {
  isValidate: false,
  isLoggingUp: false,
  loginError: false,
  isFetchingData: false,
  fetchingDataError: false,
  isSigningUp: false,
  signUpError: false,
  isCreatingUser: false,
  userCreated: false,
  userCreationError: false,
  isLoggingOut: false,
  logoutError: false,
  isVerifying: false,
  verifyingError: false,
  isPasswordResetEmailSend: false,
  forgetPasswordFailure: false,
  isForgetPasswordRequested: false,
  user: {},
  userData: {}
}

const authReducer = (state = initState, action) => {
  switch (action.type) {

    // LOGIN_FEATURE

    case 'LOGIN_REQUEST':
      return {
        ...state,
        isLoggingUp: true,
        loginError: false,
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isLoggingUp: false,
        loginError: false,
        isValidate: true,
        user: action.user,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        isLoggingUp: false,
        isValidate: false,
        loginError: true,
      };

    // FETCH_DATA_REQUEST_HANDLER

    case 'FETCH_DATA_REQUEST':

      return {
        ...state,
        isFetchingData: true,
        fetchingDataError: false,
      }
    case 'FETCH_DATA_SUCCESS':

      return {
        ...state,
        isFetchingData: false,
        fetchingDataError: false,
        userData: action.data
      }
    case 'FETCH_DATA_FAILURE':
      return {
        ...state,
        isFetchingData: false,
        fetchingDataError: true,
      };

    // LOGOUT_FEATURE

    case 'LOGOUT_REQUEST':
      return {
        ...state,
        isLoggingOut: true,
        logoutError: false,
      }
    case 'LOGOUT_SUCCESS':
      return {
        ...state,
        isLoggingOut: false,
        logoutError: false,
        isValidate: false,
        user: {},
        userData: {}
      }
    case 'LOGOUT_FAILURE':
      return {
        ...state,
        isLoggingOut: false,
        logoutError: true,
      }

    // SIGNUP_FEATURE

    case 'SIGNUP_REQUEST':
      return {
        ...state,
        isSigningUp: true,
        signUpError: false
      }
    case 'SIGNUP_SUCCESS':
      return {
        ...state,
        isSigningUp: false,
        isValidate: true,
        signUpError: false,
        user: action.user,
      }
    case 'SIGNUP_FAILURE':
      return {
        ...state,
        isSigningUp: false,
        signUpError: true,
      }

    // CREATE USER HANDLER

    case 'CREATE_USER_REQUEST':
      return {
        ...state,
        isCreatingUser: true,
        userCreated: false,
        userCreationError: false,
      }
    case 'CREATE_USER_SUCCESS':
      return {
        ...state,
        isCreatingUser: false,
        userCreated: true,
        userCreationError: false,
        userData: action.user
      }
    case 'CREATE_USER_FAILURE':
      return {
        ...state,
        isCreatingUser: false,
        userCreated: false,
        userCreationError: true,
      }

    // VERIFY AUTH

    case 'VERIFY_REQUEST':
      return {
        ...state,
        isVerifying: true,
        verifyingError: false,
      }
    case 'VERIFY_SUCCESS':
      return {
        ...state,
        isVerifying: false,
      }

    // FORGOT PASSWORD

    case 'FORGET_PASSWORD_REQUEST':
      return {
        ...state,
        isForgetPasswordRequested: true,
        isPasswordResetEmailSend: false,
        forgetPasswordFailure: false,
      };
    case 'FORGET_PASSWORD_SUCCESS':
      return {
        ...state,
        isForgetPasswordRequested: false,
        isPasswordResetEmailSend: true,
        forgetPasswordFailure: false,
      };
    case 'FORGET_PASSWORD_FAILURE':
      return {
        ...state,
        isForgetPasswordRequested: false,
        forgetPasswordFailure: true,
        isPasswordResetEmailSend: false,
      };
    default:
      return state;
  }

};

export default authReducer;
