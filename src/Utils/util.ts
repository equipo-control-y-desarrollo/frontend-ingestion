import {
    faBagShopping,
    faBox,
    faBuildingColumns,
    faCashRegister,
    faFileInvoice,
    faWallet,
    faArrowsTurnToDots,
    faBook,
    IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const backend_api = axios.create({
    withCredentials: true,
    baseURL: "https://ingestion-powerapp.azurewebsites.net",
});

function match_module_icon(module: string): IconDefinition {
    switch (module) {
        case "Cuentas por pagar":
            return faFileInvoice;
        case "Cartera":
            return faWallet;
        case "Cuentas Bancarias":
            return faBuildingColumns;
        case "Flujo de caja":
            return faBox;
        case "Cuadro de ventas":
            return faCashRegister;
        case "Movimientos":
            return faArrowsTurnToDots;
        case "Categoria":
            return faBook;
        default:
            return faBagShopping;
    }
}

function checkAuth(): boolean {
    return cookies.get("token") ? true : false;
}

function checkModule(module: string, enterprise: string): boolean {
    if (
        (module === "Registro de ventas" && !enterprise.includes("Jaula")) ||
        (module === "Cuadro de ventas" && !enterprise.includes("Cafe"))
    ) {
        return false;
    }
    return true;
}

export { backend_api, match_module_icon, checkModule, checkAuth };
