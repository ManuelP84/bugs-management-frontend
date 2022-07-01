import React, { useEffect } from 'react'
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
import { chartData, chartOptions } from './chartConfig';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';

type Props = {}

const LifeCycleDashboard = (props: Props) => {

    const bugs = useSelector((state: RootState) => state.dashboard.bugs);

    const planning = bugs.filter(bug => bug.lifecycle === "Planeación").length;
    const analysis = bugs.filter(bug => bug.lifecycle === "Análisis").length;
    const design = bugs.filter(bug => bug.lifecycle === "Diseño").length;
    const implementation = bugs.filter(bug => bug.lifecycle === "Implementación").length;
    const testing = bugs.filter(bug => bug.lifecycle === "Pruebas").length;
    const deployment = bugs.filter(bug => bug.lifecycle === "Despliegue").length;
    const use = bugs.filter(bug => bug.lifecycle === "Uso").length;
    const maintenance = bugs.filter(bug => bug.lifecycle === "Mantenimiento").length;

    const data = [planning, analysis, design, implementation, testing, deployment, use, maintenance]

    const dataSetsProperties = { ...chartData.datasets[0] }
    const dataSets = { ...dataSetsProperties, data: data, label: "Defectos no terminados, agrupados por ciclo de vida" }

    const chartDataConfig = {
        ...chartData,
        labels: ["Planeación", "Análisis", "Diseño", "Implementación", "Pruebas", "Despliegue", "Uso", "Mantenimiento"],
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

export default LifeCycleDashboard