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
        <h2 >Id: {localState.taskDetail.taskId}</h2>
        <h2 >Last Name: {localState.taskDetail.last_name}</h2>
        <h2 >E-mail: {localState.taskDetail.email}</h2>
        <h2 >Gender: {localState.taskDetail.gender}</h2>
        <h2 >Ip Address: {localState.taskDetail.ip_address}</h2>
        <Link to='/'>
                    Volver
        </Link>
        </div>
    )
}

export default DisplayTasks