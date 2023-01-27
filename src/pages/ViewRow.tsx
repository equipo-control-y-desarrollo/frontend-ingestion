import { ReactElement, useEffect, useState } from "react";
import { backend_api, checkAuth } from "../Utils/util";
import Swal from "sweetalert2";
import { Spinner, Button } from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";

export default function ViewRow() {
    const [data, setData] = useState({} as any);
    const [loading, setLoading] = useState<boolean>(false);

    const navigate = useNavigate();
    const location = useLocation();
    const id = location.state.id;

    const module = JSON.parse(localStorage.getItem("module") || "{}");

    useEffect(() => {
        if (checkAuth()) {
            console.log(`Fetching data for the row with id: ${id}`);
            setLoading(true);
            backend_api
                .get(`${module.query}/${id}`)
                .then((res) => {
                    setData(res.data.data);
                })
                .catch((err) => {
                    console.log(err);
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Error fetching data",
                        footer: "Please try again later",
                    }).then((res) => {
                        navigate("../../error", {
                            replace: true,
                        });
                    });
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setLoading(false);
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
    }, []);

    const loadingDiv = (): ReactElement => {
        return (
            <div className="loading">
                <Spinner size="xl" color="blue.500" />
                <h2>Cargando...</h2>
            </div>
        );
    };

    const generateRows = (): ReactElement[] => {
        let rows = [];
        for (let i = 0; i < Object.keys(data).length; i++) {
            let curr: string = Object.keys(data)[i].toString();
            if (data[curr]) {
                let date: boolean =
                    curr.includes("fecha") || curr.includes("date");
                console.log(data[curr]);
                let res: string = date
                    ? data[curr].toString().substring(0, 10)
                    : data[curr].toString();
                rows.push(
                    <div className="fieldData">
                        <h2>{curr}</h2>
                        <input value={res} readOnly={true}></input>
                    </div>
                );
            } else {
                rows.push(
                    <div className="fieldData">
                        <h2>{curr}</h2>
                        <input value="N/A"></input>
                    </div>
                );
            }
        }
        return rows;
    };

    const checkIfHasSubmodules = (): ReactElement => {
        if (module.submodules.length > 0) {
            let module_name = module.submodules[0].name;
            return (
                <Button
                    colorScheme={"teal"}
                    onClick={() => {
                        localStorage.setItem(
                            "module",
                            JSON.stringify({
                                query: module.submodules[0].value,
                                name: module.submodules[0].name,
                                submodules: [],
                            })
                        );
                        let data_query =
                            module_name === "Categoria"
                                ? `flujo/${id}`
                                : `cuenta/${id}`;
                        localStorage.setItem("father_module_row_id", id);
                        navigate(`../${module_name}`, {
                            state: { query: data_query },
                        });
                    }}
                >
                    Ver {module_name}
                </Button>
            );
        }
        return <></>;
    };

    const editElement = (): void => {
        console.log(`Editing element with id: ${id}`);
        Swal.fire({
            icon: "info",
            title: "Editando",
            text: "¿Estas seguro que deseas editar el siguiente registro?",
            showCancelButton: true,
            confirmButtonText: "Si",
            cancelButtonText: "No",
        }).then((result) => {
            if (result.isConfirmed) {
                navigate(`../edit/${id}`, {
                    replace: true,
                    state: { id: id, isEdit: true },
                });
            }
        });
    };

    const showData = (): ReactElement => {
        return (
            <div className="viewDataGrid">
                <h2 className="titleShow">Registro {id}</h2>
                <div className="displayDataGrid">{generateRows()}</div>
                <div className="buttons">
                    <Button colorScheme="gray" onClick={() => navigate(-1)}>
                        Ir atras
                    </Button>
                    <Button
                        colorScheme="whatsapp"
                        onClick={() => editElement()}
                    >
                        Editar elemento
                    </Button>
                    {checkIfHasSubmodules()}
                </div>
            </div>
        );
    };

    return <div>{loading ? loadingDiv() : showData()}</div>;
}
