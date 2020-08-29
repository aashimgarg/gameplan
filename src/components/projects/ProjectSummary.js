import React from 'react'
import moment from 'moment'

const ProjectSummary = ({ projects }) => {
  return (
    <div className="card z-depth-0 project-summary">
      <ul class="collection">
        <div className="card-content grey-text text-darken-3">
          <li class="collection-item avatar">
            <img src={projects.data.url} alt="" class="circle" />
            <span className="card-title ">{projects.data.title}</span>
            <p>Posted by {projects.data.firstName} {projects.data.lastName}</p>
            {/* <p className="grey-text"> {moment(projects.data.createdAt).format("MMM Do YY")} </p> */}
          </li>
        </div>
      </ul>
    </div>

  )
}

export default ProjectSummary