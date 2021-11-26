import React from 'react'
import { connect } from 'react-redux'

import { Redirect } from 'react-router-dom'

import { fetchProject , deleteProject} from '../../store/actions/projectActions'
import moment from 'moment'

const ProjectDetails = ({
  currentProject,
  match,
  dispatch,
  isValidate,
  user,
  history,
  isVerifying
}) => {
  
  React.useEffect(() => {
    dispatch(fetchProject(match.params.id));
  }, [match.params.id]);

  const deleteHandler = () => {
    try {
       dispatch(deleteProject(match.params.id));
       history.push('/');

    } catch (error) {
      console.log("Error while deleting the document" + error.message);
    }
  }
 
 
  if (!isValidate && !isVerifying) {
    return <Redirect to='/signin' />
  }
  
    return (
      <div className="container section project-summary">
        <div style={{ width: '70%' }} className="card z-depth-0">
          <div className="card-content">
            <span className="card-title">{currentProject.title}</span>
             {/* {user.uid === currentProject.postOwnerId
                 ? <a onClick={() => deleteHandler(match.params.id)} class="btn-floating halfway-fab waves-effect waves-light blue">
      <i class="medium material-icons">
         delete
      </i>
    </a> 
  : null}  */}
          <p>{currentProject.content}</p>
          </div>
          <div className="card-action grey lighten-4 grey-text">
            <div>Posted by {currentProject.firstName} {currentProject.lastName}</div>
            {/* {<div>{moment(currentProject.createdAt).format("MMM Do YY")}</div>} */}
          </div>
        </div>
      </div>
    )
            }

const mapStateToProps = (state) => {
  return {
    currentProject: state.project.currentProject,
    isValidate: state.auth.isValidate,
    user: state.auth.user,
    isVerifying:state.auth.isVerifying
  }
}

export default connect(mapStateToProps)(ProjectDetails)