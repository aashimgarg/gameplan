const initState = {
  projects: [
    {id: '1', title: 'help me find peace', content: 'hello world'},
    {id: '2', title: 'feel the power', content: 'hello world'},
    {id: '3', title: 'roam in the rome', content: 'hello world'}
  ]
}

const projectReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_PROJECT':
      console.log('create project',action.type);
      return state;
    case 'CREATE_PROJECT_ERROR':
      console.log('create project error');
      return state;
    default:
      return state;
  } 
};

export default projectReducer;