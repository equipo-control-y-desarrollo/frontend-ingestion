import { IconDefinition } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useNavigate } from "react-router-dom";

export default function ModulesMenu({modules}: {modules: {name: string, icon: IconDefinition}[]}){
    
    const navigate = useNavigate();

    const sendToView = (registerName: string) => {
        navigate(`/view/${registerName}`);
    };

    return (
        <div className="modules-menu">
            <h2>Registros</h2>
            <div className="modules-container">
                {modules.map((module) => {
                    return (
                        <div className="module grow" onClick={() => sendToView(module.name)}>
                            <FontAwesomeIcon icon={module.icon} size="2x"/>
                            <h3>{module.name}</h3>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}