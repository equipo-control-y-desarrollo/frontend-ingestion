import { useState, useEffect, ReactElement } from "react";
import ModulesMenu from "../components/UI/ModulesMenu";
import { getModuleEnterprise } from "../Utils";
import { Module } from "../interfaces";
import { useGlobalContext } from "../context/Context";
import useLoader from "../hooks/useLoader";

export default function Home() {
  const { loading, setLoading, loadingDiv } = useLoader();
  const [modules, setModules] = useState<Module[] | []>([]);
  const { currentName } = useGlobalContext();
  const enterprise: string =
    currentName || JSON.parse(localStorage.getItem("companyData") || "{}").name;

  const homeDiv = (): ReactElement => {
    return (
      <div className="main-menu animate__animated animate__zoomIn">
        <ModulesMenu modules={modules}></ModulesMenu>
      </div>
    );
  };

  useEffect(() => {
    setModules(getModuleEnterprise(enterprise || ""));
    setLoading(false);
  }, [enterprise]);

  return <div>{loading ? loadingDiv() : homeDiv()}</div>;
}
