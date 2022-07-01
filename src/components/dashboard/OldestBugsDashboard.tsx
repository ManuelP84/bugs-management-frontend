import React, { useEffect } from 'react'
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
import { chartData, chartOptions } from './chartConfig';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';

type Props = {}

const OldestBugsDashboard = (props: Props) => {

    const bugs = useSelector((state: RootState) => state.dashboard.bugs);

    const dataToShow = bugs.filter(bug =>
        ["Asignado", "Reincidente", "Rechazado"].includes(bug.state)).map(bug => {
            return {
                id: bug.id,
                title: bug.title,
                projectId: bug.projectId,
                taskId: bug.taskId,
                startDate: bug.date
            }
        }).sort((bug1, bug2) => bug1.startDate > bug2.startDate ? 1 : -1).slice(0, 10)

    return (
        <div className="fluid-container">
            {dataToShow.length > 0 ?
                <div className="row">
                    <h6>Top 10: Defectos más antiguos no finalizados (Projecto: {dataToShow[0].projectId})</h6>
                </div> : <></>}
            <div className="row">
                {/* <span><b >Project id: </b> {dataToShow[0].projectId}</span> */}
                {dataToShow.length > 0 ? <div className="col">
                    {dataToShow.map(bug => {
                        return <div className="rounded border border-danger my-2 p-2" key={bug.id}>
                            <span>({bug.startDate})</span>    ---
                            <b > Bug: </b><span>{bug.title}</span>    ---
                            <b > Tarea: </b><span>{bug.taskId}</span>
                        </div>
                    })}
                </div> :
                    <div className="col">
                        <h6>No hay defectos que no hayan terminado su ciclo de vida</h6>
                    </div>}
            </div>
        </div>
    )
}

export default OldestBugsDashboard