import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "./Context";
import propsModules from "../interfaces";
import Swal from "sweetalert2";

export default function ModulesMenu({
    modules,
}: {
    modules: propsModules[] | [];
}) {
    const navigate = useNavigate();
    const { currentName } = useGlobalContext() || {};

    const selectModule = (
        module_value: string,
        module_name: string,
        module_submodel: unknown[]
    ) => {
        console.log(`Module selected: ${module_name}`);
        if (currentName !== "") {
            localStorage.setItem(
                "module",
                JSON.stringify({
                    query: module_value,
                    name: module_name,
                    submodules: module_submodel,
                })
            );
            navigate(`../${module_name}`);
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Por favor, seleccione una empresa",
            });
        }
    };

    const showModules = () => {
        return modules.map((module) => {
            return (
                <div
                    key={module.name}
                    className="module grow"
                    onClick={() =>
                        selectModule(
                            module.value,
                            module.name,
                            module.submodules
                        )
                    }
                >
                    <FontAwesomeIcon icon={module.icon} size="2x" />
                    <h3>{module.name}</h3>
                </div>
            );
        });
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
