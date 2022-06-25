import React, { useState } from 'react'

type Props = {}

const CreateProjectForm = (props: Props) => {

    const emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/

    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [devEmail, setDevEmail] = useState("");
    const [devInCharged, setDevInCharged] = useState(false);
    const [developerEmails, setDeveloperEmails] = useState<string[]>([]);
    const [leaderEmail, setLeaderEmail] = useState("");
    const [leaderInCharged, setLeaderInCharged] = useState(false);
    const [leaderEmails, setLeaderEmails] = useState<string[]>([]);
    const [description, setDescription] = useState("");

    const onAddDevEmail = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        if (emailRegex.test(devEmail)) {
            setDeveloperEmails([...developerEmails, devEmail])
            setDevEmail("")
        }
    }

    const onAddLeaderEmail = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        if (emailRegex.test(leaderEmail)) {
            setLeaderEmails([...leaderEmails, leaderEmail])
            setLeaderEmail("")
        }
    }

    return (
        <form>
            <div className="container my-3">

                <div className="row my-4">
                    <div className="col">
                        <h4>Project registration</h4>
                    </div>
                </div>

                <div className="row my-3">
                    <div className="col input-form">
                        <input className="form-control" type="text" id="name" onChange={(e) => setName(e.target.value)} placeholder="Project Name" />
                    </div>
                </div>
                <div className="my-3 input-group">
                    <input type="text" className="form-control" onChange={(e) => setDate(e.target.value)} placeholder="Start date" />
                    <span className="input-group-text">yyyy-mm-dd</span>
                </div>

                <div className="d-flex row my-3 justify-content-between">
                    <div className="col-md-8">
                        <div className="input-group">
                            <input type="email" className="form-control" onChange={(e) => setDevEmail(e.target.value)} placeholder="Developer email" />
                            <div className="input-group-text">
                                <input className="form-check-input mt-0 mx-2" onChange={(e) => setDevInCharged(e.currentTarget.checked)} type="checkbox" value="" />
                                <span>in charge</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <button className="btn btn-primary w-100" onClick={onAddDevEmail}>Add developer</button>
                    </div>
                </div>

                <div className="row my-3">
                    <div className="col-8">
                        <div className="input-group">
                            <input type="email" className="form-control" onChange={(e) => setLeaderEmail(e.target.value)} placeholder="Leader email" />
                            <div className="input-group-text">
                                <input className="form-check-input mt-0 mx-2" onChange={(e) => setLeaderInCharged(e.currentTarget.checked)} type="checkbox" value="" />
                                <span>in charge</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <button className="btn btn-primary w-100" onClick={onAddLeaderEmail}>Add leader</button>
                    </div>
                </div>

                <div className="row my-3">
                    <div className="col-12">
                        <textarea className="form-control" id="description" onChange={(e) => setDescription(e.target.value)} placeholder="Project description" />
                    </div>
                </div>
            </div>

        </form>
    )
}

export default CreateProjectForm