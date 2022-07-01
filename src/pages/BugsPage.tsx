import { nanoid } from "@reduxjs/toolkit";
import * as React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AddBugForm from "../components/Bugs/AddBugForm";
import BugDetail from "../components/Bugs/BugDetail";
import DevEditBugForm from "../components/Bugs/DevEditBugForm";
import EditBugForm from "../components/Bugs/EditBugForm";
import TasksTable from "../components/Table/ReactTable";
import { deleteBugThunk, getBugsByTaskIdThunk } from "../services/bugsServices";
import { selectBugsState } from "../state/slice/bugsSlice";
import { IUser, selectActualUser } from "../state/slice/loginSlice";
import { taskType } from "../state/slice/taskSlice";
import { RootState, useAppDispatch } from "../state/store";

export interface BugsPageProps {}

const BugsPage: React.FunctionComponent<BugsPageProps> = () => {
  const dispatch = useAppDispatch();
  const task = useSelector((state: RootState) => state.tempTask.task) as taskType;
  const actualUser = useSelector(selectActualUser()) as IUser;

  React.useEffect(() => {
    dispatch(getBugsByTaskIdThunk(task.taskId as string));
  }, [dispatch]);

  const getBugs = useSelector(selectBugsState());

  if (getBugs.length === 0) {
    return (
      <div>
        <h1 className="text-center">No hay bugs para mostrar</h1>
        <div className="text-center">
          <Link to="/addbug">
            <button className="btn btn-primary">Agregar nuevo Bug</button>
          </Link>
        </div>
        <div className="text-center">
          <Link to="/task-list">
            <button className="btn btn-secondary">Volver</button>
          </Link>
        </div>
      </div>
    );
  }

  const onDelete = (id: string) => {
    dispatch(deleteBugThunk(id));
  };

  const columns = [
    {
      Header: "Id",
      Cell: ({ row }: any) => <BugDetail bugProp={row.original} />,
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
      accessor: "priority",
    },
    {
      Header: "Desarrollador asignado",
      id: "developerEmail",
      accessor: "developerEmail",
    },
    {
      Header: "Editar",
      Cell: ({ row }: any) => (actualUser.userRol == "Admin" ||
      actualUser.userRol == "Tester") ? <EditBugForm bugProp={row.original} /> : (actualUser.userRol == "Developer") ? <DevEditBugForm bugProp={row.original} /> : <></>
    },
     {
      Header: "Borrar",
      Cell: ({ row }: any) => (
        (actualUser.userRol == "Admin" || actualUser.userRol == "Tester") &&<button
          className="btn btn-danger w-100 my-2"
          type="button"
          onClick={() => onDelete(row.original.bugId)}
        >
          Borrar
        </button>
      ),
    }
  ];

  return (
    <div className="container">
      <h2 className="bugsPageTitle">Lista de bugs</h2>
      <h5 className="bugsPageTitle">Tarea: {task.name}</h5>
      <div className="text-center bugTableDiv">
        <TasksTable columns={columns} data={(actualUser.userRol == "Developer") ? getBugs.filter(bug => bug.developerEmail == actualUser.userEmail  ) : getBugs} />
      </div>
      <div className="bugsPageButtons">
        {(actualUser.userRol == "Admin" || actualUser.userRol == "Tester")&&<AddBugForm />}

        <button
          onClick={() => {
            window.history.back();
          }}
          className="btn btn-secondary"
        >
          Volver
        </button>
      </div>
    </div>
  );
};

export default BugsPage;
