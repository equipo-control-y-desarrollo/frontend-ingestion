import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { useCompany } from "./Layouts/LayoutVertical";
import propsModules from "../interfaces";
import Swal from "sweetalert2";

export default function ModulesMenu({modules} : {modules: propsModules[] | []}){
    
    const navigate = useNavigate();
    const {company} = useCompany();

    const selectModule = (module_value: string, module_name: string) => {
        console.log(`Module selected: ${module_name}`);
        if(company !== ""){
            let data = {query: module_value, name: module_name}
            localStorage.setItem('module', JSON.stringify(data));   
            navigate(`../${module_name}`, {replace: true});
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Por favor, seleccione una empresa',
            });
        }
    };

    const showModules = () => {
        return modules.map((module) => {
            return (
                <div key={module.name} className="module grow" onClick={() => selectModule(module.value, module.name)}>
                    <FontAwesomeIcon icon={module.icon} size="2x"/>
                    <h3>{module.name}</h3>
                </div>
            )
        })}


    return (
        <div className="modules-menu">
            <h2>Registros</h2>
            <div className="modules-container">
                {company !== '' ? showModules() : ""}
            </div>
        </div>
    )
}