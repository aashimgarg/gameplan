export const signIn = (credentials) => {
    return (dispatch,getState, { getFirebase}) => {
        //async call to database
      const firebase = getFirebase();

      firebase
         .auth()
         .signInWithEmailAndPassword(
           credentials.email,
           credentials.password
        ).then(() => { 
          dispatch({ type:'LOGIN_SUCCESS' })
        }).catch( error =>{
          dispatch ({ type: 'LOGIN_ERROR' } , error)
        })
    }
}

export const signOut = () => {
  return (dispatch,getState, { getFirebase}) => {
      //async call to database
    const firebase = getFirebase();

    firebase
       .auth()
       .signOut()
       .then(() => { 
        dispatch({ type:'LOGOUT_SUCCESS' })
      }).catch( error =>{
        dispatch ({ type: 'LOGOUT_ERROR' } , error)
      })
  }
}

export const signUp = (userData) => {
  return (dispatch , getState, { getFirebase , getFirestore}) => {
    const firebase = getFirebase() ;
    const firestore = getFirestore() ;
   
    firebase
      .auth()
      .createUserWithEmailAndPassword(
        userData.email,
        userData.password
     ).then((res) => {
       // res.user will contain the information about the user which just signed up
        return (
         firestore
           .collection('users')
           .doc(res.user.uid)
           // .add method creates a new user id so used set method
           .set({
             firstName: userData.firstName,
             lastName: userData.lastName,
             initials: userData.firstName[0] + userData.lastName[0]
           })
     )} ).then(() => {
       dispatch({ type: 'SIGNUP_SUCCESS'})
       }).catch(err => {
         dispatch({ type: 'SIGNUP_ERROR', err})
       })

  }
}