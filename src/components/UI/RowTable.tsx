import { faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "@chakra-ui/react";
import { deleteRow } from "../../services/rows";
import { messageModal } from "../../Utils/util";

export interface Props {
  id: string;
  header: string;
}

export default function RowTable(props: Props) {
  const { id, header } = props;
  const navigate = useNavigate();

  const viewThisRow = (event: React.ChangeEvent<HTMLInputElement>): void => {
    navigate(`../row/${id}`, { state: { id: id } });
  };

  const deleteTheRow = (event: React.ChangeEvent<HTMLInputElement>) : void => {
    alert("delete")
    event.stopPropagation();
    const query = JSON.parse(localStorage.getItem("module") || "{}").query;
    Swal.fire({
      icon: "info",
      title: "Eliminando",
      text: "¿Estas seguro que deseas eliminar el siguiente registro?",
      showCancelButton: true,
      confirmButtonText: "Si",
      cancelButtonText: "No",
    }).then( async (result) => {
      if (result.isConfirmed) {
        try{
          await deleteRow(`${query}/${id}`);
        }catch(err){
          messageModal({
            iconType: "error",
            title: "Oops...",
            text: "Error eliminando registro",
          })
        }       
    }})
  }

  const editThisRow = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.stopPropagation();
    Swal.fire({
      icon: "info",
      title: "Editando",
      text: "¿Estas seguro que deseas editar el siguiente registro?",
      showCancelButton: true,
      confirmButtonText: "Si",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(`../edit/${id}`, { state: { id: id, isEdit: true } });
      }
    });
  };

  return (
    <Tooltip label="Ver registro" aria-label="Ver el registro" placement="left">
      <div className="row grow" onClick={() => viewThisRow}>
        <div className="crucialData">
          <div>{header}</div>
        </div>
        <div className="crucialData optionsRow ">
          <Tooltip label="Editar">
            <FontAwesomeIcon
              onClick={() => editThisRow}
              icon={faPencil}
              className="icon"
              id="pencil"
            ></FontAwesomeIcon>
          </Tooltip>
          <Tooltip label="Eliminar">
            <FontAwesomeIcon
              onClick={() => deleteTheRow}
              icon={faTrashCan}
              className="icon"
              id="can"
            ></FontAwesomeIcon>
          </Tooltip>
        </div>
      </div>
    </Tooltip>
  );
}
