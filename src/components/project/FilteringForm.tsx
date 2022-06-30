import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { getAllProjects } from '../../services/project/getAllProjects';
import { IUser } from '../../state/slice/loginSlice';
import { changePage, loadProjects, projectType } from '../../state/slice/projectSlice';
import { RootState, useAppDispatch } from '../../state/store';

type Props = {}

const FilteringForm = (props: Props) => {


    const dispatch = useAppDispatch();

    const actualUser = useSelector((state: RootState) => state.login.actualUser);

    const user = (actualUser) ? actualUser : { userRole: 'Reader', userEmail: "", userToken: "" }

    const { projects } = useSelector((state: RootState) => state.projects);

    const filteringOptions = ["projectId", "name", "startDate", "endDate",
        "description", "state", "developerEmails", "leaderEmails"]

    const [filterInput, setFilterInput] = useState("")
    const [filterBy, setFilter] = useState("")
    const [projectList, setProjectList] = useState<projectType[]>([])

    useEffect(() => {
        setProjectList([...projects])
    }, [projects])

    const onFilterProject = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault()

        if (filterBy) {
            const filteredList = projectList.filter(project => {

                const fieldToFilter = project[filterBy as keyof projectType]
                if (fieldToFilter) {
                    return fieldToFilter.toString().toLowerCase().trim().includes(filterInput.toLowerCase().trim())
                }
            })

            dispatch(loadProjects(filteredList))
            dispatch(changePage(1))
        }
        setFilterInput("")
        setFilter("")
    }

    const onReload = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const actualUser = useSelector((state: RootState) => state.login.actualUser);
        const user = (actualUser) ? actualUser : { userRole: 'Reader', userEmail: "", userToken: "" }
        event.preventDefault()
        setFilterInput("")
        setFilter("")
        dispatch(getAllProjects(user))
        dispatch(changePage(1))
    }

    return (
        <div className="row mx-2">
            <div className="col-md-3 col-sm-3 my-2">
                <select className="form-select" name="filter-criteria"
                    value={filterBy} onChange={(e) => setFilter(e.target.value)}>
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
                <button className="btn btn-primary w-100 text-nowrap px-0" onClick={(e) => onReload(e)}>Reload Data</button>
            </div>
        </div>
    )
}

export default FilteringForm