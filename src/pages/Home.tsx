import { useState, useEffect, ReactElement } from "react";
import ModulesMenu from "../components/UI/ModulesMenu";
import { getModuleEnterprise } from "../Utils/util";
import { Module } from "../interfaces";
import { useGlobalContext } from "../context/Context";
import useLoader from "../hooks/useLoader";

export default function Home() {
    const { loading, setLoading, loadingDiv } = useLoader();
    const [modules, setModules] = useState<Module[] | []>([]);
    const { currentName } = useGlobalContext();
    let enterprise: string =
        currentName ||
        JSON.parse(localStorage.getItem("companyData") || "{}").name;

    const homeDiv = (): ReactElement => {
        return (
            <div className="main-menu">
                <ModulesMenu modules={modules}></ModulesMenu>
            </div>
        );
    };

    useEffect(() => {
        setModules(getModuleEnterprise(enterprise || ""));
        setLoading(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [enterprise]);

    return <div>{loading ? loadingDiv() : homeDiv()}</div>;
}
