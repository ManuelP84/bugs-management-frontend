import React from 'react'
import Dashboards from '../components/dashboard/Dashboards'
import SelectProjectForm from '../components/dashboard/SelectProjectForm'

type Props = {}

const DashboardPage = (props: Props) => {
    return (
        <div className="fluid-container py-3">

            <div className="row m-2 px-3">
                <div className="col">
                    <h4>Dashboards</h4>
                </div>
            </div>

            <div className="row">
                <div className="col-md-5 py-2">
                    <SelectProjectForm />
                </div>
                <div className="col-md-7 py-2">
                    <Dashboards />
                </div>
            </div>
        </div>
    )
}

export default DashboardPage