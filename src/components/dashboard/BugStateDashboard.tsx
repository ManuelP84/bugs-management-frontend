import React from 'react'
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
import { chartData, chartOptions } from './chartConfig';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';

type Props = {}

const BugStateDashboard = (props: Props) => {

    const bugs = useSelector((state: RootState) => state.dashboard.bugs);

    const assigned = bugs.filter(bug => bug.state.toLowerCase() === "assigned").length;
    const cancelled = bugs.filter(bug => bug.state.toLowerCase() === "cancelled").length;
    const closed = bugs.filter(bug => bug.state.toLowerCase() === "closed").length;
    const closedWithBugs = bugs.filter(bug => bug.state.toLowerCase() === "closedWithBugs").length;
    const relapsing = bugs.filter(bug => bug.state.toLowerCase() === "relapsing").length;
    const rejected = bugs.filter(bug => bug.state.toLowerCase() === "rejected").length;
    const solved = bugs.filter(bug => bug.state.toLowerCase() === "solved").length;
    const maintenance = bugs.filter(bug => bug.state.toLowerCase() === "maintenance").length;

    const data = [assigned, cancelled, closed, closedWithBugs, relapsing, rejected, solved, maintenance]

    const dataSetsProperties = { ...chartData.datasets[0] }
    const dataSets = { ...dataSetsProperties, data: data, label: "Defectos agrupados por estado" }

    const chartDataConfig = {
        ...chartData,
        labels: ["Asignado", "Cancelado", "Cerrado", "Cerrado con defectos", "Reincidente", "Rechazado", "solucionado"],
        datasets: [dataSets]
    }

    return (
        <div className="fluid-container">
            <div className="row mb-4">
                <div className="col">
                    <Bar data={chartDataConfig} options={chartOptions} />
                </div>
            </div>
        </div>
    )
}

export default BugStateDashboard