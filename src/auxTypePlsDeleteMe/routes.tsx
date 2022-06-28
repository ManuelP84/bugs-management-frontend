import { Route, Routes } from 'react-router-dom';
import DisplayTasks from '../pages/DisplayTasks/DisplayTasks';
import ListOfTasks from '../pages/ListOfTasks/ListOfTasks';

export default function RoutesSite() {
    return (
        <Routes>
            <Route path='/' element={<ListOfTasks />}/>
            <Route path='/task-detail' element={<DisplayTasks />}/>
        </Routes>
            
        )
} 