import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import CreateProjectForm from '../components/project/CreateProjectForm'
import { getAllProjects } from '../services/project/getAllProjects'

type Props = {}

const Project = (props: Props) => {

    const dispatch = useDispatch()

    // useEffect(() => {
    //     dispatch(getAllProjects())
    // }, [dispatch])

    return (
        <div>
            <CreateProjectForm />
        </div>
    )
}

export default Project