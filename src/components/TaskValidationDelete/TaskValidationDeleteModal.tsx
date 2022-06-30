import { useState } from "react"
import { Button, Modal } from "react-bootstrap"
import { deleteTask } from "../../services/Tasks/deleteTask"
import { taskType } from "../../state/slice/taskSlice"
import { useAppDispatch } from "../../state/store"


type Props ={
    task: taskType
    taskDeleteModal: boolean
    setDeleteValidationModal: Function
}

const TaskValidationDeleteModal: React.FC<Props> = (props) =>{
        
    const {task, taskDeleteModal, setDeleteValidationModal} = props

    const dispatch = useAppDispatch()

    const handleClose = () => {
        setDeleteValidationModal(false);
    }

    const onDelete = () => {
        dispatch(deleteTask(task))
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
                <Button variant="secondary" onClick={handleClose}>Close</Button>
                <Button variant="danger" onClick={()=>(onDelete())}>Borrar</Button>
            </Modal.Footer>
        </Modal> 
    )
}

export default TaskValidationDeleteModal
