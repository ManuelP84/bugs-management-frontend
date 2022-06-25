import { Route, Routes } from 'react-router-dom';
import ListOfTasks from '../pages/ListOfTasks/ListOfTasks';

export default function RoutesSite() {
    return (
        <Routes>
            <Route path='/' element={<ListOfTasks />} />
        </Routes>
            
        )
}