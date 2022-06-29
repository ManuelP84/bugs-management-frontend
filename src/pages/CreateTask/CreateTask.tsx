import { useState } from "react";
import { Link } from "react-router-dom"
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { emailType, labelType } from "../../state/slice/taskSlice";
import { nanoid } from "@reduxjs/toolkit";
import moment from "moment";

const CreateTask = () => {

    const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

    const [inputLabel, setInputLabel] = useState('');
    const [inputEmail, setInputEmail] = useState('');
    const [labels, setLabels] = useState([] as labelType[])
    const [emails, setEmails] = useState([] as emailType[]) 
    const [initDate, setInitDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [emailValidation, setEmailValidation] = useState(true)
    

    const onChangeLabel = (e) => {
        const { value } = e.target;
        setInputLabel(value);
    };

    const onChangeEmail = (e) => {
        const { value } = e.target;
        setInputEmail(value);
    };

    const onKeyDownLabel = (e) => {
        const { key } = e;
        const trimmedInput = inputLabel.trim();

        if (key === 'Enter' || key === ',' && trimmedInput.length && !labels.includes(trimmedInput)) {
            e.preventDefault();
            const addLabel: labelType ={
                id: nanoid(),
                label: trimmedInput,
            }
            setLabels(prevState => [...prevState, addLabel]);
            setInputLabel('');

        }
    };

    const onKeyDownEmail = (e) => {
        const { key } = e;
        const trimmedInput = inputEmail.trim();
        if (key === 'Enter' || key === ',' && trimmedInput.length && !emails.includes(trimmedInput)) {
            e.preventDefault();
            if (trimmedInput.match(regexEmail)) {
                const addEmail: emailType = {
                    id: nanoid(),
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

    return (
        <div className="w-25 center">
            <form>
                <label>Nombre de tarea</label>
                <input type="text" className="form-control" placeholder="Nombre de tarea" required />

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
                    {labels.map((tag) => <li className="label" key={tag.id}>{tag.label}</li>)}
                    <input
                        className="form-control"
                        value={inputLabel}
                        placeholder="Ingrese tags relacionados con la tarea"
                        onKeyDown={onKeyDownLabel}
                        onChange={onChangeLabel}
                    />
                    <small>Oprima enter o ',' (coma) para agregar un label</small>
                </div>

                <label>Descripción</label>
                <textarea className="form-control" placeholder="Descripción" required />

                <div className="form-group">
                    <label>Archivos adjuntos</label>
                    <input type="file" className="form-control" placeholder="Enter email" />
                </div>
                <div className="form-group">
                    <label>Estado de la tarea</label>
                    <br></br>
                    <select className="custom-select form-control" required>
                        <option value="">Seleccione una opción</option>
                        <option value="Abierta">Abierta</option>
                        <option value="Cerrada">Cerrada</option>
                        <option value="Impedimento">Impedimento</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Email personas relacionadas</label>
                    {emails.map((emails) => <li className="email" key={emails.id}>{emails.email}</li>)}
                    <input
                        className="form-control"
                        value={inputEmail}
                        placeholder="Ingrese un email"
                        onKeyDown={onKeyDownEmail}
                        onChange={onChangeEmail}
                    />
                    <small hidden={emailValidation} className="text-danger">Debe ingresar un email valido</small>
                    <br hidden={emailValidation}/>
                    <small>Oprima enter o ',' (coma) para agregar un correo</small>
                </div>
                <br />
                <button className="btn btn-primary" type="submit">Submit form</button>
            </form>
            <button className="btn btn-secondary">
                <Link to='/' className="text-decoration-none text-white">
                    Volver
                </Link>
            </button>
        </div>
    )
}

export default CreateTask