import Swal from "sweetalert2";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { ReactElement, useEffect, useState } from "react";
import TableModule from "../components/TableModule";
import { backend_api, checkModuleDownload } from "../Utils/util";
import { useGlobalContext } from "../components/Context";
import useLoader from "../hooks/useLoader";
import { downloadModule, getModule } from "../services/modules";

export default function ViewModule() {
    const [rows, setRows] = useState([{}]);
    const { loading, setLoading, loadingDiv } = useLoader({});
    const { currentID, currentName } = useGlobalContext();
    const navigate = useNavigate();

    let enterprise =
        currentName ||
        JSON.parse(localStorage.getItem("companyData") || "{}").name;
    let id_enterprise =
        currentID || JSON.parse(localStorage.getItem("companyData") || "{}").id;
    let data: any = JSON.parse(localStorage.getItem("module") || "");

    const location = useLocation();
    const module = location.state;
    
    useEffect(() => {
        let query = module ? `${data.query}/${module.query}` : `${data.query}/empresa/${id_enterprise}`;
        setLoading(true);
        getModule(query).then((res) => {
            console.log("Fetch Status for the rows: OK");
            console.log(res.data);
            setRows(res.data);
            setLoading(false);
        }).catch((err) => {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Ha ocurrido un error en el servidor, por favor, intente más tarde",
            }).then(() => {
                navigate("../../error", {
                    replace: true,
                });
            });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const downloadExcel = (): void => {
        console.log(`Descarga para ${data.query}/export/${id_enterprise}`);
        const query = `${data.query}/export/${id_enterprise}`;
        downloadModule(query)
            .then((res) => {
                console.log("Fetch Status for the excel: OK");
                const filename = `${data.name}_${enterprise}.xlsx`;
                const url = window.URL.createObjectURL(new Blob([res.data]));
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", filename);
                document.body.appendChild(link);
                Swal.fire({
                    icon: "success",
                    title: "Excel descargado",
                    text: "El archivo se descargará en unos segundos",
                }).then((res) => {
                    link.click();
                    document.body.removeChild(link);
                    URL.revokeObjectURL(url);
                });
            })
            .catch((err) => {
                // The error data is send as arrabuffer, so we need to convert it to string
                var enc = new TextDecoder("utf-8");
                let message = JSON.parse(enc.decode(err.response.data)).message;
                if (message === "Empresa without data") {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "La empresa no cuenta con información para este módulo",
                    }).then((res) => { });
                    return;
                }
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Ha ocurrido un error en el servidor, por favor, intente más tarde",
                }).then((res) => {
                    navigate("../../error", {
                        replace: true,
                    });
                });
            });
    };

    const showData = (): ReactElement => {
        return (
            <div className="viewModule">
                <h3>
                    {data.name} para {enterprise}
                </h3>
                {rows.length === 0 ?
                    (
                        <div className="NoData">
                            La tabla {data.name} para la empresa {enterprise} no cuenta con
                            información por el momento :(
                        </div>
                    ) 
                    : 
                    <TableModule rows={rows} />
                }
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
                    {checkModuleDownload(data.name) && (
                        <Button
                            id="downloadButton"
                            colorScheme="telegram"
                            onClick={downloadExcel}
                        >
                            Descargar en formato Excel
                        </Button>
                    )}
                    <Button
                        colorScheme="whatsapp"
                        onClick={() =>
                            navigate(`../addRow/${module}`, {
                                state: {
                                    id: -1,
                                    isEdit: false,
                                    previous_data:
                                        rows.length === 0
                                            ? { saldo: 0 }
                                            : rows[0],
                                },
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