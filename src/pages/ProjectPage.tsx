import React, { useEffect } from 'react'
import CreateProjectForm from '../components/project/CreateProjectForm'
import ProjectList from '../components/project/ProjectList'
import { getAllProjects } from '../services/project/getAllProjects'
import { useAppDispatch } from '../state/store'
import "/src/styles/projectStyle.css";

type Props = {}

const ProjectPage = (props: Props) => {

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getAllProjects())
    }, [dispatch])

    return (
        <div className="fluid-container py-3">

            <div className="row m-2 px-3">
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