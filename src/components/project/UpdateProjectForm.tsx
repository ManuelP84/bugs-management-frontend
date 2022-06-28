import React, { useState } from 'react'
import { createProject } from '../../services/project/createProject'
import { projectStateEnum, projectType } from '../../state/slice/projectSlice'
import { useAppDispatch } from '../../state/store'

type Props = {
    project: projectType
}

const UpdateProjectForm: React.FC<Props> = (props) => {

    const dispatch = useAppDispatch()

    const emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/
    const dateRegex = /[0-9]{4}-[0-9]{2}-[0-9]{2}/

    const [projectName, setProjectName] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [personEmail, setPersonEmail] = useState("");
    const [isLeader, setIsLeader] = useState(false);
    const [developerEmails, setDeveloperEmails] = useState<string[]>([]);
    const [leaderEmails, setLeaderEmails] = useState<string[]>([]);
    const [description, setDescription] = useState("");
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

    const onCreateProject = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()

        if (0 < projectName.length && projectName.length < 50
            && 0 < description.length && description.length <= 2000
            && dateRegex.test(startDate) && dateRegex.test(startDate) && description) {

            const projectToCreate: projectType =
            {
                projectId: randomProjectId(),
                name: projectName,
                startDate,
                endDate,
                developerEmails,
                leaderEmails,
                description,
                state: projectStateEnum.CREATED
            }

            dispatch(createProject(projectToCreate))

            cleanForm()
        }
    }

    const cleanForm = () => {
        setProjectName("")
        setStartDate("")
        setEndDate("")
        setPersonEmail("")
        setDeveloperEmails([])
        setLeaderEmails([])
        setDescription("")
        setShowEmailAlert(false)
    }

    const randomProjectId = () => {
        return Math.floor(Math.random() * 10000000)
    }

    return (
        <div className="fluid-container py-2">
            <div className="row m-2">
                <h6>Create a Project</h6>
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
                        onChange={(e) => setPersonEmail(e.target.value)} placeholder="Person email" value={personEmail} />
                    <div className="input-group-text">
                        <span className="me-2 input-inset-format">leader</span>
                        <input className="form-check-input mt-0" type="checkbox" checked={isLeader} onChange={(e) => { setIsLeader(e.currentTarget.checked) }} />
                    </div>
                    <button className="btn btn-outline-primary" type="button" onClick={onAddPersonEmail}>Add</button>
                </div>
            </div>

            {showEmailAlert ? <div className="row ms-2">
                <span className="text-start" style={{ color: "red" }}>The email has an invalid format</span>
            </div> : <></>}

            <div className="row m-2">
                <div className="col-12">
                    <textarea className="form-control" name="description" id="description" value={description}
                        onChange={(e) => setDescription(e.target.value)} placeholder="Project description (up to 2000 characters)" />
                </div>
            </div>

            <div className="row m-2">
                <div className="col-12">
                    <button className="btn btn-primary w-100" type="button"
                        onClick={(e) => onCreateProject(e)}>Create Project</button>
                </div>
            </div>
        </div>
    )
}

export default UpdateProjectForm