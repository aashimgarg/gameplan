import React from 'react'
import ProjectSummary from './ProjectSummary';
import { Link } from 'react-router-dom'
import Spinner from '../spinner'

const ProjectList = ({
  projects,
  isFetchingProjects
}) => {
  if (isFetchingProjects) {
    return (
      <div style={{ position: 'absolute', top: '50%', width: '62%', textAlign: 'center' }}>
        <Spinner
          color="white"
          width="86px"
          height="86px"
        />
      </div>
    )
  }
  return (
    <div className="project-list section">
      {projects.map(project => {
        return (
          <Link to={'/project/' + project.id} key={project.id}>
            <ProjectSummary projects={project} />
          </Link>
        )
      })}
    </div>
  )
}

export default ProjectList