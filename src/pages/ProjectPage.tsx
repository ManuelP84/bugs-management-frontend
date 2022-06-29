import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import CreateProjectForm from '../components/project/CreateProjectForm'
import ProjectList from '../components/project/ProjectList'
import ProjectNavigation from '../components/project/ProjectNavigation'
import { possibleStatus } from '../config/possibleStatus'
import { getAllProjects } from '../services/project/getAllProjects'
import { selectProjectsStatus } from '../state/slice/projectSlice'
import { useAppDispatch } from '../state/store'
import "/src/styles/projectStyle.css";

type Props = {}

const ProjectPage = (props: Props) => {

    const dispatch = useAppDispatch();

    const status = useSelector(selectProjectsStatus())

    useEffect(() => {
        if (status === possibleStatus.IDLE) {
            dispatch(getAllProjects())
        }
    }, [dispatch])

    return (
        <div className="fluid-container">

            <div className="row my-2">
                <div className="col"></div>
                <h4>Project Management</h4>
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