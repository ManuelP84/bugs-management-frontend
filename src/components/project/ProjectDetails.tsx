import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { projectStateEnum, projectType } from '../../state/slice/projectSlice'
import DeleteProjectModal from './DeleteProjectModal'
import UpdateProjectModal from './UpdateProjectModal'

type Props = {
    project: projectType,
    toggle: boolean
}

const ProjectDetails: React.FC<Props> = ({ project, toggle }) => {

    const navigate = useNavigate()

    const [showUpdateModal, setShowUpdateModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    const deleteLeaderEmail = (leader: string) => {
        console.log(leader)
    }
    const deleteDeveloperEmail = (dev: string) => {
        console.log(dev)
    }

    const goToTasks = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        navigate("/" + project.id)
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

                        <div className={project.state === projectStateEnum.CREATED ?
                            "col-sm-4 col-xs-4" : "col-sm-6"}>
                            <button className="btn btn-success w-100 my-2 px-0"
                                type="button"
                                onClick={(e) => goToTasks(e)}>Tasks</button>
                        </div>

                        {project.state === projectStateEnum.CREATED ?
                            <div className="col-sm-4 col-xs-4">
                                <button className="btn btn-danger w-100 my-2 px-0"
                                    type="button"
                                    onClick={() => setShowDeleteModal(true)}>Delete Project</button>
                            </div> : <></>}

                        <div className={project.state === projectStateEnum.CREATED ?
                            "col-sm-4 col-xs-4" : "col-sm-6"}>
                            <button className="btn btn-warning w-100 my-2 px-0"
                                type="button"
                                onClick={() => setShowUpdateModal(true)}>Update Project</button>
                        </div>
                    </div>
                </div>
            </div>
            <UpdateProjectModal
                project={project}
                showUpdateModal={showUpdateModal}
                setShowUpdateModal={setShowUpdateModal} />
            <DeleteProjectModal
                project={project}
                showUpdateModal={showDeleteModal}
                setShowUpdateModal={setShowDeleteModal} />
        </>
    )
}

export default ProjectDetails