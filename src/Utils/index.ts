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
import { Module } from "../interfaces";
import Swal from "sweetalert2";

const backend_api = axios.create({
    withCredentials: true,
    baseURL: "https://ingestion-powerapp.azurewebsites.net",
});

const modules: Module[] = [
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

const getModuleEnterprise = (enterprise: string): Module[] => {
    let basic_modules = [modules[0], modules[1], modules[2]];
    if (enterprise.includes("CAFE")) {
        return basic_modules.concat(modules[4]);
    } else if (enterprise.includes("JAULA")) {
        return basic_modules.concat(modules[5]);
    } else {
        return basic_modules;
    }
};

function crucialData(data: any): string {
    const module = JSON.parse(localStorage.getItem("module") || "{}");
    switch (module.name) {
        case "Cuentas por pagar":
            return `${data.proveedor || "N/A"} - ${data.nfactura || "N/A"}`;
        case "Cartera":
            return `${data.cliente} - ${data.nro_factura || "N/A"}`;
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

const messageModal = ({
    iconType,
    title,
    text,
    next = () => {},
}: {
    iconType: any;
    title: string;
    text: string;
    next?: () => void;
}) => {
    Swal.fire({
        icon: iconType,
        title: title,
        text: text,
    }).then((res) => {
        next();
    });
};

const formatDates = (dates: any[]): any[] => {
    return dates.map((date: any) => {
        for (const key in date) {
            if (key.includes("fecha")) {
                date[key] = date[key].substring(0, 10);
            }
        }
        return date;
    });
};

const download = (name: string, enterprise: string, data: any) => {
    const filename = `${name}_${enterprise}.xlsx`;
    const url = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    return { link, url };
};

export {
    formatDates,
    download,
    backend_api,
    getModuleEnterprise,
    checkModuleDownload,
    crucialData,
    messageModal,
};
