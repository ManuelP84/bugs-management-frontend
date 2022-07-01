import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Dashboards from '../components/dashboard/Dashboards'
import SelectProjectForm from '../components/dashboard/SelectProjectForm'
import { getBugsByProjectId } from '../services/dashboard/getBugsByProjectId'
import { getAllUsersThunk } from '../services/loginServices'
import { getAllProjects } from '../services/project/getAllProjects'
import { loadRelatedProject } from '../state/slice/dashboardSlice'
import { IUser } from '../state/slice/loginSlice'
import { changePage } from '../state/slice/projectSlice'
import { RootState, useAppDispatch } from '../state/store'

type Props = {}

const DashboardPage = (props: Props) => {

    const projects = useSelector((state: RootState) => state.projects.projects);
    const paginatedProjects = useSelector((state: RootState) => state.projects.paginatedProjects);

    const dispatch = useAppDispatch()

    const user = useSelector((state: RootState) => state.login.actualUser);

    useEffect(() => {
        (user) ? dispatch(getAllProjects(user))
            : dispatch(getAllProjects({ userEmail: "", userRol: "Reader", userToken: "" } as IUser))
        dispatch(getAllUsersThunk())
        dispatch(changePage(1))
        setInterval(() => {
            dispatch(loadRelatedProject(projects[0]))
            dispatch(getBugsByProjectId(projects[0]))
        }, 120000)
    }, [user, projects, paginatedProjects])

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