import { useState } from "react"
import { Button, Modal } from "react-bootstrap"
import { deleteTask } from "../../services/Tasks/deleteTask"
import { taskType } from "../../state/slice/taskSlice"
import { useAppDispatch } from "../../state/store"


type Props ={
    task: taskType
    taskDeleteModal: boolean
    setTaskValidationModal: Function
}

const TaskValidationDeleteModal: React.FC<Props> = (props) =>{
        
    const {task, taskDeleteModal, setTaskValidationModal} = props

    const dispatch = useAppDispatch()

    const handleClose = () => {
        setTaskValidationModal(false);
    }

    const onDelete = () => {
        dispatch(deleteTask(task))
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
                <Button variant="secondary" onClick={handleClose}>Close</Button>
                <Button variant="danger" onClick={()=>{(onDelete()); handleClose}}>Borrar</Button>
            </Modal.Footer>
        </Modal> 
    )
}

export default TaskValidationDeleteModal
