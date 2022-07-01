import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { taskType } from "../../state/slice/taskSlice";
import { addTempTask } from "../../state/slice/tempTaskSlice";
import { RootState, useAppDispatch } from "../../state/store";

const DisplayTasksComponent = () => {

    const task = useSelector((state: RootState) => state.tempTask)
    const taskDetail = task.task

    const project = useSelector((state: RootState) => state.tempProject)
    const projectToList = project.project

    const user = useSelector((state: RootState) => state.login.actualUser);
    const rol = user?.userRol
    const permissions = ((rol == "Tester" || rol == "Admin") (projectToList.state == "ACTIVE" || projectToList.state == "CREATED"))

    const dispatch = useAppDispatch()

    const tempTask = (task: taskType) => {
        dispatch(addTempTask(task))
    }

    return (
        <div className="text-center"><h2>Tarea: {taskDetail.name}</h2>

            <div className="container mt-5 fs-5">
                <div className="row w-100">

                    <br></br>
                    <div className="fluid-container mx-4">
                        <div className="row border rounded border-secondary">
                            <div className="col"><strong>Id de Tarea:</strong></div>
                            <div className="col">{taskDetail.taskId}</div>
                        </div>
                        <div className="row border rounded border-secondary">
                            <div className="col"><strong>Nombre de tarea:</strong></div>
                            <div className="col">{taskDetail.name}</div>
                        </div>
                        <div className="row border rounded border-secondary">
                            <div className="col"><strong>Id Proyecto:</strong></div>
                            <div className="col">{taskDetail.projectId}</div>
                        </div>
                        <div className="row border rounded border-secondary">
                            <div className="col"><strong>Nombre de Proyecto:</strong></div>
                            <div className="col">{taskDetail.projectName}</div>
                        </div>
                        <div className="row border rounded border-secondary">
                            <div className="col"><strong>Fecha de inicio:</strong></div>
                            <div className="col">{taskDetail.date}</div>
                        </div>
                        <div className="row border rounded border-secondary">
                            <div className="col"><strong>Fecha de finalización:</strong></div>
                            <div className="col">{taskDetail.endDate}</div>
                        </div>
                        <div className="row border rounded border-secondary">
                            <div className="col"><strong>Tags:</strong></div>
                            <div className="col">
                                <ul className="list-unstyled">
                                    {taskDetail.labels.map(tag => {
                                        return (<li>{tag.label}</li>)
                                    })}
                                </ul>
                            </div>
                        </div>
                        <div className="row border rounded border-secondary">
                            <div className="col"><strong>Descripción:</strong></div>
                            <div className="col">{taskDetail.description}</div>
                        </div>
                        <div className="row border rounded border-secondary">
                            <div className="col"><strong>Archivos adjuntos:</strong></div>
                            <div className="col">
                                <ul className="list-unstyled">
                                    {taskDetail.urls?.map(urls => {
                                        return (<li><a className="text-decoration-none text-dark" href={urls.url}>{urls.fileName}</a></li>)
                                    })}
                                </ul>
                            </div>
                        </div>
                        <div className="row border rounded border-secondary">
                            <div className="col"><strong>Estado de tarea:</strong></div>
                            <div className="col">{taskDetail.state}</div>
                        </div>
                        <div className="row border rounded border-secondary">
                            <div className="col"><strong>Desarrolladores asociados:</strong></div>

                            <div className="col">
                                <ul className="list-unstyled">
                                    {taskDetail.developerEmails.map(emails => {
                                        return (<li>{emails.email}</li>)
                                    })}
                                </ul>
                            </div>
                        </div>
                        <div className="row border rounded border-secondary"></div>
                        <br />

                        <div className="row">
                            <div hidden={!permissions}>
                                <Link to='/bugs' className="text-decoration-none text-white">
                                    <button className="btn btn-primary"
                                        onClick={() => tempTask(taskDetail)}
                                    >
                                        <strong>
                                            Bugs
                                        </strong>
                                    </button>
                                </Link>
                            </div>
                            <br />
                            <br />
                            <div hidden={!permissions}>
                                <Link to='/edit-task' className="text-decoration-none text-white">
                                    <button className="btn btn-primary"
                                        onClick={() => tempTask(taskDetail)}
                                    >
                                        <strong>
                                            Editar
                                        </strong>
                                    </button>
                                </Link>
                            </div>
                            <br />
                            <br />
                            <div>
                                <Link to='/task-list' className="text-decoration-none text-white">
                                    <button className="btn btn-secondary">
                                        Volver
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DisplayTasksComponent