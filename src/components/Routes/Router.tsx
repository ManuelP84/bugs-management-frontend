import * as React from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import LoginPage from "../../pages/Login";
import MainPage from "../../pages/MainPage";
import SingUpPage from "../../pages/SignUp";
import { RootState } from "../../state/store";
import PublicRoutes from "./PublicRoutes";
import "../../styles/login.css";


interface IRoutesProps {}
  
const Router: React.FunctionComponent<IRoutesProps> = () => {
  const logged: boolean = useSelector(
    (state: RootState) => state.login.isLogged
  );

  return (
    <div className="App">
      {logged ? (
        <Routes>
          <Route path="/main" element={<MainPage />} />
          <Route path="*" element={<MainPage />} />
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
