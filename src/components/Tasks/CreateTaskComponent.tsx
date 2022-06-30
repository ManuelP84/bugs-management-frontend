import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import DatePicker from "react-datepicker"
import 'react-datepicker/dist/react-datepicker.css'
import { emailType, labelType, taskType } from "../../state/slice/taskSlice";
import { nanoid } from "@reduxjs/toolkit";
import moment from "moment";
import TaskValidationModal from "../TaskValidation/TaskValidationModal";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../state/store";
import { createNewTask } from "../../services/Tasks/createNewTask";


const CreateTaskComponent = () => {

    const project = useSelector((state: RootState) => state.tempProject)
    const projectToList = project.project

    const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

    const [inputLabel, setInputLabel] = useState('');
    const [inputEmail, setInputEmail] = useState('');
    const [labels, setLabels] = useState([] as labelType[])
    const [emails, setEmails] = useState([] as emailType[])
    const [initDate, setInitDate] = useState() as any;
    const [endDate, setEndDate] = useState() as any;
    const [emailValidation, setEmailValidation] = useState(true)

    const [nameTask, setNameTask] = useState('')
    const [description, setDescription] = useState('')
    const [taskState, setTaskState] = useState('')

    const [showTaskValidationModal, setTaskValidationModal] = useState(false)

    const navigate = useNavigate()

    const onChangeLabel = (e: { target: { value: any; }; }) => {
        const { value } = e.target;
        setInputLabel(value);
    };

    const onChangeEmail = (e: { target: { value: any; }; }) => {
        const { value } = e.target;
        setInputEmail(value);
    };

    const onKeyDownLabel = (e: { preventDefault?: any; key?: any; }) => {
        const { key } = e;
        const trimmedInput = inputLabel.trim();

        if (key === 'Enter' || key === ',' && trimmedInput.length) {
            e.preventDefault();
            const addLabel: labelType = {
                label: trimmedInput,
            }
            setLabels(prevState => [...prevState, addLabel]);
            setInputLabel('');

        }
    };

    function removeLabel(indexLabel: number) {
        const labelToEdit = [...labels]
        labelToEdit.splice(indexLabel, 1);
        setLabels(labelToEdit)
    }

    const onKeyDownEmail = (e: { preventDefault?: any; key?: any; }) => {
        const { key } = e;
        const trimmedInput = inputEmail.trim();
        if (key === 'Enter' || key === ',' && trimmedInput.length) {
            e.preventDefault();
            if (trimmedInput.match(regexEmail)) {
                const addEmail: emailType = {
                    email: trimmedInput,
                }
                setEmails(prevState => [...prevState, addEmail]);
                setInputEmail('');
                setEmailValidation(true)
            } else {
                setEmailValidation(false)
            }
        }
    };

    function removeEmail(indexEmail: number) {
        const emailToEdit = [...emails]
        emailToEdit.splice(indexEmail, 1);
        setEmails(emailToEdit)
    }

    let initStringDate = moment(initDate).format("YYYY/MM/DD")
    let initDateToString = moment(initStringDate, "YYYY/MM/DD").toDate();

    let endStringDate = moment(endDate).format("YYYY/MM/DD")
    let endDateToString = moment(endStringDate, "YYYY/MM/DD").toDate();

    const dispatch = useAppDispatch()

    const onAddTask = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (nameTask && initStringDate && description && taskState && emails.length > 0) {
            const addTask: taskType = {
                projectId: projectToList.projectId+'',
                taskId: Math.floor(Math.random()*10)+'',
                projectName: projectToList.name,
                name: nameTask,
                date: initStringDate,
                endDate: endStringDate,
                labels: labels,
                description: description,
                state: taskState,
                developerEmails: emails,
            }
            dispatch(createNewTask(addTask))
            navigate('/task-list')
        }
        else{
            setTaskValidationModal(true)
        }      
    }

    return (
        <div className="w-25 center">
            <form onSubmit={(e) => onAddTask(e)}>
                <label>Nombre de tarea</label>
                <input type="text" className="form-control" placeholder="Nombre de tarea" maxLength={50} required onChange={(e) => setNameTask(e.target.value)} />

                <label>Fecha de inicio</label>
                <DatePicker className="form-control"
                    selected={initDate}
                    onChange={date => setInitDate(date)}
                    isClearable
                    required
                    placeholderText="Fecha de inicio"
                />

                <label>Fecha de finalización</label>
                <DatePicker className="form-control"
                    selected={endDate}
                    onChange={date => setEndDate(date)}
                    isClearable
                    minDate={new Date()}
                    placeholderText="Fecha de finalización"
                />

                <div className="form-group">
                    <label>labels</label>
                    {labels.map((tags, indexTags) =>
                        <li className="label" key={nanoid()}>
                            <span>{tags.label}</span>
                            <span className="close" onClick={() => removeLabel(indexTags)}>&times;</span>
                        </li>)}
                    <input
                        maxLength={50}
                        className="form-control"
                        value={inputLabel}
                        placeholder="Ingrese tags relacionados con la tarea"
                        onKeyDown={onKeyDownLabel}
                        onChange={onChangeLabel}
                    />
                    <small>Oprima enter o ',' (coma) para agregar un label</small>
                </div>

                <label>Descripción</label>
                <textarea className="form-control" placeholder="Descripción" maxLength={100} required onChange={(e) => setDescription(e.target.value)} />

                <div className="form-group">
                    <label>Archivos adjuntos</label>
                    <input type="file" className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Estado de la tarea</label>
                    <br></br>
                    <select className="custom-select form-control" required onChange={(e) => setTaskState(e.target.value)}>
                        <option value="">Seleccione una opción</option>
                        <option value="Abierta">Abierta</option>
                        <option value="Cerrada">Cerrada</option>
                        <option value="Impedimento">Impedimento</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Email personas relacionadas</label>
                    {emails.map((emails, indexEmail) =>
                        <li className="email" key={nanoid()}>
                            <span>{emails.email}</span>
                            <span className="close" onClick={() => removeEmail(indexEmail)}>&times;</span>
                        </li>)}
                    <input
                        className="form-control"
                        value={inputEmail}
                        placeholder="Ingrese un email"
                        onKeyDown={onKeyDownEmail}
                        onChange={onChangeEmail}
                    />
                    <small hidden={emailValidation} className="text-danger">Debe ingresar un email valido</small>
                    <br hidden={emailValidation} />
                    <small>Oprima enter o ',' (coma) para agregar un correo</small>
                </div>
                <br />
                <button className="btn btn-primary" type="submit">Submit form</button>

            </form>
            <br></br>
            <button className="btn btn-secondary">
                <Link to='/task-list' className="text-decoration-none text-white">
                    Volver
                </Link>
            </button>

            <TaskValidationModal taskValidationModal={showTaskValidationModal} setTaskValidationModal={setTaskValidationModal} />

        </div>
    )
}

export default CreateTaskComponent