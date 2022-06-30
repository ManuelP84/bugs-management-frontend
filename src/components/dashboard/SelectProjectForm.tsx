import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getBugsByProjectId } from '../../services/dashboard/getBugsByProjectId'
import { loadRelatedProject } from '../../state/slice/dashboardSlice'
import { projectType } from '../../state/slice/projectSlice'
import { RootState, useAppDispatch } from '../../state/store'

type Props = {
}

const SelectProjectForm: React.FC<Props> = (props) => {

    const projects = useSelector((state: RootState) => state.projects.projects);

    const dispatch = useAppDispatch()

    const [filterBugsBy, setFilterBugsBy] = useState('')
    const [suggestedProjects, setSuggestedProjects] = useState<projectType[]>([])
    const [selectedProject, setSuggestesetSelectedProject] = useState<projectType>()

    // Project Suggestion
    useEffect(() => {
        setSuggestedProjects([])
        if (filterBugsBy.length > 0) {
            const suggestions = projects.filter((project: projectType) => {
                if (project.projectId) {
                    return project.projectId.toString().includes(filterBugsBy)
                }
            })
            setSuggestedProjects([...suggestions])
            if (suggestions.length === 1) {
                setSuggestesetSelectedProject(suggestions[0])
            }
        }
    }, [filterBugsBy])

    // To load the selected project out from the suggestions in the input form
    const onSelectSuggestedProject = (suggestion: projectType) => {
        const selectedProjectId = (suggestion.projectId) ? suggestion.projectId.toString() : ""
        setFilterBugsBy(selectedProjectId)
        setSuggestesetSelectedProject(suggestion)
    }

    // To load the dashboard related to the selected project
    const onLoadDashboard = () => {
        console.log(selectedProject)
        dispatch(getBugsByProjectId(selectedProject as projectType))
        dispatch(loadRelatedProject(selectedProject as projectType))
    }

    return (
        <div className="fluid-container py-2">
            <div className="row m-2">
                <label className="label-form mb-2" htmlFor="project-id">Project ID: </label>
                <div className="col input-group">
                    <input className="form-control submit" type="text"
                        onChange={(e) => setFilterBugsBy(e.target.value)} placeholder="Project ID"
                        value={filterBugsBy} />

                    <button className="btn btn-outline-primary"
                        type="button" onClick={onLoadDashboard}>Load dashboard</button>
                </div>
            </div>

            <div className="row m-2 mt-2">
                <div className={`row mx-2 ${suggestedProjects.length > 0 ? "card" : ""}`}>
                    <div className="col card-body">
                        {suggestedProjects.map(suggestion => {
                            return <div key={suggestion.projectId}>
                                <span className="clickable overflow-hidden text-nowrap"
                                    onClick={() => onSelectSuggestedProject(suggestion)}>{`${suggestion.projectId}`}</span>
                                <span className="overflow-hidden text-nowrap">{`: ${suggestion.name}`}</span><br />
                            </div>
                        })}
                    </div>
                </div>
            </div>
        </div >
    )
}

export default SelectProjectForm