import * as React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "../../pages/LoginPage";
import ProjectPage from "../../pages/ProjectPage";
import SingUpPage from "../../pages/SignUpPage";

interface IPublicRoutesProps {}

const PublicRoutes: React.FunctionComponent<IPublicRoutesProps> = (props) => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/signUp" element={<SingUpPage />} />      
      <Route path="/project" element={<ProjectPage />} />
    </Routes>
  );
};

export default PublicRoutes;
