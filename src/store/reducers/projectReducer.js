const initState = {
  isFetchingProjects: false,
  iFetched: false,
  fetchingError: false,
  isCreatingProject: false,
  isCreatedProject: false,
  creatingProjectError: false,
  isFetchingSingle: false,
  isFetchedSingle: false,
  isFetchingPersonalProjects: false,
  isFetchedPersonal: false,
  fetchingError: false,
  isDeletingProject: false,
  isDeletedProject: false,
  deleteError: false,
  projects: [],
  personalProjects: [],
  currentProject: {}
}

const projectReducer = (state = initState, action) => {
  switch (action.type) {
    case 'FETCH_ALL_PROJECTS_REQUEST':
      return {
        ...state,
        isFetchingProjects: true,
        fetchingError: false,
      }
    case 'FETCH_ALL_PROJECTS_SUCCESS':
      return {
        ...state,
        isFetchingProjects: false,
        fetchingError: false,
        isFetched: true,
        projects: action.projects
      }
    case 'FETCH_ALL_PROJECTS_ERROR':
      return {
        ...state,
        isFetchingProjects: false,
        fetchingError: true,
        isFetched: false
      }
    case 'CREATE_PROJECT_REQUEST':
      
      return {
        ...state,
        isCreatingProject: true,
        isCreatedproject: false,
        creatingProjectError: false
      }
    case 'CREATE_PROJECT_SUCCESS': 
      return {
        ...state,
        isCreatingProject: false,
        isCreatedproject: true,
        creatingProjectError: false
      }
    case 'CREATE_PROJECT_ERROR':
      return {
        ...state,
        isCreatingProject: false,
        isCreatedproject: false,
        creatingProjectError: true
      }
    case 'FETCH_PROJECT_REQUEST':
      return {
        ...state,
        isFetchingSingle: true,
        isFetchedSingle: false,
        fetchingError: false,
      }
    case 'FETCH_PROJECT_SUCCESS':
      return {
        ...state,
        isFetchingSingle: false,
        isFetchedSingle: true,
        currentProject: action.projects,
      }
    case 'FETCH_PROJECT_ERROR':
      return {
        isFetchingSingle: false,
        fetchingError: true,
        isFetchedSingle: false
      }
    case 'FETCH_PERSONAL_TASKS_REQUEST':
      return {
        ...state,
        isFetchingPersonalProjects: true,
        isFetchedPersonal: false,
        fetchingError: false,
      };
    case 'FETCH_PERSONAL_TASKS_SUCCESS':
      return {
        ...state,
        isFetchingPersonalProjects: false,
        isFetchedPersonal: true,
        personalProjects: action.projects,
      };
    case 'FETCH_PERSONAL_TASKS_ERROR':
      return {
        ...state,
        isFetchingPersonalProjects: false,
        isFetchedPersonal: false,
        fetchingError: true,
      };
    case 'DELETE_TASK_REQUEST':
      return {
        ...state,
        isDeletingProject: true,
        isDeletedProject: false,
        deleteError: false,
      };
    case 'DELETE_TASK_SUCCESS':
      console.log('---1--')
      return {
        ...state,
        isDeletingProject: false,
        isDeletedProject: true,
        projects: action.projects,
        currentProject: { ...state.currentProject, ...action.data },
        deleteError: false,
      };
    case 'DELETE_TASK_ERROR':
      console.log('---2--')
      return {
        ...state,
        isDeletingProject: false,
        isDeletedProject: false,
        deleteError: true,
      };
    default:
      return state
  }
};

export default projectReducer;