import React from 'react'
import { projectType } from '../../state/slice/projectSlice'
import ProjectDropdown from './ProjectDropdown'

type Props = {
    projects: projectType[]
}

const ProjectList: React.FC<Props> = ({ projects }) => {

    return (
        <div className="fluid-container py-2" id="accordionExample">

            {projects.map(project =>
                <ProjectDropdown project={project} key={project.id} />
            )}
        </div>
    )
}

export default ProjectList  