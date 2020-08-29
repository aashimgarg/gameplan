import { db } from '../../config/fbConfig'

const requestAllProjects = () => {
  return {
    type: 'FETCH_ALL_PROJECTS_REQUEST',
  };
};

const receiveProjects = projects => {
  return {
    type: 'FETCH_ALL_PROJECTS_SUCCESS',
    projects
  }
}

const requestAllProjectsError = () => {
  return {
    type: 'FETCH_ALL_PROJECTS_ERROR'
  }
}

// FETCH_ALL_PROJECTS_HANDLER

export const fetchAllProjects = () => {
  return async (dispatch) => {
    dispatch(requestAllProjects());
    try {
      const projectRef = db.collection("projects");
      projectRef.orderBy("createdAt", "desc")
      .onSnapshot(async (snapshot) => {
        const projects = snapshot
          .docs
          .map((doc) => {
            return ({
              data: doc.data(),
              id: doc.id
            })
          });
        await dispatch(receiveProjects(projects));
      });
    } catch (error) {
      dispatch(requestAllProjectsError());
    }
  }
};

const requestCreateProject = () => {
  return {
    type: 'CREATE_PROJECT_REQUEST',
  };
}

const createProjectSuccess = () => {
  return {
    type: 'CREATE_PROJECT_SUCCESS'
  };
}

const createProjectError = () => {
  return {
    type: 'CREATE_PROJECT_ERROR'
  }
}

// CREATE PROJECT

export const createProject = (project) => {
  return async (dispatch, getState) => {
    dispatch(requestCreateProject());
    try {
      const createdAt = new Date();
      const { userData, user } = getState().auth
      const { firstName, lastName, url } = userData
      const postOwnerId = user.uid
      await db
        .collection("projects")
        .add({ ...project, createdAt, firstName, lastName, postOwnerId , url });

      dispatch(createProjectSuccess());
    } catch (error) {
      dispatch(createProjectError());
    }
  }
};

// FETCH TASK

const requestProject = () => {
  return {
    type: 'FETCH_PROJECT_REQUEST',
  };
};

const receiveProject = (projects) => {
  return {
    type: 'FETCH_PROJECT_SUCCESS',
    projects,
  };
};

const requestProjectError = () => {
  return {
    type: 'FETCH_PROJECT_ERROR',
  };
};

export const fetchProject = (projectId) => {
  return async (dispatch) => {
    dispatch(requestProject());
    try {
      const taskRef = db.doc(`projects/${projectId}`);
      taskRef.onSnapshot(async (snapshot) => {
        await dispatch(receiveProject(snapshot.data()));
      });
    } catch (error) {
      dispatch(requestProjectError());
    }
  }
};

// FETCH PERSONAL TASKS


const requestPersonalProject = () => {
  return {
    type: 'FETCH_PERSONAL_TASKS_REQUEST',
  };
};

const receivePersonalProjects = (projects) => {
  return {
    type: 'FETCH_PERSONAL_TASKS_SUCCESS',
    projects,
  };
};

const requestPersonalProjectError = () => {
  return {
    type: 'FETCH_PERSONAL_TASKS_ERROR',
  };
};

export const fetchPersonalProjects = () => async (dispatch,getState) => {
  dispatch(requestPersonalProject());

  try {
    const projectRef = db
      .collection("projects")
      .where("postOwnerId", "==", getState().auth.user.uid)
    projectRef.onSnapshot((snapshot) => {
      const projects = snapshot
                       .docs
                       .map((doc) => {
                       return ({
                                data: doc.data(),
                                id: doc.id
                                })
                        });
        projects.sort(
        (a, b) =>
          a.createdAt &&
          b.createdAt &&
          b.createdAt.seconds - a.createdAt.seconds
      );
      dispatch(receivePersonalProjects(projects));
    });
  } catch (error) {
    dispatch(requestPersonalProjectError());
  }
};

// DELETE PROJECTS

const requestDelete = () => {
  return {
    type: 'DELETE_TASK_REQUEST',
  };
};

const deleteError = () => {
  return {
    type: 'DELETE_TASK_ERROR',
  };
};

const deleteSuccess = () => {
  return {
    type: 'DELETE_TASK_SUCCESS',
  };
};

export const deleteProject = (id) => async (dispatch) => {
  dispatch(requestDelete());
  try {
    await db
         .doc(`projects/${id}`)
         .delete()
    dispatch(deleteSuccess());
  } catch (error) {
    dispatch(deleteError());
  }
};
