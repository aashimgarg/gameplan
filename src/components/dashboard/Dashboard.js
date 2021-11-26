import React from 'react'
import ProjectList from '../projects/ProjectList'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import { fetchAllProjects } from "../../store/actions/projectActions";

const  Dashboard = ({
  projects,
  dispatch,
  isFetchingProjects,
  isValidate,
  isVerifying
}) => {

  React.useEffect(() => {
    dispatch(fetchAllProjects()); 
  }, []);

   if (!isValidate && !isVerifying){
     return <Redirect to = '/signin' />
   }

   return (
      <div className="dashboard container">
        <div className="row">
          <div className="col s12 m6">
            <ProjectList projects = {projects} 
                         isFetchingProjects={isFetchingProjects}
            />
          </div>        
        </div>
      </div>
    )
  }

const mapStateToProps = state => {
  return {
    projects: state.project.projects,
    isFetchingProjects:state.project.isFetchingProjects,
    isValidate:state.auth.isValidate,
    isVerifying:state.auth.isVerifying
  }
}

export default connect(mapStateToProps)(Dashboard);