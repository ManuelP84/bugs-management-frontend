import React, { useEffect, useState } from 'react'

type suggestedProject = {
    id: number,
    name: string
}

type Props = {}

const SelectProjectForm = (props: Props) => {

    const projects = [
        { id: 241241, name: "Project 1" },
        { id: 246246, name: "Project 2" },
        { id: 579977, name: "Testing project suggestions 1" },
        { id: 653146, name: "Testing project suggestions 1" }]

    const [filterBugsBy, setFilterBugsBy] = useState('')
    const [suggestedProjects, setSuggestedProjects] = useState<suggestedProject[]>([])

    useEffect(() => {
        setSuggestedProjects([])
        if (filterBugsBy.length > 0) {
            const suggestions = projects.filter(project => project.id.toString().includes(filterBugsBy))
            setSuggestedProjects([...suggestions])
        }
    }, [filterBugsBy])

    const onPickProject = (suggestion: suggestedProject) => {
        console.log(suggestion.id)
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
                        type="button" onClick={() => { }}>Show dashboard</button>
                </div>
            </div>

            <div className="row m-2 mt-2">
                <div className="row">
                    {suggestedProjects.length > 0 ? <h6>Project suggestions:</h6> : <></>}
                </div>
                <div className={`row mx-2 ${suggestedProjects.length > 0 ? "card" : ""}`}>
                    <div className="col card-body">
                        {suggestedProjects.map(suggestion => {
                            return <div key={suggestion.id}>
                                <span className="clickable overflow-hidden text-nowrap"
                                    onClick={() => onPickProject(suggestion)}>{`${suggestion.id}`}</span>
                                <span className="overflow-hidden text-nowrap">{` : ${suggestion.name}`}</span><br />
                            </div>
                        })}
                    </div>
                </div>
            </div>
        </div >
    )
}

export default SelectProjectForm