import React from 'react'

type Props = {}

const CreateProjectForm = (props: Props) => {

    return (
        <form>
            <div className="m-5 form-group">

                <div className="">
                    <h3>Create Project</h3>
                </div>

                <div className=" w-50 my-2">
                    <div className="col form-floating">
                        <input className="form-control" type="text" id="name" placeholder="Project Name" />
                        <label className="mx-3" htmlFor="name">Project Name</label>
                    </div>
                </div>

                <div className=" w-50 my-2">
                    <div className="col form-floating">
                        <input className="form-control" type="text" id="startDate" placeholder="Start Date" />
                        <label className="mx-3" htmlFor="startDate">Start date</label>
                    </div>
                </div>

                <div className=" w-50 my-2">
                    <div className="col form-floating">
                        <input className="form-control" type="email" id="developerEmails" placeholder="Developer Email" />
                        <label className="mx-3" htmlFor="developerEmails">Developer email</label>
                    </div>
                </div>

                <div className="d-flex  w-50 align-items-center my-2">
                    <div className="col w-50 form-check">
                        <input className="form-check-input" type="checkbox" id="isInCharge" />
                        <label className="form-check-label" htmlFor="isInCharge">in charge?</label>
                    </div>
                    <div className="col w-50">
                        <button className="btn btn-primary">Add developer email</button>
                    </div>
                </div>

                <div className="d-flex  w-50 my-2">
                    <div className="col form-floating">
                        <input className="form-control" type="email" id="leaderEmails" placeholder="Leader Email" />
                        <label className="mx-3" htmlFor="leaderEmails">Leader email</label>
                    </div>
                </div>

                <div className="d-flex  w-50 align-items-center my-2">
                    <div className="col w-50 form-check">
                        <input className="form-check-input" type="checkbox" id="isInCharge" />
                        <label className="form-check-label" htmlFor="isInCharge">in charge?</label>
                    </div>
                    <div className="col w-50">
                        <button className="btn btn-primary">Add developer email</button>
                    </div>
                </div>

                <div className=" w-50 my-2">
                    <div className="col-12">
                        <label className="m-2" htmlFor="description">Description:</label><br />
                        <textarea className="form-control" id="description" placeholder="Project description" />
                    </div>
                </div>
            </div>

        </form>
    )
}

export default CreateProjectForm