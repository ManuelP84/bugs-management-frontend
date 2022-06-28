import { Link, useLocation } from "react-router-dom";
import { taskType } from "../../state/slice/taskSlice";

const DisplayTasks = () => {

    interface stateToDisplay {
        taskDetail: taskType
    }

    const location = useLocation()
    const localState = location.state as stateToDisplay;
    const {taskDetail} = localState;

    return(
        <div>
        <h1>Hello from Display Tasks</h1>
        <h2 >Id de Tarea: {taskDetail.taskId}</h2>
        <h2 >Nombre de tarea: {taskDetail.name}</h2>
        <h2 >Id Proyecto: {taskDetail.projectId}</h2>
        <h2 >Nombre de Proyecto: {taskDetail.projectName}</h2>
        <h2 >Fecha de inicio: {taskDetail.date}</h2>
        <h2 >Fecha de finalización: {taskDetail.endDate}</h2>
        <h2 >Tags: {taskDetail.labels.map( tag =>{
            return (<li>{tag.label}</li>)
        }
        )}</h2>
        <h2 >Descripción: {taskDetail.description}</h2>
        <h2 >Archivos adjuntos: {taskDetail.urls.map( urls =>{
            return (<li>{urls.url}</li>)
        }
        )}</h2>
        <h2 >Estado de tarea: {taskDetail.state}</h2>
        <h2 >Desarrolladores asociados: {taskDetail.developerEmails.map( emails =>{
            return (<li>{emails.email}</li>)
        }
        )}</h2>
        <br/>
        <br/>
        <button>Editar</button>
        <br/>
        <button>
        <Link to='/'>
                    Volver
        </Link>
        </button>
        </div>
    )
}

export default DisplayTasks