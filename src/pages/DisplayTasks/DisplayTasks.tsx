import { Link, useLocation } from "react-router-dom";
import { taskType } from "../../state/slice/taskSlice";

const DisplayTasks = () => {

    interface stateToDisplay {
        taskToDisplay: taskType
    }

    const location = useLocation()
    // const localState = location.state as stateToDisplay;
    const localState = location.state;
    // const { taskToDisplay } = localState

    console.log(localState.taskDetail.id)

    return(
        <div>
        <h1>Hello from Display Tasks</h1>
        <h2 >Id de Tarea: {localState.taskDetail.taskId}</h2>
        <h2 >Nombre de tarea: {localState.taskDetail.name}</h2>
        <h2 >Id Proyecto: {localState.taskDetail.projectId}</h2>
        <h2 >Nombre de Proyecto: {localState.taskDetail.projectName}</h2>
        <h2 >Fecha de inicio: {localState.taskDetail.date}</h2>
        <h2 >Fecha de finalización: {localState.taskDetail.endDate}</h2>
        <h2 >Tags: {localState.taskDetail.labels.map( tag =>{
            return (<li>{tag.label}</li>)
        }
        )}</h2>
        <h2 >Descripción: {localState.taskDetail.description}</h2>
        <h2 >Archivos adjuntos:: {localState.taskDetail.urls.map( urls =>{
            return (<li>{urls.url}</li>)
        }
        )}</h2>
        <h2 >Estado de tarea: {localState.taskDetail.state}</h2>
        <h2 >Desarrolladores asociados: {localState.taskDetail.developerEmails.map( emails =>{
            return (<li>{emails.email}</li>)
        }
        )}</h2>
        <Link to='/'>
                    Volver
        </Link>
        </div>
    )
}

export default DisplayTasks