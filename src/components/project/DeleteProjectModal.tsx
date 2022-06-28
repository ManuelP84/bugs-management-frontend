import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { projectType } from '../../state/slice/projectSlice'
import { deleteProject } from '../../services/project/deleteProject'
import { useAppDispatch } from '../../state/store'

type Props = {
    project: projectType,
    showUpdateModal: boolean,
    setShowUpdateModal: Function
}

const DeleteProjectModal: React.FC<Props> = (props) => {

    const { project, showUpdateModal, setShowUpdateModal } = props

    const dispatch = useAppDispatch()

    const handleClose = () => {
        setShowUpdateModal(false);
    }
    const onDelete = () => {
        dispatch(deleteProject(project))
    }
    return (
        <Modal show={showUpdateModal} onHide={handleClose} centered>
            <Modal.Header style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <Modal.Title>
                    <h5>Confirmation</h5>
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div className="fluid-container py-2">
                    <div className="row m-2">
                        <h6>{"Do you want to delete the project with id "}
                            <span style={{ textDecoration: "underline" }}> {project.projectId}
                            </span>?
                        </h6>
                    </div>
                </div>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="danger" onClick={onDelete}>
                    Yes, delete
                </Button>
            </Modal.Footer>
        </Modal >
    )
}

export default DeleteProjectModal