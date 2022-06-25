import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectProjectsState } from '../../state/slice/projectSlice'

type Props = {}

const ProjectList = (props: Props) => {

    const projects = useSelector(selectProjectsState())

    return (
        <div>
            {projects.map(project =>
                <h1 key={project.id}>{project.description}</h1>
            )}
        </div>
    )
}

export default ProjectList  