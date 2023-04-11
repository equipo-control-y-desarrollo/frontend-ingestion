import { faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { backend_api } from "../../Utils/util";
import { Tooltip } from "@chakra-ui/react";

export default function RowTable({
    id,
    header,
}: {
    id: string;
    header: string;
}) {
    const navigate = useNavigate();

    const viewThisRow = (): void => {
        navigate(`../row/${id}`, { state: { id: id } });
    };

    const editThisRow = (event: any): void => {
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

    const deleteThisRow = (event: any): void => {
        event.stopPropagation();
        let query = JSON.parse(localStorage.getItem("module") || "{}").query;
        Swal.fire({
            icon: "info",
            title: "Eliminando",
            text: "¿Estas seguro que deseas eliminar el siguiente registro?",
            showCancelButton: true,
            confirmButtonText: "Si",
            cancelButtonText: "No",
        }).then((result) => {
            if (result.isConfirmed) {
                backend_api
                    .delete(`${query}/${id}`)
                    .then((res) => {
                        Swal.fire({
                            icon: "success",
                            title: "Completado",
                            text: "Registro eliminado con éxito",
                        }).then((res) => {
                            navigate("../modules");
                        });
                    })
                    .catch((err) => {
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "Error eliminando registro",
                            footer: "Por favor intenta más tarde de nuevo",
                        });
                    });
            }
        });
    };

    return (
        <Tooltip
            label="Ver registro"
            aria-label="Ver el registro"
            placement="left"
        >
            <div className="row grow" onClick={viewThisRow}>
                <div className="crucialData">
                    <div>{header}</div>
                </div>
                <div className="crucialData optionsRow ">
                    <Tooltip label="Editar">
                        <FontAwesomeIcon
                            onClick={editThisRow}
                            icon={faPencil}
                            className="icon"
                            id="pencil"
                        ></FontAwesomeIcon>
                    </Tooltip>
                    <Tooltip label="Eliminar">
                        <FontAwesomeIcon
                            onClick={deleteThisRow}
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
