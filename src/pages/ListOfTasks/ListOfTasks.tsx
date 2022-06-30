import TasksTable from '../../components/Table/ReactTable'
import { Link, useLocation } from "react-router-dom";
import { selectTasksState, taskType } from '../../state/slice/taskSlice';
import { projectType } from '../../state/slice/projectSlice';
import { useEffect } from 'react';
import { getTasksByProjectId } from '../../services/Tasks/getTasksByProjectId';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../state/store';
import { nanoid } from '@reduxjs/toolkit';
import { deleteTask } from '../../services/Tasks/deleteTask';

const ListOfTasks = () => {

    const project = useSelector((state: RootState) => state.tempProject)
    const projectToList = project.project

    const dispatch = useAppDispatch()

    useEffect(() => { dispatch(getTasksByProjectId(projectToList)) }, [dispatch])

    const getTasks = useSelector(selectTasksState())

    if (getTasks.length === 0) {
        return (
            <div>
                <h1 className="text-center">No Hay tareas para mostrar</h1>
                <div className="text-center">
                    <Link to='/create-task'>
                        <button className="btn btn-primary" >Agregar nueva Tarea</button>
                    </Link>
                </div>
                <div className="text-center">
                    <Link to='/projects'>
                        <button className="btn btn-secondary" >Volver</button>
                    </Link>
                </div>
            </div>
        )
    }

    const onDelete = (props: taskType) =>{
        dispatch(deleteTask(props))
    }

    const columns = [
        {
            Header: "Id",
            Cell: ({ row }: any) => (
                <Link key={nanoid()} to='/task-detail' state={{ taskDetail: row.original }}>
                    {row.original.taskId}
                </Link>
            )
        },
        {
            Header: "Nombre de Proyecto",
            accessor: "projectName",
        },
        {
            Header: "Nombre",
            accessor: "name",
        },
        {
            Header: "Fecha de creacion",
            accessor: "date",
        },
        {
            Header: "Fecha de cierre",
            accessor: "endDate",
            Cell: ({ cell: { value } }: any) => value || "-",
        },
        {
            Header: "Estado",
            accessor: "state",
        },
        {
            Header: "Tags",
            id: "tags",
            accessor: (data: any) =>
                data.labels.map((item: any) => (
                    <div key={nanoid()}>
                        {item.label}
                    </div>
                ))
        },
        {
            Header: "Desarrollador asignado",
            id: "developerEmails",
            accessor: (data: any) =>
                data.developerEmails.map((item: any) => (
                    <div key={nanoid()}>
                        {item.email}
                    </div>
                ))
        },
        {
            Header: "Borrar",
            Cell: ({row}) => (
                <button className="btn btn-danger w-100 my-2"
                    type="button"
                    onClick={()=>onDelete(row.original)}>
                    Borrar
                </button>
            )
        },
    ]

    return (
        <div className="container m-4.text-center" >

            <h1 className="text-center">Lista de tareas, Proyecto: {projectToList.name}</h1>
            <div className="text-center">
                <TasksTable
                    columns={columns}
                    data={getTasks}
                />
            </div>
            <br />
            <div className="text-center">
                <Link to='/create-task'>
                    <button className="btn btn-primary" >Agregar nueva Tarea</button>
                </Link>
            </div>
            <div className="text-center">
                <Link to='/projects'>
                    <button className="btn btn-secondary" >Volver</button>
                </Link>
            </div>
        </div>
    )
}

export default ListOfTasks