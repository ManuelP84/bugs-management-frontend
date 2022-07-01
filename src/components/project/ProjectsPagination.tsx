import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { possibleStatus } from '../../config/possibleStatus';
import { changePage, loadPaginatedProjects, selectProjectsStatus } from '../../state/slice/projectSlice';
import { RootState, useAppDispatch } from '../../state/store';

type Props = {}

const ProjectsPagination: React.FC<Props> = (props) => {

    const dispatch = useAppDispatch();

    const status = useSelector(selectProjectsStatus())

    const { projects, page } = useSelector((state: RootState) => state.projects);

    const [numberOfPages, setNumberOfPages] = useState(1)

    const [loading, setLoading] = useState(false)
    const projectsPerPage = 20

    useEffect(() => {
        setNumberOfPages(Math.ceil(projects.length / projectsPerPage))
        dispatch(loadPaginatedProjects(projects
            .slice(projectsPerPage * (page - 1), projectsPerPage * (page - 1) + projectsPerPage)))
    }, [projects, page])

    useEffect(() => {
        if (status === possibleStatus.PENDING) {
            setLoading(true)
        }
        if (status === possibleStatus.COMPLETED) {
            setLoading(false)
        }
    }, [status])

    return (
        <div className="row mx-2">
            <div className="d-flex col justify-content-between align-items-center">
                <button className={`btn btn-outline-secondary ${(page === 1 || projects.length <= 0) ? "disabled" : ""}`}
                    onClick={() => dispatch(changePage(page - 1))}>←</button>
                {loading ? <h6>Cargando...</h6> :
                    (projects.length <= 0) ? <></> : <h6>{page} de {numberOfPages}</h6>}
                <button className={`btn btn-outline-secondary ${(page === numberOfPages || projects.length <= 0) ? "disabled" : ""}`}
                    onClick={() => dispatch(changePage(page + 1))}>→</button>
            </div>
        </div>
    )
}

export default ProjectsPagination