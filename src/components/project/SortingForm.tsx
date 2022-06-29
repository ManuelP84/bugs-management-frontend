import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { loadProjects, projectType } from '../../state/slice/projectSlice';
import { RootState, useAppDispatch } from '../../state/store';

type Props = {}

const SortingForm = (props: Props) => {

    const sortingOptions = ["projectId", "name", "startDate", "endDate", "state"]

    const dispatch = useAppDispatch();

    const projects = useSelector((state: RootState) => state.projects.projects as projectType[]);

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
            dispatch(loadProjects(sortedList))
        }
    }, [ascending, sortBy])
    return (
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
    )
}

export default SortingForm