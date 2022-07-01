import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import CreateProjectForm from '../components/project/CreateProjectForm'
import ProjectList from '../components/project/ProjectList'
import { getAllUsersThunk } from '../services/loginServices'
import { getAllProjects } from '../services/project/getAllProjects'
import { IUser } from '../state/slice/loginSlice'
import { changePage } from '../state/slice/projectSlice'
import { RootState, useAppDispatch } from '../state/store'
import "/src/styles/projectStyle.css";

type Props = {}

const ProjectPage = (props: Props) => {

    const dispatch = useAppDispatch();

    const user = useSelector((state: RootState) => state.login.actualUser);

    useEffect(() => {
        (user) ? dispatch(getAllProjects(user))
            : dispatch(getAllProjects({ userEmail: "", userRol: "Reader", userToken: "" } as IUser))
        dispatch(getAllUsersThunk())
        dispatch(changePage(1))
    }, [user])

    return (
        <div className="fluid-container py-3">

            <div className="row m-2 px-3">
                <div className="col"></div>
                <h4>Gestión de proyectos</h4>
            </div>

            <div className="row mx-sm-1">
                <div className="col-md-4 py-2">
                    <CreateProjectForm />
                </div>
                <div className="col-md-8 py-2">
                    <ProjectList />
                </div>
            </div>
        </div>
    )
}

export default ProjectPage