import React, { useState } from 'react'
import { projectType } from '../../state/slice/projectSlice'
import UpdateProjectModal from './UpdateProjectModal'

type Props = {
    project: projectType,
    toggle: boolean
}

const ProjectDetails: React.FC<Props> = ({ project, toggle }) => {

    const [showUpdateModal, setShowUpdateModal] = useState(false)

    const deleteLeaderEmail = (leader: string) => {
        console.log(leader)
    }
    const deleteDeveloperEmail = (dev: string) => {
        console.log(dev)
    }

    return (
        <>
            <div id="collapseOne" className={`accordion-collapse collapse ${toggle ? "show" : ""}`}>
                <div className="fluid-container mx-4">
                    <hr></hr>
                    <p className="row text-start"><b className="row">Leaders:</b>
                        {project.leaderEmails.map(leader =>
                            <span key={leader}>{`${leader}`}
                                <b className="clickable" style={{ color: "#dc3545" }}
                                    onClick={(e) => deleteLeaderEmail(leader)}> ✖</b></span>
                        )}</p>
                    <p className="row text-start"><b className="row"> People involved:</b>
                        {project.developerEmails.map(dev =>
                            <span key={dev}>{`${dev}`}
                                <b className="clickable" style={{ color: "#dc3545" }}
                                    onClick={() => deleteDeveloperEmail(dev)}> ✖</b></span>
                        )}</p>
                    <p className="row text-start"><b className="row">Description:</b>{project.description}</p>
                    <div className="row my-2">
                        <div className="col-sm-6 col-xs-6">
                            <button className="btn btn-danger w-100 my-2"
                                type="button"
                                onClick={() => { }}>Delete Project</button>
                        </div>
                        <div className="col-sm-6 col-xs-6">
                            <button className="btn btn-warning w-100 my-2"
                                type="button"
                                onClick={() => setShowUpdateModal(true)}>Update Project</button>
                        </div>
                    </div>
                </div>
            </div>
            <UpdateProjectModal project={project} showUpdateModal={showUpdateModal} setShowUpdateModal={setShowUpdateModal} />
        </>
    )
}

export default ProjectDetails