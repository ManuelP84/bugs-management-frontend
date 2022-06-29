import * as React from 'react';
import { useDispatch } from 'react-redux';
import { logOut } from '../state/slice/loginSlice';

interface IMainPageProps {
}

const MainPage: React.FunctionComponent<IMainPageProps> = (props) => {

  const dispatch = useDispatch()

  const handleLogOut = () => {
    dispatch(logOut())
  }

  return <div>
    Hello from inside
    <button onClick={handleLogOut}> Log out </button>
  </div>
};

export default MainPage;
