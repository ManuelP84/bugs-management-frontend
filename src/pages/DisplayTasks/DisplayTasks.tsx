import { useLocation } from "react-router-dom";
import { taskType } from "../../state/slice/taskSlice";

const DisplayTasks = () => {

    interface stateToDisplay {
        taskToDisplay: taskType
    }

    const location = useLocation()
    // const localState = location.state as stateToDisplay;
    const localState = location.state;
    // const { taskToDisplay } = localState

    console.log(localState)

    return(
        <h1>Hello from Display Tasks</h1>
    )
}

export default DisplayTasks