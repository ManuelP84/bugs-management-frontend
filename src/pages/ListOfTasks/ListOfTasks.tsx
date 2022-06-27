import TasksTable from '../../components/Tasks/TableContainer'
import { Link } from "react-router-dom";

const ListOfTasks = () => {

    const data = [
        { "id": 1, "first_name": "Constantino", "last_name": "Clemencet", "email": "cclemencet0@canalblog.com", "gender": "Male", "ip_address": "70.195.157.24" },
        { "id": 2, "first_name": "Zoe", "last_name": "Trowill", "email": "ztrowill1@fc2.com", "gender": "Female", "ip_address": "119.95.63.100" },
        { "id": 3, "first_name": "Mollie", "last_name": "Rodgerson", "email": "mrodgerson2@lycos.com", "gender": "Female", "ip_address": "52.13.177.179" },
        { "id": 4, "first_name": "Anabel", "last_name": "Stoad", "email": "astoad3@state.gov", "gender": "Female", "ip_address": "161.64.181.48" },
        { "id": 5, "first_name": "Estevan", "last_name": "Sizland", "email": "esizland4@newyorker.com", "gender": "Male", "ip_address": "126.127.9.173" },
        { "id": 6, "first_name": "Karoly", "last_name": "Bowller", "email": "kbowller5@is.gd", "gender": "gender", "ip_address": "116.135.201.86" },
        { "id": 7, "first_name": "Duncan", "last_name": "Feldon", "email": "dfeldon6@sciencedirect.com", "gender": "Male", "ip_address": "255.187.99.82" },
        { "id": 8, "first_name": "Dicky", "last_name": "O'Spillane", "email": "dospillane7@istockphoto.com", "gender": "Male", "ip_address": "9.70.142.147" },
        { "id": 9, "first_name": "Natala", "last_name": "Oki", "email": "noki8@cam.ac.uk", "gender": "Non-binary", "ip_address": "178.143.7.86" },
        { "id": 10, "first_name": "Natividad", "last_name": "Wallwood", "email": "nwallwood9@redcross.org", "gender": "Female", "ip_address": "47.37.7.25" }, []
    ]

    const columns = [
        {
            Header: "First Name",
            accessor: "first_name",
            Cell: ({ row }) => (
                <Link to='/task-detail' state={{ taskDetail: row.original }}>
                    {row.original.first_name}
                </Link>
            )
        },
        {
            Header: "Last Name",
            accessor: "last_name",
        },
        {
            Header: "E-mail",
            accessor: "email",
        },
        {
            Header: "Ip Address",
            accessor: "ip_address",
        },
    ]

    return (
        <div className='main_content'>
            <h1>Hola desde la lista de tareas</h1>

            <div>
                <TasksTable
                    columns={columns}
                    data={data}
                />
            </div>
        </div>
    )
}

export default ListOfTasks