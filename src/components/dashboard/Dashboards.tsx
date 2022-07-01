import React from 'react'
import { Chart, registerables } from 'chart.js';
import LifeCycleDashboard from './LifeCycleDashboard';
import BugStateDashboard from './BugStateDashboard';
import OldestBugsDashboard from './OldestBugsDashboard';
import { projectType } from '../../state/slice/projectSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';
Chart.register(...registerables);

type Props = {}

const Dashboards: React.FC<Props> = (props) => {

    const relatedProject = useSelector((state: RootState) => state.dashboard.relatedProject);

    return (
        <div className="fluid-container py-2">
            <div className="row mb-2 mx-3 mb-4">
                <div className="col">
                    <span>{(relatedProject) ? (<b>Projecto: {relatedProject.projectId} - {relatedProject.name}</b>)
                        : (<b>Seleccione un proyecto por su ID para cargar el dashboard asociado</b>)}</span>
                </div>
            </div>
            <div className="row mx-3">
                <LifeCycleDashboard />
                <BugStateDashboard />
                <OldestBugsDashboard />
            </div>
        </div>
    )
}

export default Dashboards