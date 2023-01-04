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
import { ReactElement, ReactNode } from "react";
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
    let is_cafe = enterprise.includes("CAFE");
    let is_jaula =
        enterprise.includes("JAULA") || enterprise.includes("JAULAS");
    if (
        (module === "Registro de ventas" && !is_jaula) ||
        (module === "Cuadro de ventas" && !is_cafe) ||
        (module === "Flujo de caja" && !is_cafe && !is_jaula)
    ) {
        return false;
    }
    return true;
}

function crucialData(data: any) {
    const module = JSON.parse(localStorage.getItem("module") || "{}");
    console.log(module);
    switch (module.name) {
        case "Cuentas por pagar":
            return `${data.proveedor} - ${data.nfactura}`;
        case "Cartera":
            return `${data.proyecto} - ${data.nro_factura}`;
        case "Cuentas bancarias":
            return `Cuenta ${data.numero}`;
        case "Flujo de caja":
            return data.fecha.substring(0, 10);
        case "Cuadro de ventas":
            return data.fecha.substring(0, 10);
        case "Registro de ventas":
            return data.fecha.substring(0, 10);
        case "Movimientos":
            return data.fecha.substring(0, 10);
        default:
            return data.descripcion;
    }
}

export { backend_api, match_module_icon, checkModule, checkAuth, crucialData };
