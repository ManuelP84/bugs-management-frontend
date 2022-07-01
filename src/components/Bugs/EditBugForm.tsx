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
import { updateBugThunk } from "../../services/bugsServices";
import { Button, Modal } from "react-bootstrap";

interface IEditBugFormProps {
  bugProp: IBug;
}

const EditBugForm: React.FunctionComponent<IEditBugFormProps> = ({
  bugProp,
}) => {
  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  const actualUser = useSelector(selectActualUser()) as IUser;
  const task = useSelector(
    (state: RootState) => state.tempTask.task
  ) as taskType;

  const [endDate, setEndDate] = React.useState() as any;

  const [bugTitle, setBugTitle] = React.useState(bugProp.title);
  const [description, setDescription] = React.useState(bugProp.description);
  const [testerNotes, setTesterNotes] = React.useState(bugProp.testerNotes);
  const [bugLifecycle, setBugLifecycle] = React.useState(bugProp.lifecycle);
  const [scope, setScope] = React.useState(bugProp.scope);
  const [importance, setImportance] = React.useState(bugProp.importance);
  const [priority, setPriority] = React.useState(bugProp.priority);
  const [conclusions, setConclusions] = React.useState(bugProp.conclusions);
  const [problems, setProblems] = React.useState(bugProp.problems);
  const [references, setReferences] = React.useState(bugProp.reference);
  const [state, setState] = React.useState<String>();

  const setInitialStateForm = () => {
    setEndDate();
    setBugTitle("");
    setDescription("");
    setTesterNotes("");
    setBugLifecycle("");
    setScope("");
    setImportance("");
    setPriority("");
    setConclusions("");
    setProblems("");
    setReferences("");
  };

  const lifecycleTypes = [
    "Planificación",
    "Análisis",
    "Diseño",
    "Implementación",
    "Pruebas",
    "Despliegue",
    "Uso",
    "Mantenimiento",
  ];

  const severityTypes = ["Bajo", "Medio", "Alto"];

  const [showTaskValidationModal, setTaskValidationModal] =
    React.useState(false);

  let endStringDate = moment(endDate).format("YYYY-MM-DD");
  let endDateToString = moment(endStringDate, "YYYY-MM-DD").toDate();

  const dispatch = useAppDispatch();
  const radioHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState(event.target.value);
  };

  const onAddTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(
      bugTitle,
      description,
      testerNotes,
      bugLifecycle,
      scope,
      priority,
      importance,
      conclusions,
      problems,
      references
    );

    if (
      bugTitle &&
      description &&
      testerNotes &&
      bugLifecycle &&
      scope &&
      priority &&
      importance &&
      conclusions &&
      problems &&
      references
    ) {
      const newBug: IBug = {
        id: bugProp.id,
        projectId: bugProp.projectId,
        bugId: Math.floor(Math.random() * 10000000) + "",
        title: bugTitle,
        description: description,
        date: bugProp.date,
        testerEmail: bugProp.testerEmail,
        taskId: bugProp.taskId,
        testerNotes: testerNotes,
        lifecycle: bugLifecycle,
        urls: [],
        scope: scope,
        priority: priority,
        importance: importance,
        state: state as string,
        conclusions: conclusions,
        problems: problems,
        reference: references,
        endDate: endStringDate,
        developerEmail: bugProp.developerEmail,
        developerNotes: bugProp.developerNotes,
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
            <div className="modalFormBody">
              <div className="inputFormDiv">
                <label>Titulo</label>
                <input
                  type="text"
                  value={bugTitle}
                  className="form-control"
                  placeholder="Titulo del Bug"
                  maxLength={50}
                  required
                  onChange={(e) => setBugTitle(e.target.value)}
                />

                <label>Descripción</label>
                <textarea
                  className="form-control"
                  value={description}
                  placeholder="Descripción"
                  maxLength={500}
                  required
                  onChange={(e) => setDescription(e.target.value)}
                />

                <label>Correo del creador del bug</label>
                <input
                  className="form-control"
                  type="text"
                  value={bugProp.testerEmail}
                  readOnly
                ></input>

                <label>Id de la Tarea</label>
                <input
                  className="form-control"
                  type="text"
                  value={bugProp.taskId}
                  readOnly
                ></input>

                <label>Notas del Tester</label>
                <textarea
                  className="form-control"
                  value={testerNotes}
                  placeholder="Tester Notes"
                  maxLength={1000}
                  required
                  onChange={(e) => setTesterNotes(e.target.value)}
                />

                <div className="form-group">
                  <label>
                    Fase del ciclo de vida en la que se observo el bug
                  </label>
                  <br></br>
                  <select
                    className="custom-select form-control"
                    required
                    onChange={(e) => setBugLifecycle(e.target.value)}
                    defaultValue={bugLifecycle}
                  >
                    <option value="none" disabled hidden>
                      Selecciona una fase
                    </option>
                    {lifecycleTypes.map((type: string, idx) => (
                      <option value={type} key={idx}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Archivos adjuntos</label>
                  <input
                    type="file"
                    className="form-control"
                    placeholder="Enter email"
                  />
                </div>

                <div className="form-group">
                  <label>Alcance o grado de impacto</label>
                  <br></br>
                  <select
                    className="custom-select form-control"
                    required
                    onChange={(e) => setScope(e.target.value)}
                    defaultValue={scope}
                  >
                    <option value="none" disabled hidden>
                      Seleccione uno
                    </option>
                    {severityTypes.map((type: string, idx) => (
                      <option value={type} key={idx}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Urgencia / Prioridad para arreglar</label>
                  <br></br>
                  <select
                    className="custom-select form-control"
                    required
                    onChange={(e) => setPriority(e.target.value)}
                    defaultValue={priority}
                  >
                    <option value="none" disabled hidden>
                      Seleccione uno
                    </option>
                    {severityTypes.map((type: string, idx) => (
                      <option value={type} key={idx}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Importancia al usuario / cliente</label>
                  <br></br>
                  <select
                    className="custom-select form-control"
                    required
                    onChange={(e) => setImportance(e.target.value)}
                    defaultValue={importance}
                  >
                    <option value="none" disabled hidden>
                      Seleccione uno
                    </option>
                    {severityTypes.map((type: string, idx) => (
                      <option value={type} key={idx}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <label>Conclusiones y Recomendaciones</label>
                <textarea
                  className="form-control"
                  value={conclusions}
                  placeholder="Conclusions"
                  maxLength={5000}
                  required
                  onChange={(e) => setConclusions(e.target.value)}
                />

                <label>Problemas Globales</label>
                <textarea
                  className="form-control"
                  value={problems}
                  placeholder="Problems"
                  maxLength={5000}
                  required
                  onChange={(e) => setProblems(e.target.value)}
                />

                <label>Referencias</label>
                <textarea
                  className="form-control"
                  value={references}
                  placeholder="References"
                  maxLength={500}
                  required
                  onChange={(e) => setReferences(e.target.value)}
                />
              </div>
              <label>Notas del Desarrollador</label>
              <textarea
                className="form-control"
                value={bugProp.developerNotes}
                placeholder="Problems"
                maxLength={5000}
                readOnly
              />
              <div className="container">
                <fieldset>
                  <legend>¿Como deseas proceder con el bug?</legend>
                  <p>
                    <input
                      type="radio"
                      name="drink"
                      value="Cerrado"
                      id="Cerrado"
                      onChange={radioHandler}
                    />
                    <label htmlFor="Cerrado">Cerrar</label>
                  </p>

                  <p>
                    <input
                      type="radio"
                      name="drink"
                      value="Cerrado con defectos"
                      id="Cerrado con defectos"
                      onChange={radioHandler}
                    />
                    <label htmlFor="Cerrado con defectos">
                      Cerrar con defectos
                    </label>
                  </p>

                  <p>
                    <input
                      type="radio"
                      name="drink"
                      value="Reincidente"
                      id="Reincidente"
                      onChange={radioHandler}
                    />
                    <label htmlFor="Reincidente">Reincidir</label>
                  </p>
                </fieldset>
              </div>
              {state == "Cerrado" || state == "Cerrado con defectos" ? (
                <div className="form-group">
                  <label>Fecha de cierre</label>
                  <DatePicker
                    className="form-control"
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    isClearable
                    dateFormat="yyyy-MM-dd"
                    minDate={new Date()}
                    placeholderText="Fecha de finalización"
                  />
                </div>
              ) : (
                <></>
              )}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Save
            </Button>
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

export default EditBugForm;
