export const createProject = (project) => {
    return (dispatch,getState, { getFirebase , getFirestore }) => {
        //async call to database
        const firestore = getFirestore();
      firestore.collection('projects').add({
        ...project,
        authorFirstName: 'Aashim',
        authorLastName: 'Garg',
        authorId: 7906,
        createdAt: new Date()
      }).then(() => { 
         dispatch({ type:'CREATE_PROJECT' })
        }).catch((error) =>{
         dispatch ({ type: 'CREATE_PROJECT_ERROR' } , error)
        })
    }
}