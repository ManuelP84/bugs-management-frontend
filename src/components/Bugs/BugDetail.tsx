import * as React from "react";
import { Button, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IBug } from "../../state/slice/bugsSlice";
import { taskType } from "../../state/slice/taskSlice";
import { RootState } from "../../state/store";
import EditBugForm from "./EditBugForm";

interface IBugDetailProps {
  bugProp: IBug;
}

const BugDetail: React.FunctionComponent<IBugDetailProps> = ({ bugProp }) => {
  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const bug = useSelector((state: RootState) => state.bugs.actualBug) as IBug;
  const task = useSelector(
    (state: RootState) => state.bugs.actualTask
  ) as taskType;
  const user = useSelector((state: RootState) => state.login.actualUser);
  const rol = user?.userRol;
  const permissions = rol == "Tester" || rol == "Admin" || rol == "Developer";

  return (
    <>
      <p className="bugDetailButton" onClick={handleShow}>
        {bugProp.bugId}
      </p>

      <Modal
        show={show}
        size="lg"
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{bugProp.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="center">
            <br />
            <div className="fluid-container mx-4">
              <div className="row border-top border-primary">
                <div className="col">
                  <strong>Id del BugProp:</strong>
                </div>
                <div className="col">{bugProp.bugId}</div>
              </div>
              <div className="row row border-top border-primary ">
                <div className="col">
                  <strong>Nombre del Bug:</strong>
                </div>
                <div className="col">{bugProp.title}</div>
              </div>
              <div className="row border-top border-primary">
                <div className="col">
                  <strong>Estado del Bug:</strong>
                </div>
                <div className="col">{bugProp.state}</div>
              </div>
              <div className="row row border-top border-primary">
                <div className="col">
                  <strong>Id de la Tarea:</strong>
                </div>
                <div className="col">{bugProp.taskId}</div>
              </div>
              <div className="row border-top border-primary">
                <div className="col">
                  <strong>Nombre de Proyecto:</strong>
                </div>
                <div className="col">{task.projectName}</div>
              </div>
              <div className="row border-top border-primary">
                <div className="col">
                  <strong>Fecha de inicio:</strong>
                </div>
                <div className="col">{bugProp.date}</div>
              </div>
              <div className="row border-top border-primary">
                <div className="col">
                  <strong>Fecha de finalización:</strong>
                </div>
                <div className="col">{bugProp.endDate}</div>
              </div>
              <div className="row border-top border-primary">
                <div className="col">
                  <strong>Descripción:</strong>
                </div>
                <div className="col">{bugProp.description}</div>
              </div>
              <div className="row border-top border-primary">
                <div className="col">
                  <strong>Tester Encargado:</strong>
                </div>
                <div className="col">{bugProp.testerEmail}</div>
              </div>
              <div className="row border-top border-primary">
                <div className="col">
                  <strong>Notas del Tester:</strong>
                </div>
                <div className="col">{bugProp.testerNotes}</div>
              </div>
              <div className="row border-top border-primary">
                <div className="col">
                  <strong>Fase de ciclo de vida:</strong>
                </div>
                <div className="col">{bugProp.lifecycle}</div>
              </div>
              <div className="row border-top border-primary">
                <div className="col">
                  <strong>Alcance o grado de impacto:</strong>
                </div>
                <div className="col">{bugProp.scope}</div>
              </div>
              <div className="row border-top border-primary">
                <div className="col">
                  <strong>Importancia al usuario:</strong>
                </div>
                <div className="col">{bugProp.importance}</div>
              </div>
              <div className="row border-top border-primary">
                <div className="col">
                  <strong>Prioridad para arreglar:</strong>
                </div>
                <div className="col">{bugProp.priority}</div>
              </div>
              <div className="row border-top border-primary">
                <div className="col">
                  <strong>Archivos adjuntos:</strong>
                </div>
                <div className="col">
                  <ul className="list-unstyled">
                    {bugProp.urls?.map((urls) => {
                      return (
                        <li>
                          <a
                            className="text-decoration-none text-dark"
                            href={urls.url}
                          >
                            {urls.fileName}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
              <div className="row border-top border-primary">
                <div className="col">
                  <strong>Desarrollador Engargado:</strong>
                </div>
                <div className="col">{bugProp.developerEmail}</div>
              </div>
              <div className="row border-top border-primary">
                <div className="col">
                  <strong>Recomendaciones:</strong>
                </div>
                <div className="col">{bugProp.conclusions}</div>
              </div>
              <div className="row border-top border-primary">
                <div className="col">
                  <strong>Problemas globales:</strong>
                </div>
                <div className="col">{bugProp.problems}</div>
              </div>
              <div className="row border-top border-primary">
                <div className="col">
                  <strong>Referencias:</strong>
                </div>
                <div className="col">{bugProp.reference}</div>
              </div>
              <div className="row border-top border-primary"></div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default BugDetail;
