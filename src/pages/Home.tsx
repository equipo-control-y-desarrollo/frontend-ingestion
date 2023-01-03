import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";
import ModulesMenu from "../components/ModulesMenu";
import Swal from "sweetalert2";
import { checkAuth, match_module_icon } from "../Utils/util";
import propsModules from "../interfaces";

export default function Home() {
    const [loading, setLoading] = useState(true);
    const [modules, setModules] = useState<propsModules[] | []>([]);
    const navigate = useNavigate();

    const loadingDiv = () => {
        return (
            <div className="loading">
                <Spinner size="xl" color="blue.500" />
                <h2>Cargando</h2>
            </div>
        );
    };

    const homeDiv = () => {
        return (
            <div className="main-menu">
                <ModulesMenu modules={modules}></ModulesMenu>
            </div>
        );
    };

    useEffect(() => {
        if (checkAuth()) {
            setModules([
                {
                    name: "Cuentas por pagar",
                    value: "cuentas_pendientes",
                    submodules: [],
                    icon: match_module_icon("Cuentas por pagar"),
                },
                {
                    name: "Cartera",
                    value: "carteras",
                    submodules: [],
                    icon: match_module_icon("Cartera"),
                },
                {
                    name: "Cuentas bancarias",
                    value: "cuentas",
                    submodules: [
                        {
                            name: "Movimientos",
                            value: "cuentas/movimientos",
                            submodules: [],
                            icon: match_module_icon("Movimientos"),
                        },
                    ],
                    icon: match_module_icon("Cuentas Bancarias"),
                },
                {
                    name: "Flujo de caja",
                    value: "flujoscaja",
                    submodules: [
                        {
                            name: "Categoria",
                            value: "flujoscaja/categorias",
                            submodules: [],
                            icon: match_module_icon("Categoria"),
                        },
                    ],
                    icon: match_module_icon("Flujo de caja"),
                },
                {
                    name: "Cuadro de ventas",
                    value: "ventas/cuadros",
                    submodules: [],
                    icon: match_module_icon("Cuadro de ventas"),
                },
                {
                    name: "Registro de ventas",
                    value: "ventas",
                    submodules: [],
                    icon: match_module_icon("Registro de ventas"),
                },
            ]);
            setLoading(false);
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
    }, []);

    return <div>{loading ? loadingDiv() : homeDiv()}</div>;
}
