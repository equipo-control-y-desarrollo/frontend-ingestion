import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Spinner, Button } from "@chakra-ui/react";
import Swal from "sweetalert2";
import { useCompany } from "../components/Layouts/LayoutVertical";
import { backend_api, checkAuth } from "../Utils/util";
import CuentasForm from "../components/Forms/CuentasForm";
import CarteraForm from "../components/Forms/CarteraForm";
import RegistroVentasForm from "../components/Forms/RegistroVentasForm";
import FlujoCajaForm from "../components/Forms/FlujoCajaForm";
import CuentaPendienteForm from "../components/Forms/CuentaPendienteForm";
import CuadroVentasForm from "../components/Forms/CuadroVentasForm";
import CategoriasForm from "../components/Forms/CategoriaForm";
import MovimientosForm from "../components/Forms/MovimientosForm";

export default function AddRow() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<any>({});
    const navigate = useNavigate();
    const location = useLocation();

    let id_enterprise =
        useCompany().idCompany ||
        JSON.parse(localStorage.getItem("companyData") || "{}").id;

    const data_state = location.state;
    const module = JSON.parse(localStorage.getItem("module") || "{}");

    useEffect(() => {
        if (checkAuth()) {
            if (data_state.isEdit) {
                console.log(`We are editing a new row ${data_state.id}`);
                backend_api
                    .get(`${module.query}/${data_state.id}`)
                    .then((res) => {
                        setData(res.data.data);
                        setLoading(false);
                    })
                    .catch((err) => {
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "¡Algo ha salido mal! por favor intenta más tarde",
                        }).then((res) => {
                            navigate("../error", {
                                replace: true,
                            });
                        });
                    });
            } else {
                setData({ ...data, empresa_id: id_enterprise });
                setLoading(false);
            }
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Debes iniciar sesion para poder ingresar a esta ruta",
            }).then((res) => {
                navigate("../../", {
                    replace: true,
                });
            });
        }
    }, []);

    const selectForm = (module: string) => {
        switch (module) {
            case "Cuadro de ventas":
                return (
                    <CuadroVentasForm
                        is_update={data_state.isEdit}
                        update_values={data}
                        row={data_state.id}
                    />
                );
            case "Cartera":
                return (
                    <CarteraForm
                        is_update={data_state.isEdit}
                        update_values={data}
                        row={data_state.id}
                    />
                );
            case "Cuentas bancarias":
                return (
                    <CuentasForm
                        is_update={data_state.isEdit}
                        update_values={data}
                        row={data_state.id}
                    />
                );
            case "Cuentas por pagar":
                return (
                    <CuentaPendienteForm
                        is_update={data_state.isEdit}
                        update_values={data}
                        row={data_state.id}
                    />
                );
            case "Flujo de caja":
                return (
                    <FlujoCajaForm
                        is_update={data_state.isEdit}
                        update_values={data}
                        row={data_state.id}
                    />
                );
            case "Categoria":
                return (
                    <CategoriasForm
                        is_update={data_state.isEdit}
                        update_values={{
                            ...data,
                            flujo_caja_id: localStorage.getItem(
                                "father_module_row_id"
                            ),
                        }}
                        row={data_state.id}
                    />
                );
            case "Movimientos":
                return (
                    <MovimientosForm
                        is_update={data_state.isEdit}
                        update_values={{
                            ...data,
                            cuenta_id: localStorage.getItem(
                                "father_module_row_id"
                            ),
                        }}
                        row={data_state.id}
                    />
                );
            default:
                return (
                    <RegistroVentasForm
                        is_update={data_state.isEdit}
                        update_values={data}
                        row={data_state.id}
                    />
                );
        }
    };

    const addDiv = () => {
        return (
            <div className="addView-page">
                <h2 className="titleShow">Creación en {module.name}</h2>
                {selectForm(module.name)}
                <div className="buttons">
                    <Button colorScheme="gray" onClick={() => navigate(-1)}>
                        Ir atras
                    </Button>
                </div>
            </div>
        );
    };

    const loadingDiv = () => {
        return (
            <div className="loading">
                <Spinner size="xl" color="blue.500" />
                <h2>Cargando</h2>
            </div>
        );
    };

    return <div>{loading ? loadingDiv() : addDiv()}</div>;
}
