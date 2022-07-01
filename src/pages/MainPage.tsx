import * as React from 'react';
import { useDispatch } from 'react-redux';
import { logOut } from '../state/slice/loginSlice';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface IMainPageProps {
}

const MainPage: React.FunctionComponent<IMainPageProps> = (props) => {

  const navigate = useNavigate();

  useEffect(() => {

    navigate("/dashboard")
    
  }, []);


  return(
    <div>
  
    </div>
    )    
};

export default MainPage;
