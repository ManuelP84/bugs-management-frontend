import { useEffect } from "react"
import { Button, Modal } from "react-bootstrap"
import { useSelector } from "react-redux"
import { deleteBugThunk, getBugsByTaskIdThunk } from "../../services/bugsServices"
import { deleteTask } from "../../services/Tasks/deleteTask"
import { getTasksByProjectId } from "../../services/Tasks/getTasksByProjectId"
import { taskType } from "../../state/slice/taskSlice"
import { RootState, useAppDispatch } from "../../state/store"


type Props ={
    task: taskType
    taskDeleteModal: boolean
    setDeleteValidationModal: Function
}

const TaskValidationDeleteModal: React.FC<Props> = (props) =>{

    const dispatch = useAppDispatch()

    useEffect(() => { dispatch(getBugsByTaskIdThunk(task.taskId)) }, [dispatch])

    const bugList = useSelector((state: RootState) => state.bugs.bugs)

    bugList.map((bug) => (console.log(bug.taskId)))

    const {task, taskDeleteModal, setDeleteValidationModal} = props

    const handleClose = () => {
        setDeleteValidationModal(false);
    }

    const onDelete = () => {
        dispatch(deleteTask(task))
        bugList.map((bug)=>deleteBugThunk(bug.taskId))
        handleClose();
    }

    return(
        <Modal show={taskDeleteModal} onHide={handleClose} centered>
            <Modal.Header style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}/>
            <Modal.Title>
                <h4>ADVERTENCIA!</h4>
            </Modal.Title>
            <Modal.Body>
               <h5> Esto borrara todas la tarea seleccionada y todos los bugs</h5>
               <h5>¿Esta seguro de borrar la tarea y sus bugs?</h5>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>No</Button>
                <Button variant="danger" onClick={()=>(onDelete())}>Si</Button>
            </Modal.Footer>
        </Modal> 
    )
}

export default TaskValidationDeleteModal
