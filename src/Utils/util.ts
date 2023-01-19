import {
    faBagShopping,
    faBox,
    faBuildingColumns,
    faCashRegister,
    faFileInvoice,
    faWallet,
    faArrowsTurnToDots,
    faBook,
    faMoneyBillTransfer,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const backend_api = axios.create({
    withCredentials: true,
    baseURL: "https://ingestion-powerapp.azurewebsites.net",
});

const modules = [
    {
        name: "Cuentas por pagar",
        value: "cuentas_pendientes",
        submodules: [],
        icon: faFileInvoice,
    },
    {
        name: "Cartera",
        value: "carteras",
        submodules: [],
        icon: faWallet,
    },
    {
        name: "Cuentas bancarias",
        value: "cuentas",
        submodules: [
            {
                name: "Movimientos",
                value: "cuentas/movimientos",
                submodules: [],
                icon: faArrowsTurnToDots,
            },
        ],
        icon: faBuildingColumns,
    },
    {
        name: "Flujo de caja",
        value: "flujoscaja",
        submodules: [
            {
                name: "Categoria",
                value: "flujoscaja/categorias",
                submodules: [],
                icon: faBook,
            },
        ],
        icon: faBox,
    },
    {
        name: "Cuadro de ventas",
        value: "ventas/cuadros",
        submodules: [],
        icon: faCashRegister,
    },
    {
        name: "Registro de ventas",
        value: "ventas",
        submodules: [],
        icon: faBagShopping,
    },
    {
        name: "Gastos",
        value: "gastos",
        submodules: [],
        icon: faMoneyBillTransfer,
    },
];

const getModuleEnterprise = (enterprise: string) => {
    if (enterprise.includes("CAFE")) {
        return [modules[1], modules[4], modules[6]];
    } else if (enterprise.includes("JAULA")) {
        return [modules[1], modules[5], modules[6]];
    } else {
        return [modules[0], modules[1], modules[2]];
    }
};

function checkAuth(): boolean {
    return cookies.get("token") ? true : false;
}

function crucialData(data: any) {
    const module = JSON.parse(localStorage.getItem("module") || "{}");
    switch (module.name) {
        case "Cuentas por pagar":
            return `${data.proveedor || "N/A"} - ${data.nfactura || "N/A"}`;
        case "Cartera":
            return `${data.proyecto || "N/A"} ${data.cliente || "N/A"} - ${
                data.nro_factura || "N/A"
            }`;
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

function checkModuleDownload(module: string): boolean {
    if (module === "Flujo de caja" || module === "Cuentas bancarias") {
        return false;
    }
    return true;
}

export {
    getModuleEnterprise,
    checkModuleDownload,
    backend_api,
    checkAuth,
    crucialData,
};
