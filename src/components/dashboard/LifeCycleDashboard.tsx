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

    useEffect(() => {
        console.log(bugs)
    },[])

    return (
        <div className="row">
            <div className="col">
                <Bar data={chartData} options={chartOptions} />
            </div>
        </div>
    )
}

export default LifeCycleDashboard