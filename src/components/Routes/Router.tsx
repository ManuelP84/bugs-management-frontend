import * as React from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import MainPage from "../../pages/MainPage";
import { RootState } from "../../state/store";
import PublicRoutes from "./PublicRoutes";
import "../../styles/login.css";
import ProjectPage from "../../pages/ProjectPage";
import AdminPage from "../../pages/AdminPage";
import BugsPage from "../../pages/BugsPage";
import ListOfTasks from "../../pages/ListOfTasks/ListOfTasks";
import CreateTask from "../../pages/CreateTask/CreateTask";
import UpdateTask from "../../pages/UpdateTask/UpdateTask";
import DisplayTasks from "../../pages/DisplayTasks/DisplayTasks";
import DashboardPage from "../../pages/DashboardPage";
import { selectActualUser } from "../../state/slice/loginSlice";
import AdminRoutes from "./AdminRoutes";
import UsersRoutes from "./UsersRoutes";


interface IRoutesProps { }

const Router: React.FunctionComponent<IRoutesProps> = () => {
    const logged: boolean = useSelector(
        (state: RootState) => state.login.isLogged
    );
    const user = useSelector(selectActualUser())

  return (
    <div className="App">
      {logged && user?.userRol == "Admin" ? (
        <AdminRoutes />
      )
       : logged && user?.userRol != "Admin" ?(
        <UsersRoutes />
       )
       : (
        <PublicRoutes />
      )}
    </div>
  );
};

export default Router;
