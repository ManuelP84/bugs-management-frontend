import TasksTable from '../../components/Tasks/TableContainer'
import { Link } from "react-router-dom";

const ListOfTasks = () => {

    const data = [
        {
            "id": "0b4265d6-d06e-4a51-b595-8304f72e67b7",
            "projectId": "adacf0b0-2a9e-4091-a262-864157bf4097",
            "taskId": 1,
            "projectName": "Prodder",
            "name": "Husain Tigner",
            "date": "1999",
            "endDate": "2011",
            "labels": [
                {"label":"Sub-Ex"},
                {"label":"Sub-Ex2"}
            ],
            "description": "fentanyl citrate",
            "urls": [
                {"url":"https://cdn2.thecatapi.com/images/kZvqdDvvy.jpg"},
                {"url":"https://cdn2.thecatapi.com/images/8is.jpg"}
            ],
            "state": "Abierto",
            "developerEmails": [
                {"email":"htigner0@hc360.com"},
                {"email":"htigner0@hc360.com"}
            ],
        },
        {
            "id": "0b4265d6-d06e-4a51-b595-8304f72e67b8",
            "projectId": "adacf0b0-2a9e-4091-a262-864157bf4097",
            "taskId": 2,
            "projectName": "Prodder2",
            "name": "Husain Tigner2",
            "date": "2000",
            "endDate": "2012",
            "labels": [
                {"label":"Sub-Ex"},
                {"label":"Sub-Ex2"},
                {"label":"Sub-Ex3"},
                {"label":"Sub-Ex4"}
            ],
            "description": "fentanyl citrate",
            "urls": [
                {"url":"https://cdn2.thecatapi.com/images/kZvqdDvvy.jpg"},
                {"url":"https://cdn2.thecatapi.com/images/8is.jpg"},
                {"url":"https://cdn2.thecatapi.com/images/b9e.jpg"}
            ],
            "state": "Abierto",
            "developerEmails": [
                {"email":"htigner0@hc360.com"},
                {"email":"htigner0@hc370.com"},
                {"email":"htigner0@hc380.com"},
                {"email":"htigner0@hc390.com"},
                {"email":"htigner0@hc400.com"},
            ],
        },
        {
            "id": "0b4265d6-d06e-4a51-b595-8304f72e67b7",
            "projectId": "adacf0b0-2a9e-4091-a262-864157bf4097",
            "taskId": 3,
            "projectName": "Prodder",
            "name": "Husain Tigner",
            "date": "1999",
            "endDate": "2011",
            "labels": [
                {"label":"Sub-Ex"},
                {"label":"Sub-Ex2"}
            ],
            "description": "fentanyl citrate",
            "urls": [
                {"url":"https://cdn2.thecatapi.com/images/kZvqdDvvy.jpg"},
                {"url":"https://cdn2.thecatapi.com/images/8is.jpg"}
            ],
            "state": "Abierto",
            "developerEmails": [
                {"email":"htigner0@hc360.com"},
                {"email":"htigner0@hc360.com"}
            ],
        },
        {
            "id": "0b4265d6-d06e-4a51-b595-8304f72e67b7",
            "projectId": "adacf0b0-2a9e-4091-a262-864157bf4097",
            "taskId": 4,
            "projectName": "Prodder",
            "name": "Husain Tigner",
            "date": "1999",
            "endDate": "2011",
            "labels": [
                {"label":"Sub-Ex"},
                {"label":"Sub-Ex2"}
            ],
            "description": "fentanyl citrate",
            "urls": [
                {"url":"https://cdn2.thecatapi.com/images/kZvqdDvvy.jpg"},
                {"url":"https://cdn2.thecatapi.com/images/8is.jpg"}
            ],
            "state": "Abierto",
            "developerEmails": [
                {"email":"htigner0@hc360.com"},
                {"email":"htigner0@hc360.com"}
            ],
        },
    ]

    const columns = [
        {
            Header: "Id",
            Cell: ({ row }) => (
                <Link to='/task-detail' state={{ taskDetail: row.original }}>
                    {row.original.taskId}
                </Link>
            )
        },
        {
            Header: "Nombre de Proyecto",
            accessor: "projectName",
        },
        {
            Header: "Nombre",
            accessor: "name",
        },
        {
            Header: "Fecha de creacion",
            accessor: "date",
        },
        {
            Header: "Fecha de cierre",
            accessor: "endDate",
            Cell: ({ cell: { value } }) => value || "-",
        },
        {
            Header: "Estado",
            accessor: "state",
        },
        {
            Header: "Tags",
            id: "tags",
            accessor: (data) =>
                data.labels.map((item)=>(
                    <div >
                        {item.label}
                    </div>
                ))
        },
        {
            Header: "Desarrollador asignado",
            id: "developerEmails",
            accessor: (data) =>
                data.developerEmails.map((item)=>(
                    <div >
                        {item.email}
                    </div>
                ))
        },
        {
            Header: "Borrar",
            Cell: () => (
                <button>
                    Borrar
                </button>
            )
        },
    ]

    return (
        <div className="container m-5">
            <h1>Hola desde la lista de tareas</h1>
            <div>
                <TasksTable
                    columns={columns}
                    data={data}
                />
            </div>
            <button>Agregar Tarea</button>
        </div>
    )
}

export default ListOfTasks