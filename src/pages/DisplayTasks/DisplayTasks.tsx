import { Link, useLocation } from "react-router-dom";
import { taskType } from "../../state/slice/taskSlice";

const DisplayTasks = () => {

    interface stateToDisplay {
        taskDetail: taskType
    }

    const location = useLocation()
    const localState = location.state as stateToDisplay;
    const { taskDetail } = localState;

    return (
        <div className="center">
            <div className="text-center"><h2>Tarea: {taskDetail.name}</h2></div>
            <br></br>
            <div className="fluid-container mx-4">
                <div className="row border-top border-primary">
                    <div className="col"><strong>Id de Tarea:</strong></div>
                    <div className="col">{taskDetail.taskId}</div>
                </div>
                <div className="row row border-top border-primary ">
                    <div className="col"><strong>Nombre de tarea:</strong></div>
                    <div className="col">{taskDetail.name}</div>
                </div>
                <div className="row row border-top border-primary">
                    <div className="col"><strong>Id Proyecto:</strong></div>
                    <div className="col">{taskDetail.projectId}</div>
                </div>
                <div className="row border-top border-primary">
                    <div className="col"><strong>Nombre de Proyecto:</strong></div>
                    <div className="col">{taskDetail.projectName}</div>
                </div>
                <div className="row border-top border-primary">
                    <div className="col"><strong>Fecha de inicio:</strong></div>
                    <div className="col">{taskDetail.date}</div>
                </div>
                <div className="row border-top border-primary">
                    <div className="col"><strong>Fecha de finalización:</strong></div>
                    <div className="col">{taskDetail.endDate}</div>
                </div>
                <div className="row border-top border-primary">
                    <div className="col"><strong>Tags:</strong></div>
                    <div className="col">
                        <ul className="list-unstyled">
                            {taskDetail.labels.map(tag => {
                                return (<li>{tag.label}</li>)
                            })}
                        </ul>
                    </div>
                </div>
                <div className="row border-top border-primary">
                    <div className="col"><strong>Descripción:</strong></div>
                    <div className="col">{taskDetail.description}</div>
                </div>
                <div className="row border-top border-primary">
                    <div className="col"><strong>Archivos adjuntos:</strong></div>
                    <div className="col">
                        <ul className="list-unstyled">
                            {taskDetail.urls.map(urls => {
                                return (<li><a className="text-decoration-none text-dark" href={urls.url}>{urls.fileName}</a></li>)
                            })}
                        </ul>
                    </div>
                </div>
                <div className="row border-top border-primary">
                    <div className="col"><strong>Estado de tarea:</strong></div>
                    <div className="col">{taskDetail.state}</div>
                </div>
                <div className="row border-top border-primary">
                    <div className="col"><strong>Desarrolladores asociados:</strong></div>

                    <div className="col">
                        <ul className="list-unstyled">
                            {taskDetail.developerEmails.map(emails => {
                                return (<li>{emails.email}</li>)
                            })}
                        </ul>
                    </div>
                </div>
                <div className="row border-top border-primary"></div>
                <br />
                <div className="text-center">
                    <button className="btn btn-primary"><strong>Editar</strong></button>
                    <br />
                    <br />
                    <button className="btn btn-secondary">
                        <Link to='/' className="text-decoration-none text-white">
                            Volver
                        </Link>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DisplayTasks