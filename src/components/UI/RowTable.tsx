import { faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "@chakra-ui/react";
import { deleteRow } from "../../services/rows";
import { messageModal } from "../../Utils";

export interface Props {
    id: string;
    header: string;
}

export default function RowTable(props: Props) {
    const { id, header } = props;
    const navigate = useNavigate();

    const deleteTheRow = (
        event: React.MouseEvent<SVGSVGElement, MouseEvent>
    ): void => {
        event.stopPropagation();
        const query = JSON.parse(localStorage.getItem("module") || "{}").query;
        Swal.fire({
            icon: "info",
            title: "Eliminando",
            text: "¿Estas seguro que deseas eliminar el siguiente registro?",
            showCancelButton: true,
            confirmButtonText: "Si",
            cancelButtonText: "No",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteRow(`${query}/${id}`);
                } catch (err) {
                    messageModal({
                        iconType: "error",
                        title: "Oops...",
                        text: "Error eliminando registro",
                    });
                }
                messageModal({
                    iconType: "success",
                    title: "Eliminado",
                    text: "Registro eliminado correctamente",
                    next: () => {
                        navigate("../modules");
                    },
                });
            }
        });
    };

    const editThisRow = (
        event: React.MouseEvent<SVGSVGElement, MouseEvent>
    ): void => {
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
        <Tooltip
            label="Ver registro"
            aria-label="Ver el registro"
            placement="left"
        >
            <div
                className="row grow"
                onClick={() => navigate(`../row/${id}`, { state: { id: id } })}
            >
                <div className="crucialData">
                    <div>{header}</div>
                </div>
                <div className="crucialData optionsRow ">
                    <Tooltip label="Editar">
                        <FontAwesomeIcon
                            onClick={
                                editThisRow as React.MouseEventHandler<SVGSVGElement>
                            }
                            icon={faPencil}
                            className="icon"
                            id="pencil"
                        ></FontAwesomeIcon>
                    </Tooltip>
                    <Tooltip label="Eliminar">
                        <FontAwesomeIcon
                            onClick={
                                deleteTheRow as React.MouseEventHandler<SVGSVGElement>
                            }
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
