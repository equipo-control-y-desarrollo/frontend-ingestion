import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";
import ModulesMenu from "../components/ModulesMenu";
import Swal from "sweetalert2";
import { checkAuth, getModuleEnterprise } from "../Utils/util";
import propsModules from "../interfaces";
import { useCompany } from "../components/Layouts/LayoutVertical";
import { useGlobalContext } from "../components/Context";

export default function Home() {
    const [loading, setLoading] = useState(true);
    const [modules, setModules] = useState<propsModules[] | []>([]);
    const {currentID, setID, currentName, setName} = useGlobalContext();
    let enterprise =
        currentName ||
        JSON.parse(localStorage.getItem("companyData") || "{}").name;

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
            setModules(getModuleEnterprise(enterprise || ""));
            setLoading(false);
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

    return <div>{loading ? loadingDiv() : homeDiv()}</div>;
}
