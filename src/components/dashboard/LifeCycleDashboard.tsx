import React from 'react'
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
import { chartData, chartOptions } from './chartConfig';

type Props = {}

const LifeCycleDashboard = (props: Props) => {
    return (
        <div className="row">
            <div className="col">
                <Bar data={chartData} options={chartOptions} />
            </div>
        </div>
    )
}

export default LifeCycleDashboard