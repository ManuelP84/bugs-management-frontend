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
                    <span>{(relatedProject) ? (<b>Project: {relatedProject.projectId} - {relatedProject.name}</b>)
                        : (<b>Select a project by its ID to load the related dashboard</b>)}</span>
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