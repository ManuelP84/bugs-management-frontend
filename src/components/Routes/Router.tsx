import * as React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "../../pages/Login";
import MainPage from "../../pages/MainPage";
import SingUpPage from "../../pages/SignUp";
import { RootState } from "../../state/store";
import PublicRoutes from "./PublicRoutes";
import "../../styles/login.css";
import ProjectPage from "../../pages/ProjectPage";
import DashboardPage from "../../pages/DashboardPage";
import { useSelector } from "react-redux";
import ListOfTasks from "../../pages/ListOfTasks/ListOfTask";
import DisplayTasks from "../../pages/DisplayTasks/DisplayTask";
import CreateTask from "../../pages/CreateTask/CreateTask";
import UpdateTask from "../../pages/UpdateTask/UpdateTask";



interface IRoutesProps { }

const Router: React.FunctionComponent<IRoutesProps> = () => {
    const logged: boolean = useSelector(
        (state: RootState) => state.login.isLogged
    );

  return (
    <div className="App">
      {logged ? (
        <Routes>
          <Route path="/main" element={<MainPage />} />
          <Route path="/project" element={<ProjectPage />} />
          <Route path="*" element={<MainPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path='/task-list' element={<ListOfTasks />} />
          <Route path='/task-detail' element={<DisplayTasks />} />
          <Route path='/create-task' element={<CreateTask />} />
          <Route path='/edit-task' element={<UpdateTask />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signUp" element={<SingUpPage />} />
          <Route path="*" element={<LoginPage />} />

        </Routes>
      )}
    </div>
  );
};

export default Router;
