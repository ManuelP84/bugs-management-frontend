import React from 'react'

type Props = {}

const ProjectsPagination: React.FC<Props> = (props) => {
    return (
        <div className="row mx-2">
            <div className="d-flex col justify-content-between">
                <span className="clickable">Previous page</span>
                <span className="clickable">Next Page</span>
            </div>
        </div>
    )
}

export default ProjectsPagination