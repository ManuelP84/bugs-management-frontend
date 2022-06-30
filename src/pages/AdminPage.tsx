import * as React from "react";
import { useSelector } from "react-redux";
import SelectRolForm from "../components/Admin/SelectRolForm";
import TasksTable from "../components/Table/ReactTable";
import { getAllUsersThunk } from "../services/loginServices";
import { IUser, selectUserList } from "../state/slice/loginSlice";
import { RootState, store, useAppDispatch } from "../state/store";

interface IAdminPageProps {}

const AdminPage: React.FunctionComponent<IAdminPageProps> = () => {
  const dispatch = useAppDispatch();
  const data = useSelector((state: RootState) => state.login.users);
  const columns = [
    {
      Header: "Email",
      accessor: "userEmail",
    },
    {
      Header: "Nombre",
      accessor: "userName",
    },
    {
      Header: "Rol Actual",
      accessor: "userRol",
    },
    {
      Header: " ",
      Cell: ({ row }: any) => <SelectRolForm user={row.original} dispatch={dispatch} />,
    },
  ];

  return (
    <div className="container m-4.text-center">
      <h1 className="text-center">Admin Panel, Proyecto X</h1>
      <div className="text-center">
        <TasksTable columns={columns} data={data} />
      </div>
      <br />
    </div>
  );
};

export default AdminPage;
