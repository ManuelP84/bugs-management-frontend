import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import PublicRoutes from "./PublicRoutes";
import "../../styles/login.css";
import "../../styles/bugs.css";
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
