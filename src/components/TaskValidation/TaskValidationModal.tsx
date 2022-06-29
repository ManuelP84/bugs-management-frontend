import { useState } from "react"
import { Button, Modal } from "react-bootstrap"


type Props ={
    taskValidationModal: boolean
    setTaskValidationModal: Function
}

const TaskValidationModal: React.FC<Props> = (props) =>{
        
    const {taskValidationModal, setTaskValidationModal} = props

    const handleClose = () => {
        setTaskValidationModal(false);
    }

    return(
        <Modal show={taskValidationModal} onHide={handleClose} centered>
            <Modal.Header style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}/>
            <Modal.Title>
                <h4>Error</h4>
            </Modal.Title>
            <Modal.Body>
               <h5> Verifique los campos, debe ingresar al menos un tag y al menos un email.</h5>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
            </Modal.Footer>
        </Modal> 
    )
}

export default TaskValidationModal
