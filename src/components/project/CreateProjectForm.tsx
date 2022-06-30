import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { createProject } from '../../services/project/createProject'
import { projectStateEnum, projectType, userTest } from '../../state/slice/projectSlice'
import { RootState, useAppDispatch } from '../../state/store'

type Props = {}

const CreateProjectForm: React.FC<Props> = (props) => {

    const dispatch = useAppDispatch()

    // this is temporary while the user slice can be accessed
    const user = userTest

    const emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/
    const dateRegex = /^[0-9]{4}\-[0-9]{2}\-[0-9]{2}$/

    const [projectName, setProjectName] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [personEmail, setPersonEmail] = useState("");
    const [isLeader, setIsLeader] = useState(false);
    const [developerEmails, setDeveloperEmails] = useState<string[]>([]);
    const [leaderEmails, setLeaderEmails] = useState<string[]>([]);
    const [description, setDescription] = useState("");
    const [showEmailAlert, setShowEmailAlert] = useState(false)
    const [showStartDateAlert, setShowStartDateAlert] = useState(false)
    const [showEndDateAlert, setShowEndDateAlert] = useState(false)

    const onAddPersonEmail = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()

        if (emailRegex.test(personEmail) && isLeader) {
            setLeaderEmails([...leaderEmails, personEmail])
            setPersonEmail("")
            setShowEmailAlert(false)
        }
        if (emailRegex.test(personEmail) && !isLeader) {
            setDeveloperEmails([...developerEmails, personEmail])
            setPersonEmail("")
            setShowEmailAlert(false)
        }
        if (!emailRegex.test(personEmail)) {
            setShowEmailAlert(true)
        }
        setIsLeader(false)
    }

    const onCreateProject = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()

        const startDateValidation = validateStartDate(startDate)
        const endDateValidation = validateEndDate(endDate)
        if (0 < projectName.length && projectName.length < 50
            && startDateValidation && endDateValidation
            && 0 < description.length && description.length <= 2000 && description) {

            const projectToCreate: projectType =
            {
                projectId: randomProjectId(),
                name: projectName,
                startDate,
                endDate,
                developerEmails: Array.from(new Set(developerEmails)),
                leaderEmails: Array.from(new Set(leaderEmails)),
                description,
                state: projectStateEnum.CREATED
            }

            dispatch(createProject(projectToCreate))
            clearForm()
        }
    }

    const validateStartDate = (date: string): boolean => {
        const validation = validateDate(date)
        setShowStartDateAlert(!validation)
        return validation
    }

    const validateEndDate = (date: string): boolean => {
        if (date.length !== 0) {
            const validation = validateDate(date)
            setShowEndDateAlert(!validation)
            return validation
        }
        setShowEndDateAlert(false)
        return true
    }

    const validateDate = (date: string): boolean => {
        if (dateRegex.test(date)) {
            const dateArray = date.split('-')
            const validatedMonth = parseInt(dateArray[1]) <= 12
            const validatedDay = parseInt(dateArray[2]) <= 31
            if (validatedMonth && validatedDay) {
                return true
            }
        }
        return false
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
        setShowStartDateAlert(false)
        setShowEndDateAlert(false)
    }

    const randomProjectId = () => {
        return Math.floor(Math.random() * 10000000)
    }

    const pickSuggestedEmail = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        console.log(e)
    }

    return (
        <div className="fluid-container py-2">
            <div className="row m-2">
                <h4>Create a Project</h4>
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
                    <input type="text" className={`form-control ${showStartDateAlert ? "border-2 border-danger" : ""}`}
                        onChange={(e) => setStartDate(e.target.value)}
                        placeholder="Start date"
                        value={startDate} />
                </div>
            </div>

            <div className="row m-2 ">
                <div className="col-12 input-group">
                    <div className="input-group-text">
                        <span className="input-inset-format">YYYY-MM-DD</span>
                    </div>
                    <input type="text" className={`form-control ${showEndDateAlert ? "border-2 border-danger" : ""}`}
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

                    {(user.userRol === "ADMIN" || user.userRol === "TESTER") ?
                        <button className="btn btn-outline-primary" type="button" onClick={onAddPersonEmail}>Add</button>
                        : <button className="btn btn-outline-primary disabled" type="button">Add</button>}
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
                    {(user.userRol === "ADMIN" || user.userRol === "TESTER") ?
                        <button className="btn btn-primary w-100" type="button"
                            onClick={(e) => onCreateProject(e)}>Create Project</button>
                        : <button className="btn btn-primary w-100 disabled" type="button"
                            onClick={() => { }}>Create Project</button>}
                </div>
            </div>
        </div>
    )
}

export default CreateProjectForm