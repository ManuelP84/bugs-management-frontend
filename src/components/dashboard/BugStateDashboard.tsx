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

    const assigned = bugs.filter(bug => bug.state === "Asignado").length;
    const cancelled = bugs.filter(bug => bug.state === "Cancelado").length;
    const closed = bugs.filter(bug => bug.state === "Cerrado").length;
    const closedWithBugs = bugs.filter(bug => bug.state === "Cerrado con defectos").length;
    const relapsing = bugs.filter(bug => bug.state === "Reincidente").length;
    const rejected = bugs.filter(bug => bug.state === "Rechazado").length;
    const solved = bugs.filter(bug => bug.state === "Solucionado").length;

    const data = [assigned, cancelled, closed, closedWithBugs, relapsing, rejected, solved]

    const dataSetsProperties = { ...chartData.datasets[0] }
    const dataSets = { ...dataSetsProperties, data: data, label: "Defectos agrupados por estado" }

    const chartDataConfig = {
        ...chartData,
        labels: ["Asignado", "Cancelado", "Cerrado", "Cerrado con defectos", "Reincidente", "Rechazado", "Solucionado"],
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