import moment from "moment";
import * as React from "react";
import { useSelector } from "react-redux";
import { createNewTask } from "../../services/Tasks/createNewTask";
import { IUser, selectActualUser } from "../../state/slice/loginSlice";
import { emailType, labelType, taskType } from "../../state/slice/taskSlice";
import { RootState, useAppDispatch } from "../../state/store";
import DatePicker from "react-datepicker";
import { nanoid } from "@reduxjs/toolkit";
import { Link, useNavigate } from "react-router-dom";
import TaskValidationModal from "../TaskValidation/TaskValidationModal";
import { IBug } from "../../state/slice/bugsSlice";
import { postBugThunk, updateBugThunk } from "../../services/bugsServices";
import { Button, Modal } from "react-bootstrap";

interface IDevEditBugFormProps {
  bugProp: IBug;
}

const DevEditBugForm: React.FunctionComponent<IDevEditBugFormProps> = ({
  bugProp,
}) => {
  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  const [developerNotes, setDeveloperNotes] = React.useState(bugProp.developerNotes);
  const [state, setState] = React.useState<String>();
  const radioHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState(event.target.value);
  };
  const setInitialStateForm = () => {
    setDeveloperNotes("");
  };
  const [showTaskValidationModal, setTaskValidationModal] =
    React.useState(false);
  const dispatch = useAppDispatch();

  const enProcesoDiv = (
    <>
      <div className="container">
        <fieldset>
          <legend>¿El Bug Esta Solucionado?</legend>
          <p>
            <input
              type="radio"
              name="drink"
              value="Si"
              id="Si"
              onChange={radioHandler}
            />
            <label htmlFor="Si">Si</label>
          </p>

          <p>
            <input
              type="radio"
              name="drink"
              value="No"
              id="No"
              onChange={radioHandler}
            />
            <label htmlFor="No">No</label>
          </p>
        </fieldset>
      </div>
      <label>Notas del Desarrollador</label>
      <textarea
        className="form-control"
        value={developerNotes}
        placeholder="Problems"
        maxLength={5000}
        required
        onChange={(e) => setDeveloperNotes(e.target.value)}
      />
    </>
  );
  const asignadoDiv = (
    <>
      <div className="container">
        <fieldset>
          <legend>¿Deseas aceptar este bug?</legend>
          <p>
            <input
              type="radio"
              name="drink"
              value="Si"
              id="Si"
              onChange={radioHandler}
            />
            <label htmlFor="Si">Si</label>
          </p>

          <p>
            <input
              type="radio"
              name="drink"
              value="No"
              id="No"
              onChange={radioHandler}
            />
            <label htmlFor="No">No</label>
          </p>
        </fieldset>
      </div>
      <label>Notas del Desarrollador</label>
      <textarea
        className="form-control"
        value={developerNotes}
        placeholder="Problems"
        maxLength={5000}
        required
        onChange={(e) => setDeveloperNotes(e.target.value)}
      />
    </>
  );

  const returnSetState = () => {
    return (state == "Si" && (bugProp.state == "Asignado" || bugProp.state == "Reincidente"))? "En proceso" : (state == "No" && bugProp.state == "Asignado" || bugProp.state == "Reincidente")? "Rechazado" : (state == "Si" && bugProp.state == "En proceso")? "Solucionado" : ""
  }
  const onAddTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(state, developerNotes);

    if (state && developerNotes) {
      const newBug: IBug = {
        id: bugProp.id,
        projectId: bugProp.projectId,
        bugId: bugProp.bugId,
        title: bugProp.title,
        description: bugProp.description,
        date: bugProp.date,
        testerEmail: bugProp.testerEmail,
        taskId: bugProp.taskId,
        testerNotes: bugProp.testerNotes,
        lifecycle: bugProp.lifecycle,
        urls: [],
        scope: bugProp.scope,
        priority: bugProp.priority,
        importance: bugProp.importance,
        state: returnSetState(),
        conclusions: bugProp.conclusions,
        problems: bugProp.problems,
        reference: bugProp.reference,
        endDate: bugProp.endDate,
        developerEmail: bugProp.developerEmail,
        developerNotes: developerNotes,
      };
      dispatch(updateBugThunk(newBug));
      setInitialStateForm();
      setShow(false);
    } else {
      setTaskValidationModal(true);
    }
  };

  return (
    <>
      <Button className="w-100 my-2" variant="warning" onClick={handleShow}>
        Actualizar
      </Button>

      <Modal
        show={show}
        size="lg"
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Actualizar Bug</Modal.Title>
        </Modal.Header>
        <form onSubmit={(e) => onAddTask(e)}>
          <Modal.Body>
            {bugProp.state == "Asignado" || bugProp.state == "Reincidente" ? (
              asignadoDiv
            ) : bugProp.state == "En proceso" ? (
                enProcesoDiv
            ) : (
              <></>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            {(bugProp.state == "En proceso" && state == "Si") || bugProp.state == "Asignado" || bugProp.state == "Reincidente" ? (
              <Button type="submit" variant="primary">
              Save
            </Button>
            ) : (
              <></>
            )}
            <TaskValidationModal
              taskValidationModal={showTaskValidationModal}
              setTaskValidationModal={setTaskValidationModal}
            />
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default DevEditBugForm;
