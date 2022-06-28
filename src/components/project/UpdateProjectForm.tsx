import React, { useState } from 'react'
import { createProject } from '../../services/project/createProject'
import { updateProject } from '../../services/project/updateProject'
import { projectStateEnum, projectType } from '../../state/slice/projectSlice'
import { useAppDispatch } from '../../state/store'

type Props = {
    project: projectType
}

const UpdateProjectForm: React.FC<Props> = ({ project }) => {

    const dispatch = useAppDispatch()

    const emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/
    const dateRegex = /[0-9]{4}-[0-9]{2}-[0-9]{2}/

    const [projectName, setProjectName] = useState(project.name);
    const [startDate, setStartDate] = useState(project.startDate);
    const [endDate, setEndDate] = useState(project.endDate);
    const [personEmail, setPersonEmail] = useState("");
    const [isLeader, setIsLeader] = useState(false);
    const [developerEmails, setDeveloperEmails] = useState<string[]>(project.developerEmails);
    const [leaderEmails, setLeaderEmails] = useState<string[]>(project.leaderEmails);
    const [emailToDelete, setEmailToDelete] = useState("");
    const [description, setDescription] = useState(project.description);
    const [projectState, setProjectState] = useState(project.state as string);
    const [showEmailAlert, setShowEmailAlert] = useState(false)

    const onAddPersonEmail = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()

        if (emailRegex.test(personEmail) && isLeader) {
            setLeaderEmails([...leaderEmails, personEmail])
            setShowEmailAlert(false)
        }
        if (emailRegex.test(personEmail) && !isLeader) {
            setDeveloperEmails([...developerEmails, personEmail])
            setShowEmailAlert(false)
        }
        if (!emailRegex.test(personEmail)) {
            setShowEmailAlert(true)
        }
        setPersonEmail("")
        setIsLeader(false)
    }

    const onUpdateProject = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()

        if (0 < projectName.length && projectName.length < 50
            && 0 < description.length && description.length <= 2000
            && dateRegex.test(startDate) && dateRegex.test(startDate) && description) {


            const projectToUpdate: projectType =
            {
                id: project.id,
                projectId: project.projectId,
                name: projectName,
                startDate,
                endDate,
                developerEmails,
                leaderEmails,
                description,
                state: projectStateEnum[projectState as keyof typeof projectStateEnum]
            }

            dispatch(updateProject(projectToUpdate))

            clearForm()
        }
    }

    const clearForm = () => {
        setProjectName("")
        setStartDate("")
        setEndDate("")
        setPersonEmail("")
        setDeveloperEmails([])
        setLeaderEmails([])
        setDescription("")
        setShowEmailAlert(false)
    }

    const onRemoveAnEmail = () => {
        const developersAfterRemoveAnEmail = developerEmails.filter(email => email !== emailToDelete)
        const leadersAfterRemoveAnEmail = leaderEmails.filter(email => email !== emailToDelete)
        setDeveloperEmails([...developersAfterRemoveAnEmail])
        setLeaderEmails([...leadersAfterRemoveAnEmail])
    }

    return (
        <div className="fluid-container py-2">
            <div className="row m-2">
                <h6>{"Updating project with id "}
                    <span style={{ textDecoration: "underline" }}>{project.projectId}
                    </span>
                </h6>
                <span></span>
            </div>

            <div className="row m-2">
                <div className="col-12">
                    <input className="form-control" type="text" id="name"
                        onChange={(e) => setProjectName(e.target.value)}
                        placeholder="Project name (up to 50 characters)"
                        value={projectName} />
                </div>
            </div>

            <div className="row m-2 ">
                <div className="col-12 input-group">
                    <div className="input-group-text">
                        <span className="input-inset-format">YYYY-MM-DD</span>
                    </div>
                    <input type="text" className="form-control" onChange={(e) => setStartDate(e.target.value)}
                        placeholder="Start date"
                        value={startDate} />
                </div>
            </div>

            <div className="row m-2 ">
                <div className="col-12 input-group">
                    <div className="input-group-text">
                        <span className="input-inset-format">YYYY-MM-DD</span>
                    </div>
                    <input type="text" className="form-control"
                        onChange={(e) => setEndDate(e.target.value)}
                        placeholder="End date (optional)"
                        value={endDate} />
                </div>
            </div>

            {/* Set an email of a person, check if him/her is a leader to be added to the corresponding list*/}
            <div className="row m-2">
                <div className="col input-group">
                    <input className="form-control" type="email"
                        onChange={(e) => setPersonEmail(e.target.value)} placeholder="Person email"
                        value={personEmail} />
                    <div className="input-group-text">
                        <span className="me-2 input-inset-format">leader</span>
                        <input className="form-check-input mt-0" type="checkbox" checked={isLeader}
                            onChange={(e) => { setIsLeader(e.currentTarget.checked) }} />
                    </div>
                    <button className="btn btn-outline-primary" type="button" onClick={onAddPersonEmail}>Add</button>
                </div>
            </div>

            {showEmailAlert ? <div className="row ms-2">
                <span className="text-start" style={{ color: "red" }}>The email has an invalid format</span>
            </div> : <></>}

            {/* Pick the email to be deleted*/}
            <div className="row m-2">
                <div className="col input-group">
                    <select className="form-select" name="projectState"
                        onChange={(e) => setEmailToDelete(e.target.value)}>
                        <option value="">Pick an email to remove...</option>
                        {[...developerEmails, ...leaderEmails].map(
                            email => {
                                return <option value={email} key={email}>{email}</option>
                            })}
                    </select>
                    <button className="btn btn-outline-danger" type="button" onClick={onRemoveAnEmail}>Remove</button>
                </div>
            </div>

            <div className="row m-2">
                <div className="col-12">
                    <textarea className="form-control" name="description" id="description" value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Project description (up to 2000 characters)" />
                </div>
            </div>

            {/* Select to change the project state */}
            <div className="row m-2">
                <div className="col-12">
                    <select className="form-select" name="projectState"
                        onChange={(e) => setProjectState(e.target.value)}>
                        <option value={projectState}>Change project state (current: {projectState})</option>
                        {(Object.values(projectStateEnum)).map(
                            state => {
                                return <option value={projectState} key={state}>{state}</option>
                            })}
                    </select>
                </div>
            </div>

            <div className="row m-2">
                <div className="col-12">
                    <button className="btn btn-primary w-100" type="button"
                        onClick={(e) => onUpdateProject(e)}>Update Project</button>
                </div>
            </div>
        </div>
    )
}

export default UpdateProjectForm