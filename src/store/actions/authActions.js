import { db, myFirebase, storage } from '../../config/fbConfig'

const requestLogin = () => {
  return {
    type: 'LOGIN_REQUEST'
  }
}

const receiveLogin = (user) => {
  return {
    type: 'LOGIN_SUCCESS',
    user
  }
}

const loginError = () => {
  return {
    type: 'LOGIN_FAILURE'
  }
}

const requestData = () => {
  return {
    type: 'FETCH_DATA_REQUEST',
  };
};

const receiveData = (data) => {
  return {
    type: 'FETCH_DATA_SUCCESS',
    data,
  };
};

const fetchDataError = () => {
  return {
    type: 'FETCH_DATA_FAILURE'
  }
}

// FETCH_USER ACTION

export const fetchUser = (uid) => {
  return (dispatch) => {
    dispatch(requestData());
    try {
      const userRef = db
        .doc(`users/${uid}`);
      userRef.onSnapshot(async (doc) => {
        if (doc.data()) {
          await dispatch(receiveData(doc.data()));
        }
      });
    } catch (error) {
      dispatch(fetchDataError());
    }
  }
};

// SIGN_IN ACTION

export const signIn = (credentials) => {
  return async (dispatch) => {
    //async call to database
    await dispatch(requestLogin());
    await myFirebase
      .auth()
      .signInWithEmailAndPassword(
        credentials.email,
        credentials.password
      ).then((response) => {
        const { user } = response;
        dispatch(fetchUser(user.uid));
        dispatch(receiveLogin(user));
      })
      .catch(error => {
        dispatch(loginError())
      })
  }
}

// LOG_OUT ACTION

const requestSignOut = () => {
  return {
    type: 'LOGOUT_REQUEST'
  };
};

const receiveSignOut = () => {
  return {
    type: 'LOGOUT_SUCCESS'
  };
};

const signOutError = () => {
  return {
    type: 'LOGOUT_FAILURE'
  };
};

export const signOut = () => {
  return (dispatch) => {
    //async call to database
    dispatch(requestSignOut());
    myFirebase
      .auth()
      .signOut()
      .then(() => {
        dispatch(receiveSignOut())
      }).catch(() => {
        dispatch(signOutError())
      })
  }
}

const requestSignup = () => {
  return {
    type: 'SIGNUP_REQUEST'
  };
};

const receiveSignup = user => {
  return {
    type: 'SIGNUP_SUCCESS',
    user
  };
}

const signUpError = () => {
  return {
    type: 'SIGNUP_FAILURE',
  };
}

const requestCreateUser = () => {
  return {
    type: 'CREATE_USER_REQUEST'
  }
}

const recieveCreateUser = (user) => {
  return {
    type: 'CREATE_USER_SUCCESS',
    user
  }
}

const createUserError = () => {
  return {
    type: 'CREATE_USER_FAILURE'
  }
}

export const createUser = (uid, data ,url) => {
  return async (dispatch) => {
    dispatch(requestCreateUser())
    try {
      const createdAt = new Date();
      const initials = data.firstName[0] + data.lastName[0];

      await db
        .collection('users')
        .doc(uid)
        // .add method creates a new user id so used set method
        .set({ createdAt, initials, ...data , url})
        .then(() => {
          dispatch(recieveCreateUser({ createdAt, initials, ...data , url}))
        })
    } catch (error) {
      dispatch(createUserError());
    }
  }
}

export const storeImage = (profileImage,uid) => async (getState) => {
  try {
   await storage
   .child(`${uid}/profileImage`)
   .put(profileImage.image)
 }
  catch (error) {
    console.log(error);
  }
}

// SIGNUP_ACTION

export const signUp = (email, password, data, profileImage ) => async (dispatch) => {
  dispatch(requestSignup());
  try {
    const { user } = await myFirebase
      .auth()
      .createUserWithEmailAndPassword(
        email,
        password
      );
    await dispatch(receiveSignup(user));
    if (data) {
      await dispatch(createUser(user.uid, data , profileImage.profileUrl));
      await dispatch(storeImage(profileImage, user.uid));
    }
  } catch (error) {
    alert(error.message)
    dispatch(signUpError());
  }
};

// VERIFY AUTH 


const verifyRequest = () => {
  return {
    type: 'VERIFY_REQUEST',
  };
};

const verifySuccess = () => {
  return {
    type: 'VERIFY_SUCCESS',
  };
};

export const verifyAuth = () => async (dispatch) => {
  dispatch(verifyRequest());

  myFirebase
    .auth()
    .onAuthStateChanged(async (user) => {
      if (user !== null) {
        await dispatch(fetchUser(user.uid));
        await dispatch(receiveLogin(user));
      }
      dispatch(verifySuccess());
    });
};

// FORGOT PASSWORD

const forgetPasswordRequest = () => {
  return {
    type: 'FORGET_PASSWORD_REQUEST',
  };
};

const forgetPasswordSuccess = () => {
  return {
    type: 'FORGET_PASSWORD_SUCCESS',
  };
};

const forgetPasswordFailure = () => {
  return {
    type: 'FORGET_PASSWORD_FAILURE',
  };
};

export const forgetPassword = (email) => async (dispatch) => {
  dispatch(forgetPasswordRequest());
  await myFirebase
    .auth()
    .sendPasswordResetEmail(email)
    .then(() => {
      dispatch(forgetPasswordSuccess());
    })
    .catch((_error) => {
      dispatch(forgetPasswordFailure());
    });
};