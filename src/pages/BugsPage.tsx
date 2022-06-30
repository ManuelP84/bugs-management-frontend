import { nanoid } from '@reduxjs/toolkit';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import TasksTable from '../components/Table/ReactTable';
import { deleteBugThunk, getBugsByTaskIdThunk } from '../services/bugsServices';
import { selectBugsState } from '../state/slice/bugsSlice';
import { taskType } from '../state/slice/taskSlice';
import { RootState, useAppDispatch } from '../state/store';

export interface BugsPageProps {
}

const BugsPage: React.FunctionComponent<BugsPageProps> = () => {

  const dispatch = useAppDispatch()
  const task = useSelector((state: RootState) => state.bugs.actualTask) as taskType

  React.useEffect(() => { dispatch(getBugsByTaskIdThunk(task.id as string)) }, [dispatch])

  const getBugs = useSelector(selectBugsState())

  if (getBugs.length === 0) {
      return (
          <div>
              <h1 className="text-center">No Hay defectos para mostrar</h1>
              <div className="text-center">
                  <Link to='/create-task'>
                      <button className="btn btn-primary" >Agregar nueva Defecto</button>
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

  const onDelete = (id: string) =>{
      dispatch(deleteBugThunk(id))
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
          accessor: "taskName",
      },
      {
          Header: "Nombre",
          accessor: "title",
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
          Header: "Prioridad",
          id: "priority",
          accessor: (data: any) =>
              data.labels.map((item: any) => (
                  <div key={nanoid()}>
                      {item.label}
                  </div>
              ))
      },
      {
          Header: "Desarrollador asignado",
          id: "developerEmail",
          accessor: (data: any) =>
              data.developerEmails.map((item: any) => (
                  <div key={nanoid()}>
                      {item.email}
                  </div>
              ))
      },
      {
          Header: "Borrar",
          Cell: ({row}:any) => (
              <button className="btn btn-danger w-100 my-2"
                  type="button"
                  onClick={()=>onDelete(row.original.id)}>
                  Borrar
              </button>
          )
      },
  ]
  
  return (
      <div className="container m-4.text-center" >

          <h1 className="text-center">Lista de tareas, Proyecto: {task.name}</h1>
          <div className="text-center">
              <TasksTable
                  columns={columns}
                  data={getBugs}
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

export default BugsPage;
