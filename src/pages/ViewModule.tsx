import { useNavigate } from "react-router-dom";
import { Button, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import TableModule from "../components/TableModule";
import { backend_api } from "../Utils/util";
import { useCompany } from "../components/Layouts/LayoutVertical";

export default function ViewModule() {
    const [rows, setRows] = useState([{}]);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();
    let enterprise = useCompany().company;
    let id_enterprise = useCompany().idCompany;
    let data: any = JSON.parse(localStorage.getItem("module") || "");

    console.log(useCompany());
    useEffect(() => {
        backend_api
            .get(`${data.query}/empresa/${id_enterprise}`)
            .then((res) => {
                console.log("Fetch Status for the rows: OK");
                console.log(res.data);
                setRows(res.data);
                setLoading(false);
            })
            .catch(() => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Ha ocurrido un error en el servidor, por favor, intente más tarde",
                });
            });
        console.log("Re-render with new enterprise");
    }, [enterprise]);

    const loadingDiv = () => {
        return (
            <div className="loading">
                <Spinner size="xl" color="blue.500" />
                <h2>Cargando</h2>
            </div>
        );
    };

    const showNoData = () => {
        return (
            <div className="NoData">
                La tabla {data.name} para la empresa {enterprise} no cuenta con
                información por el momento :(
            </div>
        );
    };

    const showData = () => {
        return (
            <div className="viewModule">
                <h3>
                    {data.name} para {enterprise}
                </h3>
                {rows.length === 0 ? showNoData() : <TableModule rows={rows} />}
                <div className="buttons">
                    <Button
                        id="backButton"
                        colorScheme={"#00171F"}
                        onClick={() =>
                            navigate("../modules", { replace: true })
                        }
                    >
                        Ir atras
                    </Button>
                    <Button
                        colorScheme="whatsapp"
                        onClick={() =>
                            navigate(`../addRow/${module}`, {
                                state: { id: -1, isEdit: false },
                            })
                        }
                    >
                        Crear elemento
                    </Button>
                </div>
            </div>
        );
    };

    return <div>{loading ? loadingDiv() : showData()}</div>;
}
