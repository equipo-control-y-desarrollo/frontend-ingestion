import { faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useNavigate } from "react-router-dom";

export default function RowTable({id,fecha}: {id: string, fecha: string}){

    const navigate = useNavigate();

    const viewThisRow = () => {
        console.log(`Viewing row with id: ${id}`);
        navigate(`../row/${id}`, {replace: true, state: {id: id}});
    }

    return(
        <div className="row grow" onClick={viewThisRow}>
            <div className="crucialData">
                <div>ID # {id}</div>
                <div>Creación : {fecha}</div>
            </div>
            <div className="crucialData optionsRow ">
                <FontAwesomeIcon icon={faPencil} className="icon" id="pencil"></FontAwesomeIcon>
                <FontAwesomeIcon icon={faTrashCan} className="icon" id="can"></FontAwesomeIcon>
            </div>
        </div>
    )
}