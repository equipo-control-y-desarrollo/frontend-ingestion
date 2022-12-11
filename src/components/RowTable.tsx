import { faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { backend_api } from "../Utils/util";

export default function RowTable({id,fecha}: {id: string, fecha: string}){

    const navigate = useNavigate();

    const viewThisRow = () => {
        console.log(`Viewing row with id: ${id}`);
        navigate(`../row/${id}`, {replace: true, state: {id: id}});
    }

    const editThisRow = (event: any) => {
        event.stopPropagation();
        console.log("Editing row with id: " + id);
        Swal.fire({
            icon: 'info',
            title: 'Editando',
            text: '¿Estas seguro que deseas editar el siguiente registro?',
            showCancelButton: true,
            confirmButtonText: 'Si',
            cancelButtonText: 'No'
        }).then((result) => {
            if(result.isConfirmed){
                navigate(`../edit/${id}`, {replace: true, state: {id: id, isEdit: true}});
            }
        });
    };

    const deleteThisRow = (event: any) => {
        event.stopPropagation();
        console.log("Deleting row of with id: " + id);       
        /*
        backend_api.post("", {id: id}).then((res) => {
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Registro eliminado con éxito'
            })
        }).catch((err) => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error eliminando registro',
                footer: 'Por favor intenta más tarde de nuevo'
            });
        });
        */
    };

    return(
        <div className="row grow" onClick={viewThisRow}>
            <div className="crucialData">
                <div>ID # {id}</div>
                <div>Creación : {fecha}</div>
            </div>
            <div className="crucialData optionsRow ">
                <FontAwesomeIcon onClick={editThisRow} icon={faPencil} className="icon" id="pencil"></FontAwesomeIcon>
                <FontAwesomeIcon onClick={deleteThisRow} icon={faTrashCan} className="icon" id="can"></FontAwesomeIcon>
            </div>
        </div>
    )
}