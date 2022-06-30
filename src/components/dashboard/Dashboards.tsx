import React from 'react'
import { Chart, registerables } from 'chart.js';
import LifeCycleDashboard from './LifeCycleDashboard';
import BugStateDashboard from './BugStateDashboard';
import OldestBugsDashboard from './OldestBugsDashboard';
Chart.register(...registerables);

type Props = {}

const Dashboards = (props: Props) => {

    const project = { projectId: 684135, name: "Testing Chartjs" }

    return (
        <div className="fluid-container py-2 me-5">
            <div className="row mb-2">
                <div className="col">
                    <span>Project <b>{`${project.projectId}: `}</b> {project.name}</span>
                </div>
            </div>
            <LifeCycleDashboard />
            <BugStateDashboard />
            <OldestBugsDashboard />
        </div>
    )
}

export default Dashboards