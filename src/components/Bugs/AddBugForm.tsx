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
import { postBugThunk } from "../../services/bugsServices";
import { Button, Modal } from "react-bootstrap";

interface IAddBugFormProps {}

const AddBugForm: React.FunctionComponent<IAddBugFormProps> = (props) => {
  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const task = useSelector((state: RootState) => state.tempTask.task)

  const actualUser = useSelector(selectActualUser()) as IUser;

  const [initDate, setInitDate] = React.useState() as any;
  const [endDate, setEndDate] = React.useState() as any;

  const [bugTitle, setBugTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [taskState, setTaskState] = React.useState("");
  const [testerNotes, setTesterNotes] = React.useState("");
  const [bugLifecycle, setBugLifecycle] = React.useState("");
  const [scope, setScope] = React.useState("");
  const [importance, setImportance] = React.useState("");
  const [priority, setPriority] = React.useState("");
  const [conclusions, setConclusions] = React.useState("");
  const [problems, setProblems] = React.useState("");
  const [references, setReferences] = React.useState("");
  const [developerEmail, setDeveloperEmail] = React.useState("");
  const [developerNotes, setDeveloperNotes] = React.useState("");
  
  const setInitialStateForm = () => {
    setEndDate()
    setInitDate()
    setBugTitle("")
    setDescription("")
    setTaskState("")
    setTesterNotes("")
    setBugLifecycle("")
    setScope("")
    setImportance("")
    setPriority("")
    setConclusions("")
    setProblems("")
    setReferences("")
    setDeveloperEmail("")
    setDeveloperNotes("")
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

  let initStringDate = moment(initDate).format("YYYY-MM-DD");
  let initDateToString = moment(initStringDate, "YYYY-MM-DD").toDate();

  let endStringDate = moment(endDate).format("YYYY-MM-DD");
  let endDateToString = moment(endStringDate, "YYYY-MM-DD").toDate();

  const dispatch = useAppDispatch();

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
      references,
      developerEmail,
      developerNotes
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
      references &&
      developerEmail
    ) {
      const newBug: IBug = {
        projectId: task.projectId,
        bugId: Math.floor(Math.random() * 10000000) + "",
        title: bugTitle,
        description: description,
        date: initStringDate,
        testerEmail: actualUser.userEmail,
        taskId: task.taskId,
        testerNotes: testerNotes,
        lifecycle: bugLifecycle,
        urls: [],
        scope: scope,
        priority: priority,
        importance: importance,
        state: "Asignado",
        conclusions: conclusions,
        problems: problems,
        reference: references,
        endDate: endStringDate,
        developerEmail: developerEmail,
        developerNotes: "",
      };
      dispatch(postBugThunk(newBug));
      setInitialStateForm()
      setShow(false);
    } else {
      setTaskValidationModal(true);
    }
  };

  return (
    <>
      <Button onClick={handleShow}>Agregar Bug</Button>

      <Modal
        show={show}
        size="lg"
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Añade un nuevo Bug</Modal.Title>
        </Modal.Header>
        <form onSubmit={(e) => onAddTask(e)}>
          <Modal.Body>
            <div className="modalBody">
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

                <label>Fecha de informe</label>
                <DatePicker
                  className="form-control"
                  selected={initDate}
                  onChange={(date) => setInitDate(date)}
                  dateFormat="yyyy-MM-dd"
                  isClearable
                  required
                  placeholderText="Fecha de inicio"
                />

                <label>Correo del creador del bug</label>
                <input
                  className="form-control"
                  type="text"
                  value={actualUser.userEmail}
                  readOnly
                ></input>

                <label>Id de la Tarea</label>
                <input
                  className="form-control"
                  type="text"
                  value={task.taskId}
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
                    defaultValue="none"
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
                    defaultValue="none"
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
                    defaultValue="none"
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
                    defaultValue="none"
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

                <div className="form-group">
                  <label>Developer Encargado</label>
                  <br></br>
                  <select
                    className="custom-select form-control"
                    required
                    onChange={(e) => setDeveloperEmail(e.target.value)}
                    defaultValue="none"
                  >
                    <option value="none" disabled hidden>
                      Seleccione uno
                    </option>
                    {task.developerEmails.map((email: emailType, idx) => (
                      <option value={email.email} key={idx}>
                        {email.email}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
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

export default AddBugForm;
