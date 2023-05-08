import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGlobalContext } from "../../context/Context";
import { Module } from "../../interfaces";
import { ReactElement } from "react";
import { messageModal } from "../../Utils";

export interface Props {
  modules?: Module[] | [];
}

export default function ModulesMenu(props: Props) {
  const { modules } = props;

  const navigate = useNavigate();
  const { currentName } = useGlobalContext() || {};

  const selectModule = (
    module_value: string,
    module_name: string,
    module_submodel: Module[],
  ): void => {
    if (currentName !== "") {
      localStorage.setItem(
        "module",
        JSON.stringify({
          query: module_value,
          name: module_name,
          submodules: module_submodel,
        }),
      );
      navigate(`../${module_name}`);
    } else {
      messageModal({
        iconType: "error",
        title: "Oops...",
        text: "Por favor, seleccione una empresa",
      });
    }
  };

  const showModules = (): ReactElement[] | ReactElement => {
    if (modules) {
      return modules.map((module) => {
        return (
          <div
            key={module.name}
            className="module grow"
            onClick={() =>
              selectModule(module.value, module.name, module.submodules)
            }
          >
            <FontAwesomeIcon icon={module.icon} size="2x" />
            <h3>{module.name}</h3>
          </div>
        );
      });
    }
    return <div>No hay modulos para esta empresa</div>;
  };

  return (
    <div className="modules-menu">
      <h2>Registros</h2>
      <div className="modules-container">
        {currentName !== "" ? showModules() : ""}
      </div>
    </div>
  );
}
