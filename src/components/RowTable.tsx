import { faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function RowTable({id,fecha}: {id: string, fecha: string}){



    return(
        <div className="row grow">
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