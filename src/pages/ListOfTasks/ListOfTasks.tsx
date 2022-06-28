import TasksTable from '../../components/Tasks/TableContainer'
import { Link } from "react-router-dom";

const ListOfTasks = () => {

    // const data = [
    //     {
    //         "id": "0b4265d6-d06e-4a51-b595-8304f72e67b7",
    //         "projectId": "adacf0b0-2a9e-4091-a262-864157bf4097",
    //         "taskId": 1,
    //         "projectName": "Prodder",
    //         "name": "Husain Tigner",
    //         "date": "1999",
    //         "endDate": "2011",
    //         "labels": "Sub-Ex",
    //         "description": "fentanyl citrate",
    //         "urls": "http://springer.com/ut/rhoncus/aliquet/pulvinar/sed/nisl.json?potenti=at&cras=turpis&in=a&purus=pede&eu=posuere&magna=nonummy&vulputate=integer&luctus=non&cum=velit&sociis=donec&natoque=diam&penatibus=neque&et=vestibulum&magnis=eget&dis=vulputate&parturient=ut&montes=ultrices&nascetur=vel&ridiculus=augue&mus=vestibulum&vivamus=ante&vestibulum=ipsum&sagittis=primis&sapien=in&cum=faucibus&sociis=orci&natoque=luctus&penatibus=et&et=ultrices&magnis=posuere&dis=cubilia&parturient=curae&montes=donec&nascetur=pharetra&ridiculus=magna&mus=vestibulum&etiam=aliquet&vel=ultrices",
    //         "state": "Abierto",
    //         "developerEmails": "htigner0@hc360.com"
    //     },
    //     {
    //         "id": "4de59b99-c070-46c8-94b2-3b207a1247e8",
    //         "projectId": "4731ca79-7cf2-47fa-b03a-3e29fe1d8972",
    //         "taskId": 2,
    //         "projectName": "Voltsillam",
    //         "name": "Elaina Standring",
    //         "date": "2003",
    //         "endDate": null,
    //         "labels": "Trippledex",
    //         "description": "codeine phosphate and guaifenesin",
    //         "urls": "http://twitpic.com/varius/ut/blandit.xml?ante=elementum&nulla=ligula&justo=vehicula&aliquam=consequat&quis=morbi&turpis=a&eget=ipsum&elit=integer&sodales=a&scelerisque=nibh&mauris=in&sit=quis&amet=justo&eros=maecenas&suspendisse=rhoncus&accumsan=aliquam&tortor=lacus&quis=morbi&turpis=quis&sed=tortor&ante=id&vivamus=nulla&tortor=ultrices&duis=aliquet&mattis=maecenas&egestas=leo&metus=odio&aenean=condimentum&fermentum=id&donec=luctus&ut=nec&mauris=molestie&eget=sed&massa=justo&tempor=pellentesque&convallis=viverra&nulla=pede&neque=ac&libero=diam&convallis=cras&eget=pellentesque&eleifend=volutpat&luctus=dui&ultricies=maecenas&eu=tristique&nibh=est&quisque=et&id=tempus&justo=semper&sit=est&amet=quam&sapien=pharetra&dignissim=magna&vestibulum=ac&vestibulum=consequat&ante=metus&ipsum=sapien&primis=ut&in=nunc&faucibus=vestibulum&orci=ante&luctus=ipsum&et=primis&ultrices=in&posuere=faucibus&cubilia=orci&curae=luctus&nulla=et&dapibus=ultrices&dolor=posuere&vel=cubilia&est=curae&donec=mauris&odio=viverra&justo=diam&sollicitudin=vitae&ut=quam&suscipit=suspendisse&a=potenti",
    //         "state": "Abierto",
    //         "developerEmails": "estandring2@nbcnews.com"
    //     },
    //     {
    //         "id": "81717e2c-90d1-4a32-8536-94050b5130ea",
    //         "projectId": "5e781597-e0c2-429b-8c4d-3c57181d14e6",
    //         "taskId": 3,
    //         "projectName": "Ronstring",
    //         "name": "Alyce MacAllaster",
    //         "date": "2007",
    //         "endDate": "2011",
    //         "labels": "Namfix",
    //         "description": "clindamycin hydrochloride",
    //         "urls": "http://businessinsider.com/praesent/lectus.jsp?ut=semper&massa=porta&volutpat=volutpat&convallis=quam&morbi=pede&odio=lobortis&odio=ligula&elementum=sit&eu=amet&interdum=eleifend&eu=pede&tincidunt=libero&in=quis&leo=orci&maecenas=nullam&pulvinar=molestie&lobortis=nibh&est=in&phasellus=lectus&sit=pellentesque&amet=at&erat=nulla&nulla=suspendisse&tempus=potenti&vivamus=cras&in=in&felis=purus&eu=eu&sapien=magna&cursus=vulputate",
    //         "state": "Abierto",
    //         "developerEmails": "amacallaster1@t-online.de"
    //     },
    //     {
    //         "id": "1023d24f-cf29-4115-a366-5939096abfde",
    //         "projectId": "c93dd0ce-d4bd-402d-ba72-7197c4786737",
    //         "taskId": 4,
    //         "projectName": "Temp",
    //         "name": "Lancelot Hardy-Piggin",
    //         "date": "2007",
    //         "endDate": "1995",
    //         "labels": "Flexidy",
    //         "description": "diltiazem hydrochloride",
    //         "urls": "http://elegantthemes.com/sapien/varius/ut/blandit/non/interdum.xml?cursus=non&urna=mauris&ut=morbi&tellus=non&nulla=lectus&ut=aliquam&erat=sit&id=amet&mauris=diam&vulputate=in&elementum=magna&nullam=bibendum&varius=imperdiet&nulla=nullam&facilisi=orci&cras=pede&non=venenatis&velit=non&nec=sodales&nisi=sed&vulputate=tincidunt&nonummy=eu&maecenas=felis&tincidunt=fusce&lacus=posuere&at=felis&velit=sed",
    //         "state": "Abierto",
    //         "developerEmails": "lhardypiggin3@4shared.com"
    //     },
    //     {
    //         "id": "05c11e7f-c961-42cc-bb72-950571410d71",
    //         "projectId": "a2c7e696-eabb-4fe4-a39d-983d812a719f",
    //         "taskId": 5,
    //         "projectName": "Cardguard",
    //         "name": "Gare Brisley",
    //         "date": "1988",
    //         "endDate": "2009",
    //         "labels": "Regrant",
    //         "description": "gabapentin",
    //         "urls": "https://fema.gov/curabitur.aspx?consectetuer=eu&adipiscing=felis&elit=fusce",
    //         "state": "Cerrado",
    //         "developerEmails": "gbrisley4@yellowbook.com"
    //     },
    //     {
    //         "id": "fed58d48-e89b-4a73-bb01-4ccd023f1b8b",
    //         "projectId": "0d5043b1-954c-4657-9c3e-89f27c8e8091",
    //         "taskId": 6,
    //         "projectName": "Veribet",
    //         "name": "Dianna Yakovitch",
    //         "date": "1990",
    //         "endDate": "1998",
    //         "labels": "Asoka",
    //         "description": "ACONITUM NAPELLUS - APIS MELLIFERA - ATROPA BELLADONNA - BASIC CUPRIC CARBONATE - BRYONIA ALBA ROOT - CALCIUM SULFIDE - CITRIC ACID MONOHYDRATE - FERRIC PHOSPHATE - INTERLEUKIN-10 - MELATONIN - METENK",
    //         "urls": "http://redcross.org/in.json?at=curae&feugiat=nulla&non=dapibus&pretium=dolor&quis=vel&lectus=est&suspendisse=donec&potenti=odio&in=justo&eleifend=sollicitudin&quam=ut&a=suscipit&odio=a&in=feugiat&hac=et&habitasse=eros&platea=vestibulum&dictumst=ac&maecenas=est&ut=lacinia&massa=nisi&quis=venenatis&augue=tristique&luctus=fusce&tincidunt=congue&nulla=diam&mollis=id&molestie=ornare&lorem=imperdiet&quisque=sapien&ut=urna&erat=pretium",
    //         "state": "Cerrado",
    //         "developerEmails": "dyakovitch5@arstechnica.com"
    //     },
    //     {
    //         "id": "ca0f70e2-6921-464f-bec3-e5d0b1966eb0",
    //         "projectId": "fcbf703f-6610-4a18-9a61-c2e3da7aa855",
    //         "taskId": 7,
    //         "projectName": "Keylex",
    //         "name": "Sanderson Andresen",
    //         "date": "2011",
    //         "endDate": "1984",
    //         "labels": "Y-find",
    //         "description": "Clarithromycin",
    //         "urls": "https://ehow.com/libero/ut/massa/volutpat/convallis/morbi.png?diam=donec&cras=vitae&pellentesque=nisi&volutpat=nam&dui=ultrices&maecenas=libero&tristique=non&est=mattis&et=pulvinar&tempus=nulla&semper=pede&est=ullamcorper&quam=augue&pharetra=a&magna=suscipit&ac=nulla&consequat=elit&metus=ac&sapien=nulla&ut=sed&nunc=vel&vestibulum=enim&ante=sit&ipsum=amet&primis=nunc&in=viverra&faucibus=dapibus&orci=nulla",
    //         "state": "Impedimento",
    //         "developerEmails":
    //             "sandresen6@elpais.com"
    //     },
    //     {
    //         "id": "4db8acfe-dcca-4d36-ab77-b2e4ed09ca9d",
    //         "projectId": "11e0f0fb-94d9-4d97-9661-a82224942aaa",
    //         "taskId": 8,
    //         "projectName": "Rank",
    //         "name": "Keary Jakubovitch",
    //         "date": "2009",
    //         "endDate": "2011",
    //         "labels": "Stronghold",
    //         "description": "MENTHOL, PRAMOXINE HYDROCHLORIDE",
    //         "urls": "https://icq.com/lacinia.aspx?sapien=vel&non=ipsum&mi=praesent&integer=blandit&ac=lacinia&neque=erat&duis=vestibulum&bibendum=sed&morbi=magna&non=at&quam=nunc&nec=commodo&dui=placerat&luctus=praesent&rutrum=blandit&nulla=nam&tellus=nulla&in=integer&sagittis=pede&dui=justo&vel=lacinia&nisl=eget&duis=tincidunt&ac=eget&nibh=tempus&fusce=vel&lacus=pede&purus=morbi&aliquet=porttitor&at=lorem&feugiat=id&non=ligula&pretium=suspendisse&quis=ornare&lectus=consequat&suspendisse=lectus&potenti=in&in=est&eleifend=risus&quam=auctor&a=sed&odio=tristique&in=in&hac=tempus&habitasse=sit&platea=amet&dictumst=sem&maecenas=fusce&ut=consequat&massa=nulla&quis=nisl&augue=nunc&luctus=nisl&tincidunt=duis&nulla=bibendum&mollis=felis&molestie=sed&lorem=interdum&quisque=venenatis&ut=turpis&erat=enim&curabitur=blandit&gravida=mi&nisi=in&at=porttitor&nibh=pede&in=justo&hac=eu&habitasse=massa&platea=donec&dictumst=dapibus&aliquam=duis&augue=at&quam=velit&sollicitudin=eu&vitae=est&consectetuer=congue&eget=elementum&rutrum=in&at=hac&lorem=habitasse&integer=platea&tincidunt=dictumst&ante=morbi&vel=vestibulum&ipsum=velit&praesent=id&blandit=pretium&lacinia=iaculis&erat=diam&vestibulum=erat&sed=fermentum&magna=justo&at=nec&nunc=condimentum",
    //         "state": "Cerrado",
    //         "developerEmails": "kjakubovitch7@tripadvisor.com"
    //     },
    //     {
    //         "id": "e303643a-57cf-4c54-b172-b3e2a6adb921",
    //         "projectId": "cde19b09-ccf3-43ea-bdfc-d56fff64b34f",
    //         "taskId": 9,
    //         "projectName": "Rank",
    //         "name": "Quent Haithwaite",
    //         "date": "2004",
    //         "endDate": "2006",
    //         "labels": "Zoolab",
    //         "description": "Menthol",
    //         "urls": "http://un.org/odio.png?lacus=justo&morbi=aliquam&quis=quis&tortor=turpis&id=eget&nulla=elit&ultrices=sodales&aliquet=scelerisque&maecenas=mauris&leo=sit&odio=amet&condimentum=eros&id=suspendisse&luctus=accumsan&nec=tortor&molestie=quis&sed=turpis&justo=sed&pellentesque=ante&viverra=vivamus&pede=tortor&ac=duis&diam=mattis&cras=egestas&pellentesque=metus&volutpat=aenean&dui=fermentum&maecenas=donec&tristique=ut&est=mauris&et=eget&tempus=massa&semper=tempor&est=convallis&quam=nulla&pharetra=neque&magna=libero&ac=convallis&consequat=eget&metus=eleifend&sapien=luctus&ut=ultricies&nunc=eu&vestibulum=nibh&ante=quisque&ipsum=id&primis=justo&in=sit&faucibus=amet&orci=sapien&luctus=dignissim&et=vestibulum&ultrices=vestibulum&posuere=ante&cubilia=ipsum&curae=primis&mauris=in&viverra=faucibus&diam=orci&vitae=luctus&quam=et&suspendisse=ultrices&potenti=posuere&nullam=cubilia&porttitor=curae&lacus=nulla&at=dapibus&turpis=dolor&donec=vel&posuere=est&metus=donec&vitae=odio&ipsum=justo&aliquam=sollicitudin&non=ut&mauris=suscipit&morbi=a&non=feugiat&lectus=et&aliquam=eros&sit=vestibulum&amet=ac&diam=est&in=lacinia&magna=nisi&bibendum=venenatis&imperdiet=tristique&nullam=fusce",
    //         "state": "Impedimento",
    //         "developerEmails": "qhaithwaite8@omniture.com"
    //     },
    //     {
    //         "id": "38e4b8e8-3782-41c0-9c47-839f08825419",
    //         "projectId": "47687e04-492a-4ef1-bdad-96812b688fa7",
    //         "taskId": 10,
    //         "projectName": "Fix San",
    //         "name": "Renaldo Canland",
    //         "date": "1992",
    //         "endDate": "2004",
    //         "labels": "Konklab",
    //         "description": "GLYCERIN",
    //         "urls": "https://unicef.org/diam/nam/tristique.png?montes=nibh&nascetur=fusce&ridiculus=lacus&mus=purus&vivamus=aliquet&vestibulum=at&sagittis=feugiat&sapien=non&cum=pretium&sociis=quis&natoque=lectus&penatibus=suspendisse&et=potenti&magnis=in&dis=eleifend&parturient=quam&montes=a&nascetur=odio&ridiculus=in&mus=hac&etiam=habitasse&vel=platea&augue=dictumst&vestibulum=maecenas&rutrum=ut&rutrum=massa&neque=quis&aenean=augue&auctor=luctus&gravida=tincidunt&sem=nulla&praesent=mollis&id=molestie&massa=lorem&id=quisque&nisl=ut&venenatis=erat&lacinia=curabitur&aenean=gravida&sit=nisi&amet=at&justo=nibh&morbi=in&ut=hac&odio=habitasse&cras=platea&mi=dictumst&pede=aliquam&malesuada=augue&in=quam&imperdiet=sollicitudin&et=vitae&commodo=consectetuer&vulputate=eget&justo=rutrum&in=at&blandit=lorem&ultrices=integer&enim=tincidunt&lorem=ante&ipsum=vel&dolor=ipsum&sit=praesent&amet=blandit&consectetuer=lacinia",
    //         "state": "Impedimento",
    //         "developerEmails": "rcanland9@gnu.org"
    //     },
    //     , []
    // ]

    

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
        }
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
        </div>
    )
}

export default ListOfTasks