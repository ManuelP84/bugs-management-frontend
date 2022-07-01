import moment from "moment";
import * as React from "react";
import { useSelector } from "react-redux";
import { createNewTask } from "../../services/Tasks/createNewTask";
import { IUser, selectActualUser } from "../../state/slice/loginSlice";
import { emailType, labelType, taskType } from "../../state/slice/taskSlice";
import { RootState, useAppDispatch } from "../../state/store";
import DatePicker from "react-datepicker";
import { nanoid } from "@reduxjs/toolkit";
import { Link } from "react-router-dom";
import TaskValidationModal from "../TaskValidation/TaskValidationModal";

interface IAddBugFormProps {}

const AddBugForm: React.FunctionComponent<IAddBugFormProps> = (props) => {
  const project = useSelector((state: RootState) => state.tempProject);
  const projectToList = project.project;
  const task = useSelector(
    (state: RootState) => state.bugs.actualTask
  ) as taskType;
  const actualUser = useSelector(selectActualUser()) as IUser;

  const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  const [inputLabel, setInputLabel] = React.useState("");
  const [inputEmail, setInputEmail] = React.useState("");
  const [labels, setLabels] = React.useState([] as labelType[]);
  const [emails, setEmails] = React.useState([] as emailType[]);
  const [initDate, setInitDate] = React.useState() as any;
  const [endDate, setEndDate] = React.useState() as any;
  const [emailValidation, setEmailValidation] = React.useState(true);

  const [bugTitle, setBugTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [taskState, setTaskState] = React.useState("");
  const [testerNotes, setTesterNotes] = React.useState("");
  const [bugLifecycle, setBugLifecycle] = React.useState("");
  const [scope, setScope] = React.useState("");


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

  const severityTypes = [
  "Bajo",
  "Medio",
  "Alto"  
  ]

  const [showTaskValidationModal, setTaskValidationModal] =
    React.useState(false);

  const onChangeLabel = (e: { target: { value: any } }) => {
    const { value } = e.target;
    setInputLabel(value);
  };

  const onChangeEmail = (e: { target: { value: any } }) => {
    const { value } = e.target;
    setInputEmail(value);
  };

  const onKeyDownLabel = (e: { preventDefault?: any; key?: any }) => {
    const { key } = e;
    const trimmedInput = inputLabel.trim();

    if (key === "Enter" || (key === "," && trimmedInput.length)) {
      e.preventDefault();
      const addLabel: labelType = {
        label: trimmedInput,
      };
      setLabels((prevState) => [...prevState, addLabel]);
      setInputLabel("");
    }
  };

  function removeLabel(indexLabel: number) {
    const labelToEdit = [...labels];
    labelToEdit.splice(indexLabel, 1);
    setLabels(labelToEdit);
  }

  const onKeyDownEmail = (e: { preventDefault?: any; key?: any }) => {
    const { key } = e;
    const trimmedInput = inputEmail.trim();
    if (key === "Enter" || (key === "," && trimmedInput.length)) {
      e.preventDefault();
      if (trimmedInput.match(regexEmail)) {
        const addEmail: emailType = {
          email: trimmedInput,
        };
        setEmails((prevState) => [...prevState, addEmail]);
        setInputEmail("");
        setEmailValidation(true);
      } else {
        setEmailValidation(false);
      }
    }
  };

  function removeEmail(indexEmail: number) {
    const emailToEdit = [...emails];
    emailToEdit.splice(indexEmail, 1);
    setEmails(emailToEdit);
  }

  let initStringDate = moment(initDate).format("YYYY/MM/DD");
  let initDateToString = moment(initStringDate, "YYYY/MM/DD").toDate();

  let endStringDate = moment(endDate).format("YYYY/MM/DD");
  let endDateToString = moment(endStringDate, "YYYY/MM/DD").toDate();

  const dispatch = useAppDispatch();

  const onAddTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      bugTitle &&
      initStringDate &&
      labels.length > 0 &&
      description &&
      taskState &&
      emails.length > 0
    ) {
      const addTask: taskType = {
        projectId: projectToList.projectId + "",
        taskId: Math.floor(Math.random() * 100000000) + "",
        name: bugTitle,
        date: initStringDate,
        projectName: projectToList.name,
        endDate: endStringDate,
        labels: labels,
        description: description,
        state: taskState,
        developerEmails: emails,
      };

      dispatch(createNewTask(addTask));
    } else {
      setTaskValidationModal(true);
    }
  };

  return (
    <div className="w-25 center">
      <form onSubmit={(e) => onAddTask(e)}>
        <label>Titulo</label>
        <input
          type="text"
          value={bugTitle}
          className="form-control"
          placeholder="Nombre de tarea"
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
          placeholder="Descripción"
          maxLength={1000}
          required
          onChange={(e) => setTesterNotes(e.target.value)}
        />

        <div className="form-group">
          <label>Fase del ciclo de vida en la que se observo el bug</label>
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
            {lifecycleTypes.map((type: string) => (
              <option value="type">{type}</option>
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
            onChange={(e) => setBugLifecycle(e.target.value)}
            defaultValue="none"
          >
            <option value="none" disabled hidden>
              Seleccione uno
            </option>
            {severityTypes.map((type: string) => (
              <option value="type">{type}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Urgencia / Prioridad para arreglar</label>
          <br></br>
          <select
            className="custom-select form-control"
            required
            onChange={(e) => setBugLifecycle(e.target.value)}
            defaultValue="none"
          >
            <option value="none" disabled hidden>
              Seleccione uno
            </option>
            {severityTypes.map((type: string) => (
              <option value="type">{type}</option>
            ))}
          </select>
        </div>

        <label>Fecha de finalización</label>
        <DatePicker
          className="form-control"
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          isClearable
          minDate={new Date()}
          placeholderText="Fecha de finalización"
        />

        <div className="form-group">
          <label>labels</label>
          {labels.map((tags, indexTags) => (
            <li className="label" key={nanoid()}>
              <span>{tags.label}</span>
              <span className="close" onClick={() => removeLabel(indexTags)}>
                &times;
              </span>
            </li>
          ))}
          <input
            className="form-control"
            value={inputLabel}
            placeholder="Ingrese tags relacionados con la tarea"
            onKeyDown={onKeyDownLabel}
            onChange={onChangeLabel}
          />
          <small>Oprima enter o ',' (coma) para agregar un label</small>
        </div>

        <div className="form-group">
          <label>Estado de la tarea</label>
          <br></br>
          <select
            className="custom-select form-control"
            required
            onChange={(e) => setTaskState(e.target.value)}
          >
            <option value="">Seleccione una opción</option>
            <option value="Abierta">Abierta</option>
            <option value="Cerrada">Cerrada</option>
            <option value="Impedimento">Impedimento</option>
          </select>
        </div>

        <div className="form-group">
          <label>Email personas relacionadas</label>
          {emails.map((emails, indexEmail) => (
            <li className="email" key={nanoid()}>
              <span>{emails.email}</span>
              <span className="close" onClick={() => removeEmail(indexEmail)}>
                &times;
              </span>
            </li>
          ))}
          <input
            className="form-control"
            value={inputEmail}
            placeholder="Ingrese un email"
            onKeyDown={onKeyDownEmail}
            onChange={onChangeEmail}
          />
          <small hidden={emailValidation} className="text-danger">
            Debe ingresar un email valido
          </small>
          <br hidden={emailValidation} />
          <small>Oprima enter o ',' (coma) para agregar un correo</small>
        </div>
        <br />
        <Link to="/task-list" className="text-decoration-none text-white">
          <button className="btn btn-primary" type="submit">
            Submit form
          </button>
        </Link>
      </form>
      <br></br>
      <button className="btn btn-secondary">
        <Link to="/task-list" className="text-decoration-none text-white">
          Volver
        </Link>
      </button>

      <TaskValidationModal
        taskValidationModal={showTaskValidationModal}
        setTaskValidationModal={setTaskValidationModal}
      />
    </div>
  );
};

export default AddBugForm;
