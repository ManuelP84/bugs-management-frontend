import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CreateProjectForm from '../components/project/CreateProjectForm'
import ProjectList from '../components/project/ProjectList'
import { possibleStatus } from '../config/possibleStatus'
import { getAllProjects } from '../services/project/getAllProjects'
import { selectProjectsStatus } from '../state/slice/projectSlice'
import { useAppDispatch } from '../state/store'

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
        <div>
            <CreateProjectForm />
            <ProjectList />
        </div>
    )
}

export default ProjectPage