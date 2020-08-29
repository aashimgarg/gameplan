import React from 'react'
import { fetchPersonalProjects } from '../../store/actions/projectActions'
import ProjectList from './ProjectList'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'

const  MyProjects = ({
  dispatch,
  personalProjects,
  isValidate
}) => {
 
  React.useEffect(() => {
    dispatch(fetchPersonalProjects());
  }, []);

  if (!isValidate){
    return <Redirect to = '/signin' />
  }
    return (
      <div className="dashboard container">
        <div className="row">
          <div className="col s12 m6">
            { 
            personalProjects.length < 1 
            ? <h4 style={{color: 'white',position:'absolute', top: '35%', width: '62%', textAlign: 'center'}}> There are no project of yours ☹&nbsp;.
              You can add some in the Create Projects Section! </h4>
            : <ProjectList projects = {personalProjects}/>
             }
          </div>  
          <div className="col s12 m5 offset-m1">
          </div>
        </div>
      </div>
    )
  }

const mapStateToProps = state => {
  return {
    personalProjects: state.project.personalProjects,
    isValidate:state.auth.isValidate
  }
}

export default connect(mapStateToProps)(MyProjects);
