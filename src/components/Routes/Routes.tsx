import * as React from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import MainPage from '../../pages/MainPage';
import { RootState } from '../../state/store';
import PublicRoutes from './PublicRoutes';

interface IRoutesProps {
}

const Routes: React.FunctionComponent<IRoutesProps> = (props) => {
    const login = useSelector((state: RootState) => state.login);

    return (
      <div className="App">
        {login.user!=null ? (
          <Routes>
            <Route path="/" element={<MainPage />} />
          </Routes>
        ) : (
            <PublicRoutes />
        )}
      </div>
    );
};

export default Routes;
