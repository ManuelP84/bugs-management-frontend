import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { projectType } from '../../state/slice/projectSlice';
import { RootState } from '../../state/store';
import ProjectList from './ProjectList';

type Props = {}

const ProjectNavigation: React.FC<Props> = (props) => {

    const filteringOptions = ["projectId", "name", "startDate", "endDate",
        "description", "state", "developerEmails", "leaderEmails"]

    const sortingOptions = ["projectId", "name", "startDate", "endDate", "state"]

    const projects = useSelector((state: RootState) => state.projects.projects);

    const [filterInput, setFilterInput] = useState("")
    const [filterBy, setFilter] = useState("")
    const [sortBy, setSorting] = useState("")
    const [ascending, setAscending] = useState(false)
    const [projectList, setProjectList] = useState<projectType[]>([])

    useEffect(() => {
        setProjectList([...projects])
    }, [projects])

    useEffect(() => {
        if (sortBy) {
            const sortedList = projectList.sort((row1, row2) => {
                const fieldToSort1 = row1[sortBy as keyof projectType]
                const fieldToSort2 = row2[sortBy as keyof projectType]

                return (fieldToSort1 && fieldToSort2) ? (
                    fieldToSort1.toString() > fieldToSort2.toString() ?
                        (ascending ? -1 : 1) : (ascending ? 1 : -1)
                ) : 1
            })

            setProjectList([...sortedList])
        }
    }, [ascending, sortBy])

    const onReload = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault()
        setProjectList([...projects])
        setFilterInput("")
        setFilter("")
        setSorting("")
        setAscending(false)
    }

    const onFilterProject = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault()

        if (filterBy) {
            const filteredList = projectList.filter(project => {
                const fieldToFilter = project[filterBy as keyof projectType]
                if (fieldToFilter) {
                    return fieldToFilter.toString().toLowerCase().trim().includes(filterInput.toLowerCase().trim())
                }
            })
            setProjectList([...filteredList])
        }
        setFilterInput("")
        setFilter("")
    }

    return (
        <div className="fluid-container py-2">
            <div className="row m-2">
                <h4>Your Projects</h4>
            </div>

            {/* Filtering form */}
            <div className="row mx-2">
                <div className="col-md-3 col-sm-3 my-2">
                    <select className="form-select" name="filter-criteria"
                        value={filterBy}
                        onChange={(e) => setFilter(e.target.value)}>
                        <option value="">Filter by...</option>
                        {filteringOptions.map(filterOption => {
                            return <option value={filterOption} key={filterOption}>{`${filterOption}`}</option>
                        })}
                    </select>
                </div>
                <div className="col-md-4 col-sm-9 my-2">
                    <input className="form-control" type="text" name="filter"
                        value={filterInput}
                        onChange={(e) => setFilterInput(e.target.value)}
                        placeholder="Filter criteria" required />
                </div>
                <div className="col-md-2 col-sm-6 my-2">
                    <button className="btn btn-primary w-100 text-nowrap px-0" onClick={onFilterProject}>Filter</button>
                </div>
                <div className="col-md-3 col-sm-6 my-2">
                    <button className="btn btn-primary w-100 text-nowrap px-0" onClick={onReload}>Reload Data</button>
                </div>
            </div>

            {/* Sorting form */}
            <div className="row mx-2">
                <div className="col-md-3 col-sm-10 my-2">
                    <select className="form-select" name="filter-criteria"
                        value={sortBy}
                        onChange={(e) => setSorting(e.target.value)}>
                        <option value="">Sort by...</option>
                        {sortingOptions.map(sortOption => {
                            return <option value={sortOption} key={sortOption}>{`${sortOption}`}</option>
                        })}
                    </select>
                </div>
                <div className="col-md-2 col-sm-2 my-2">
                    <button className="btn btn-outline-secondary w-100 text-nowrap px-0"
                        onClick={() => setAscending(!ascending)}>⬆⬇</button>
                </div>
            </div>
            <ProjectList projects={projectList} />
        </div>
    )
}

export default ProjectNavigation