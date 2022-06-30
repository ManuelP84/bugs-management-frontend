import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { removeLeader } from '../../services/project/removeLeader'
import { projectStateEnum, projectType} from '../../state/slice/projectSlice'
import { addTempProject } from '../../state/slice/tempProjectSlice'
import { RootState, useAppDispatch } from '../../state/store'
import { useSelector } from 'react-redux'
import DeleteProjectModal from './DeleteProjectModal'
import UpdateProjectModal from './UpdateProjectModal'

type Props = {
    project: projectType,
    toggle: boolean
}

const ProjectDetails: React.FC<Props> = ({ project, toggle }) => {

    const navigate = useNavigate()

    const dispatch = useAppDispatch()

    const user = useSelector((state: RootState) => state.login.actualUser);

    const permissions = (user) ? (user.userRol === "Admin" || user.userRol === "Tester") : false

    const [showUpdateModal, setShowUpdateModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    const deleteLeaderEmail = (e: React.MouseEvent<HTMLElement, MouseEvent>, leader: string) => {
        e.preventDefault()
        dispatch(removeLeader({ project, leader }))
    }

    const tempProject = (project: projectType)=>{
        dispatch(addTempProject(project))
    }

    return (
        <>
            <div id="collapseOne" className={`accordion-collapse collapse ${toggle ? "show" : ""}`}>
                <div className="fluid-container mx-4">
                    <hr></hr>
                    <span className="row text-start"><b className="row">Leaders:</b>
                        {project.leaderEmails.map(leader =>
                            <span key={leader}>{`${leader}`}
                                {permissions ? <b className="clickable" style={{ color: "#dc3545" }}
                                    onClick={(e) => deleteLeaderEmail(e, leader)}> ✖</b> : <></>}</span>
                        )}</span>
                    <span className="row text-start"><b className="row"> Developers:</b>
                        {project.developerEmails.map(dev =>
                            <span key={dev}>{`${dev}`}
                                {/* {permissions ? <b className="clickable" style={{ color: "#dc3545" }}
                                    onClick={() => deleteDeveloperEmail(dev)}> ✖</b> : <></>} */}
                            </span>
                        )}</span>
                    <span className="row text-start"><b className="row">Description:</b>{project.description}</span>
                    <div className="row my-2">

                        <div className={permissions && (project.state === projectStateEnum.CREATED) ?
                            "col-sm-4 col-xs-4" : "col-sm-6"}>
                            <Link to={'/task-list'}>
                                <button className="btn btn-success w-100 my-2 px-0"
                                    type="button"
                                    onClick={() =>(tempProject(project))}
                                >Tasks
                                </button>
                            </Link>
                        </div>

                        {permissions && project.state === projectStateEnum.CREATED ?
                            <div className="col-sm-4 col-xs-4">
                                <button className="btn btn-danger w-100 my-2 px-0"
                                    type="button"
                                    onClick={() => setShowDeleteModal(true)}>Delete Project</button>
                            </div> : <></>}

                        {permissions ?
                            <div className={permissions && (project.state === projectStateEnum.CREATED) ?
                                "col-sm-4 col-xs-4" : "col-sm-6"}>
                                <button className="btn btn-warning w-100 my-2 px-0"
                                    type="button"
                                    onClick={() => setShowUpdateModal(true)}>Update Project</button>
                            </div> : <></>}
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