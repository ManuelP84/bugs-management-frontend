import * as React from "react";
import { Button, Modal } from "react-bootstrap";
import { getAllUsersThunk, updateUserThunk } from "../../services/loginServices";
import { IUser } from "../../state/slice/loginSlice";
import { AppDispatch, useAppDispatch } from "../../state/store";

interface ISelectRolFormProps {
    user: IUser
    dispatch: AppDispatch
}

const SelectRolForm: React.FunctionComponent<ISelectRolFormProps> = ({user, dispatch}) => {
  const [rol, setRol] = React.useState<string>();
  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const roles = ["Reader", "Tester", "Developer", "Admin"]
  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userUpdated = {...user, userRol: rol}    
    dispatch(updateUserThunk(userUpdated))
  };
  const handleRol = (e:string) => {
        console.log(e);
  }

  return (
    <>
      <Button variant="warning" onClick={handleShow}>
       Editar Rol
      </Button>

      <Modal
        show={show}
        size="sm"
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Selecciona un nuevo Rol para {user.userEmail}</Modal.Title>
        </Modal.Header>
        <form onSubmit={(e) => handleSave(e)}>
          <Modal.Body>
          <div className="inputFormDiv">
              <label className="formLabel">Rol </label>
              <select
                id="rol"
                name="rol"
                className="selectLabel"
                onChange={(e) => setRol(e.target.value)}
                required
              >
                {roles.map( (rol:string, idx) => (<option key={idx} value={rol}>{rol}</option>))}
                
              </select>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Save
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default SelectRolForm;
