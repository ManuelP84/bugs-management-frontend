import React, { useState } from 'react'
import { projectType } from '../../state/slice/projectSlice'
import ProjectDetails from './ProjectDetails'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

type Props = {
    project: projectType
}

const ProjectDropdown: React.FC<Props> = ({ project }) => {

    const [toggle, setToggle] = useState(false)

    const toggleCollapse = () => {
        setToggle(!toggle)
    }

    return (
        <div className="container mx-3 my-1 px-2 rounded-3 border shadow-sm">
            <div className="d-flex row justify-content-between mt-2 align-items-center">
                <div className="col-md-2 col-sm-2" onClick={toggleCollapse}><span className="clickable">{project.projectId}</span></div>
                <div className="col-md-5 col-sm-5">{project.name}</div>
                <div className="col-md-5 col-sm-5">{project.state}</div>
            </div>
            <div className="d-flex row justify-content-between mb-2 align-items-center">
                <div className="dropdown col-md-2 col-sm-2 p-0 m-0">
                    <span className="btn btn-white dropdown-toggle" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="true">
                        <b>Leaders</b>
                    </span>
                    <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton1">
                        {project.leaderEmails.map(leaderEmail =>
                            <li key={leaderEmail}><a className="dropdown-item">{leaderEmail}</a></li>
                        )}
                    </ul>
                </div>
                <div className="col-md-5 col-sm-5"><b>Start date: </b>{project.startDate}</div>
                <div className="col-md-5 col-sm-5"><b>End date: </b>{project.endDate ? project.endDate : "not defined"}</div>
                <ProjectDetails project={project} toggle={toggle} />
            </div>
        </div >
    )
}

export default ProjectDropdown