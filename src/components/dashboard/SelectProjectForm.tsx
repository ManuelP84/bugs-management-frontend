import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { projectType } from '../../state/slice/projectSlice'
import { RootState } from '../../state/store'

type suggestedProject = {
    id: number,
    name: string
}

type Props = {}

const SelectProjectForm = (props: Props) => {

    const projects = useSelector((state: RootState) => state.projects.projects);

    const [filterBugsBy, setFilterBugsBy] = useState('')
    const [suggestedProjects, setSuggestedProjects] = useState<projectType[]>([])

    useEffect(() => {
        setSuggestedProjects([])
        if (filterBugsBy.length > 0) {
            const suggestions = projects.filter((project: projectType) => {
                if (project.projectId) {
                    return project.projectId.toString().includes(filterBugsBy)
                }
            })
            setSuggestedProjects([...suggestions])
        }
    }, [filterBugsBy])

    const onPickProject = (suggestion: projectType) => {
        console.log(suggestion.projectId)
    }

    return (
        <div className="fluid-container py-2">
            <div className="row m-2">
                <label className="label-form mb-2" htmlFor="project-id">Project ID: </label>
                <div className="col input-group">
                    <input className="form-control" type="email"
                        onChange={(e) => setFilterBugsBy(e.target.value)} placeholder="Project ID"
                        value={filterBugsBy} />

                    <button className="btn btn-outline-primary"
                        type="button" onClick={() => { }}>Load dashboard</button>
                </div>
            </div>

            <div className="row m-2 mt-2">
                <div className="row">
                    {suggestedProjects.length > 0 ? <h6>Project suggestions:</h6> : <></>}
                </div>
                <div className={`row mx-2 ${suggestedProjects.length > 0 ? "card" : ""}`}>
                    <div className="col card-body">
                        {suggestedProjects.map(suggestion => {
                            return <div key={suggestion.projectId}>
                                <span className="clickable overflow-hidden text-nowrap"
                                    onClick={() => onPickProject(suggestion)}>{`${suggestion.projectId}`}</span>
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