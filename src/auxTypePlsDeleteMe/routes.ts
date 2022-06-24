import { Route, Routes } from 'react-router-dom';

export default function RoutesSite() {
    return (
        <Routes>
            <Route path= '/Bills' element = {< Bills />} />
        </Routes>
        )
}