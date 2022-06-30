import * as React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "../../pages/Login";
import SingUpPage from "../../pages/SignUp";
import ProjectPage from "../../pages/ProjectPage";
import MainPage from "../../pages/MainPage";
import AdminPage from "../../pages/AdminPage";
import BugsPage from "../../pages/BugsPage";
import DashboardPage from "../../pages/DashboardPage";
import ListOfTasks from "../../pages/ListOfTasks/ListOfTasks";
import DisplayTasks from "../../pages/DisplayTasks/DisplayTasks";
import CreateTask from "../../pages/CreateTask/CreateTask";
import UpdateTask from "../../pages/UpdateTask/UpdateTask";
import AddBugForm from "../Bugs/AddBugForm";


interface IAdminRoutesProps {}

const AdminRoutes: React.FunctionComponent<IAdminRoutesProps> = (props) => {
  return (
    <Routes>
          <Route path="/main" element={<MainPage />} />
          <Route path="/project" element={<ProjectPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/bugs" element={<BugsPage />} />
          <Route path="/addbug" element={<AddBugForm />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path='/task-list' element={<ListOfTasks />} />
          <Route path='/task-detail' element={<DisplayTasks />} />
          <Route path='/create-task' element={<CreateTask />} />
          <Route path='/edit-task' element={<UpdateTask />} />
          <Route path="*" element={<MainPage />} />
    </Routes>
  );
};

export default AdminRoutes;
