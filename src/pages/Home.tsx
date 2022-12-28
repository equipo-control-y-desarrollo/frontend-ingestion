import React, { useState, useEffect } from "react";
import { Spinner } from "@chakra-ui/react";
import Swal from "sweetalert2";
import VerticalNavbar from "../components/VerticalNavbar";
import ModulesMenu from "../components/ModulesMenu";
import { backend_api } from "../Utils/util";
import { useCompany } from "../components/Layouts/LayoutVertical";
import { match_module_icon } from "../Utils/util";
import propsModules from "../interfaces";

export default function Home() {
    const [loading, setLoading] = useState(true);
    const [modules, setModules] = useState<propsModules[] | []>([]);
    let enterprise = useCompany().company;

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
        setModules([
            {
                name: "Cuentas por pagar",
                value: "cuentas_pendientes",
                icon: match_module_icon("Cuentas por pagar"),
            },
            {
                name: "Cartera",
                value: "carteras",
                icon: match_module_icon("Cartera"),
            },
            {
                name: "Cuentas bancarias",
                value: "cuentas",
                icon: match_module_icon("Cuentas Bancarias"),
            },
            {
                name: "Flujo de caja",
                value: "flujoscaja",
                icon: match_module_icon("Flujo de caja"),
            },
            {
                name: "Cuadro de ventas",
                value: "ventas/cuadros",
                icon: match_module_icon("Cuadro de ventas"),
            },
            {
                name: "Registro de ventas",
                value: "ventas",
                icon: match_module_icon("Registro de ventas"),
            },
        ]);
        setTimeout(() => setLoading(false), 1000);
    }, [enterprise]);

    return <div>{loading ? loadingDiv() : homeDiv()}</div>;
}
