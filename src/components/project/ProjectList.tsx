import React from 'react'
import { useSelector } from 'react-redux'
import { projectType } from '../../state/slice/projectSlice'
import { RootState } from '../../state/store'
import ProjectDropdown from './ProjectDropdown'
import ProjectNavigation from './ProjectNavigation'

type Props = {}

const ProjectList: React.FC<Props> = (props) => {

    const projectsFromSlice = useSelector((state: RootState) => state.projects.projects);


    return (
        <div className="fluid-container py-2" id="accordionExample">
            <div className="row mx-2">
                <h4>Your Projects</h4>
            </div>

            <ProjectNavigation />

            {projectsFromSlice.map((project: projectType) =>
                <ProjectDropdown project={project} key={project.id} />
            )}
        </div>
    )
}

export default ProjectList  