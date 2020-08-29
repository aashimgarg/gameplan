import authReducer from './reducers/authReducer'
import projectReducer from './reducers/projectReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  auth: authReducer,
  project: projectReducer,
});

export default rootReducer

