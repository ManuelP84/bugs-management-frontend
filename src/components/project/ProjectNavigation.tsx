import React from 'react'
import FilteringForm from './FilteringForm';
import SortingForm from './SortingForm';
import ProjectsPagination from './ProjectsPagination';

type Props = {}

const ProjectNavigation: React.FC<Props> = (props) => {

    return (
        <div className="fluid-container py-2">
            <FilteringForm />

            <SortingForm />

            <ProjectsPagination />
        </div >
    )
}

export default ProjectNavigation