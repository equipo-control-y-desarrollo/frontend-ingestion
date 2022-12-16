import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { useCompany } from "./Layouts/LayoutVertical";
import propsModules from "../interfaces";
import Swal from "sweetalert2";

export default function ModulesMenu({modules} : {modules: propsModules[] | []}){
    
    const navigate = useNavigate();
    const {company} = useCompany();

    const selectModule = (module: string) => {
        console.log(`Module selected: ${module}`);
        if(company !== ""){
            localStorage.setItem('module', module);   
            navigate(`../${module}`, {replace: true});
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Por favor, seleccione una empresa',
            });
        }
    };

    return (
        <div className="modules-menu">
            <h2>Registros</h2>
            <div className="modules-container">
                {modules.map((module) => {
                    return (
                        <div key={module.name} className="module grow" onClick={() => selectModule(module.name)}>
                            <FontAwesomeIcon icon={module.icon} size="2x"/>
                            <h3>{module.name}</h3>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}