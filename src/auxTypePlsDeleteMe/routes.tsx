import { Route, Routes } from 'react-router-dom';
import CreateTask from '../pages/CreateTask/CreateTask';
import DisplayTasks from '../pages/DisplayTasks/DisplayTasks';
import ListOfTasks from '../pages/ListOfTasks/ListOfTasks';
import ProjectPage from '../pages/ProjectPage';
import UpdateTask from '../pages/UpdateTask/UpdateTask';

export default function RoutesSite() {
    return (
        <Routes>
            <Route path='/task-list' element={<ListOfTasks />}/>
            <Route path='/task-detail' element={<DisplayTasks />}/>
            <Route path='/create-task' element={<CreateTask />}/>
            <Route path='/edit-task' element={<UpdateTask />}/>
            <Route path='/projects' element={<ProjectPage />}/>

        </Routes>
        )
} 