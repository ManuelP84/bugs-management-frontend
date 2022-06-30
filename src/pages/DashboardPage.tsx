import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Dashboards from '../components/dashboard/Dashboards'
import SelectProjectForm from '../components/dashboard/SelectProjectForm'
import { getBugsByProjectId } from '../services/dashboard/getBugsByProjectId'
import { loadRelatedProject } from '../state/slice/dashboardSlice'
import { RootState, useAppDispatch } from '../state/store'

type Props = {}

const DashboardPage = (props: Props) => {

    const projects = useSelector((state: RootState) => state.projects.projects);

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(loadRelatedProject(projects[0]))
        dispatch(getBugsByProjectId(projects[0]))
    }, [])

    return (
        <div className="fluid-container py-3">

            <div className="row m-2 px-3">
                <div className="col">
                    <h4>Dashboards</h4>
                </div>
            </div>

            <div className="row">
                <div className="col-md-4 py-2">
                    <SelectProjectForm />
                </div>
                <div className="col-md-8 py-2">
                    <Dashboards />
                </div>
            </div>
        </div>
    )
}

export default DashboardPage