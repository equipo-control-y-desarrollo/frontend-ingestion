import { useState, useEffect, ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";
import ModulesMenu from "../components/ModulesMenu";
import Swal from "sweetalert2";
import { checkAuth, getModuleEnterprise } from "../Utils/util";
import { Module } from "../interfaces";
import { useGlobalContext } from "../components/Context";

export default function Home() {
    const [loading, setLoading] = useState<boolean>(true);
    const [modules, setModules] = useState<Module[] | []>([]);
    const { currentName } = useGlobalContext();
    let enterprise: string =
        currentName ||
        JSON.parse(localStorage.getItem("companyData") || "{}").name;
    const navigate = useNavigate();

    const loadingDiv = (): ReactElement => {
        return (
            <div className="loading">
                <Spinner size="xl" color="blue.500" />
                <h2>Cargando...</h2>
            </div>
        );
    };

    const homeDiv = (): ReactElement => {
        return (
            <div className="main-menu">
                <ModulesMenu modules={modules}></ModulesMenu>
            </div>
        );
    };

    useEffect(() => {
        if (checkAuth()) {
            console.log("enterprise: ", enterprise);
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
