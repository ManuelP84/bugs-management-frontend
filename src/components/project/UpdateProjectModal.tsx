import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { projectType } from '../../state/slice/projectSlice'
import UpdateProjectForm from './UpdateProjectForm'

type Props = {
    project: projectType,
    showUpdateModal: boolean,
    setShowUpdateModal: Function
}

const UpdateProjectModal: React.FC<Props> = (props) => {

    const { project, showUpdateModal, setShowUpdateModal } = props

    const handleClose = () => {
        setShowUpdateModal(false);
    }
    return (
        <Modal show={showUpdateModal} onHide={handleClose} centered>
            <Modal.Header style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <Modal.Title>
                    <h5>Actualización de Proyecto</h5>
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <UpdateProjectForm project={project} setShowUpdateModal={setShowUpdateModal} />
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal >
    )
}

export default UpdateProjectModal