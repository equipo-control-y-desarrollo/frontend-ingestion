import React, { useEffect, useState } from "react";
import { backend_api, checkAuth } from "../Utils/util";
import Swal from "sweetalert2";
import { Spinner, Button } from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";

export default function ViewRow() {
    const [data, setData] = useState({} as any);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const location = useLocation();
    const id = location.state.id;

    const module = JSON.parse(localStorage.getItem("module") || "{}");

    useEffect(() => {
        if (checkAuth()) {
            console.log(`Fetching data for the row with id: ${id}`);
            backend_api
                .get(`${module.query}/${id}`)
                .then((res) => {
                    console.log(`Success : ${res.data}`);
                    setData(res.data.data);
                    setLoading(false);
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
                });
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
    }, []);

    const loadingDiv = () => {
        return (
            <div className="loading">
                <Spinner size="xl" color="blue.500" />
                <h2>Cargando</h2>
            </div>
        );
    };

    const generateRows = () => {
        let rows = [];
        for (let i = 0; i < Object.keys(data).length; i++) {
            let curr: string = Object.keys(data)[i].toString();
            let date: boolean = curr.includes("fecha") || curr.includes("date");
            let res: string = date
                ? data[curr].toString().substring(0, 10)
                : data[curr].toString();
            rows.push(
                <div className="fieldData">
                    <h2>{curr}</h2>
                    <input value={res} readOnly={true}></input>
                </div>
            );
        }
        return rows;
    };

    const checkIfHasSubmodules = () => {
        if (module.submodules.length > 0) {
            let module_name = module.submodules[0].name;
            console.log(`Has submodules: ${module_name}`);
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
    };

    const editElement = () => {
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

    const showData = () => {
        let data_rows = generateRows();
        return (
            <div className="viewDataGrid">
                <h2 className="titleShow">Registro {id}</h2>
                <div className="displayDataGrid">{data_rows}</div>
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
