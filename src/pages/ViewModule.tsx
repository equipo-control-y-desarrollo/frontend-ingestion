import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { ReactElement, useEffect, useState } from "react";
import TableModule from "../components/UI/TableModule";
import { checkModuleDownload, messageModal, download } from "../Utils";
import { useGlobalContext } from "../context/Context";
import useLoader from "../hooks/useLoader";
import { downloadModule, getModule } from "../services/modules";

export default function ViewModule() {
    const [rows, setRows] = useState([{}]);
    const { loading, setLoading, loadingDiv } = useLoader();
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
        const getModules = async () => {
            let query = module
                ? `${data.query}/${module.query}`
                : `${data.query}/empresa/${id_enterprise}`;
            const res = await getModule(query);
            setRows(res.data);
            setLoading(false);
        };
        try {
            getModules();
        } catch (error) {
            messageModal({
                iconType: "error",
                title: "Oops...",
                text: "Ha ocurrido un error en el servidor, por favor, intente más tarde",
                next: () => {
                    navigate("../../error", { replace: true });
                },
            });
            throw error;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const downloadExcel = async (): Promise<any> => {
        const query = `${data.query}/export/${id_enterprise}`;
        let res = null;
        try {
            res = await downloadModule(query);
        } catch (err: any) {
            // The error data is send as arraybuffer, so we need to convert it to string
            var enc = new TextDecoder("utf-8");
            let message = JSON.parse(enc.decode(err.response.data)).message;
            if (message === "Empresa without data") {
                messageModal({
                    iconType: "error",
                    title: "Oops...",
                    text: "La empresa no cuenta con información para este módulo",
                    next: () => {
                        navigate("../../error", { replace: true });
                    },
                });
                return;
            } else {
                messageModal({
                    iconType: "error",
                    title: "Oops...",
                    text: "Ha ocurrido un error en el servidor, por favor, intente más tarde",
                    next: () => {
                        navigate("../../error", { replace: true });
                    },
                });
                return;
            }
        }
        const { link, url } = download(data.name, enterprise, res.data);
        messageModal({
            iconType: "success",
            title: "Excel descargado",
            text: "El archivo se descargará en unos segundos",
            next: () => {
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
            },
        });
    };

    const showData = (): ReactElement => {
        return (
            <div className="viewModule">
                <h3>
                    {data.name} para {enterprise}
                </h3>
                {rows.length === 0 ? (
                    <div className="NoData">
                        La tabla {data.name} para la empresa {enterprise} no
                        cuenta con información por el momento :(
                    </div>
                ) : (
                    <TableModule rows={rows} />
                )}
                <div className="buttons">
                    <Button
                        id="backButton"
                        colorScheme="gray"
                        color="black"
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
