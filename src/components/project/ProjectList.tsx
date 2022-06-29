import React from 'react'
import { useSelector } from 'react-redux'
import { projectType } from '../../state/slice/projectSlice'
import { RootState } from '../../state/store'
import ProjectDropdown from './ProjectDropdown'

type Props = {
    projects: projectType[]
}

const ProjectList: React.FC<Props> = ({ projects }) => {

    const projectsFromSlice = useSelector((state: RootState) => state.projects.projects);


    return (
        <div className="fluid-container py-2" id="accordionExample">

            {projectsFromSlice.map((project: projectType) =>
                <ProjectDropdown project={project} key={project.id} />
            )}
        </div>
    )
}

export default ProjectList  