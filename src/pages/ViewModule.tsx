import { useNavigate, useLocation } from "react-router-dom";
import { Button, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import TableModule from "../components/TableModule";
import { backend_api, checkAuth, checkModuleDownload } from "../Utils/util";
import { useCompany } from "../components/Layouts/LayoutVertical";

export default function ViewModule() {
    const [rows, setRows] = useState([{}]);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();
    let enterprise =
        useCompany().company ||
        JSON.parse(localStorage.getItem("companyData") || "{}").name;
    let id_enterprise =
        useCompany().idCompany ||
        JSON.parse(localStorage.getItem("companyData") || "{}").id;
    let data: any = JSON.parse(localStorage.getItem("module") || "");

    const location = useLocation();
    const module = location.state;

    useEffect(() => {
        if (checkAuth()) {
            let query = `${data.query}/empresa/${id_enterprise}`;
            if (module) {
                query = `${data.query}/${module.query}`;
            }
            backend_api
                .get(query)
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
                    }).then((res) => {
                        navigate("../../error", {
                            replace: true,
                        });
                    });
                });
            console.log("Re-render with new enterprise");
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Debes iniciar sesion para poder ingresar a esta ruta",
            }).then((res) => {
                navigate("../../", {
                    replace: true,
                });
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [enterprise]);

    const downloadExcel = () => {
        console.log(`Descarga para ${data.query}/export/${id_enterprise}`);
        backend_api
            .get(`${data.query}/export/${id_enterprise}`, {
                responseType: "arraybuffer",
                headers: {
                    "Content-Disposition": "attachment; filename=export.xlsx",
                    "Content-Type":
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                },
            })
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
                    }).then((res) => {});
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
