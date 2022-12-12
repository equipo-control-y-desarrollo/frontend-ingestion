import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileInvoice, faWallet, faBuildingColumns  } from '@fortawesome/free-solid-svg-icons';
import { faBox, faCashRegister, faBagShopping  } from '@fortawesome/free-solid-svg-icons';
import Swal from "sweetalert2";

export default function ModulesMenu(){
    
    const navigate = useNavigate();

    const modulesTest = [
        {name: "Cuentas por pagar", icon: faFileInvoice},
        {name: "Cartera", icon: faWallet },
        {name: "Cuentas bancarias", icon: faBuildingColumns},
        {name: "Flujo de caja", icon: faBox},
        {name: "Cuadro de ventas", icon: faCashRegister},
        {name: "Registro de ventas", icon: faBagShopping}
    ];

    const selectModule = (module: string) => {
        console.log(`Module selected: ${module}`);
        let enterprise = localStorage.getItem('enterprise');
        if(enterprise !== ""){
            localStorage.setItem('module', module);   
            navigate(`../${enterprise}`, {replace: true, state: {enterprise: enterprise, module: module}});
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
                {modulesTest.map((module) => {
                    return (
                        <div className="module grow" onClick={() => selectModule(module.name)}>
                            <FontAwesomeIcon icon={module.icon} size="2x"/>
                            <h3>{module.name}</h3>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}