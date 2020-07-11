export const createProject = (project) => {
    return (dispatch,getState, { getFirebase , getfirestore }) => {
        //async call to database
        dispatch({
            type:'CREATE_PROJECT',
            project: project
        })
    }
}