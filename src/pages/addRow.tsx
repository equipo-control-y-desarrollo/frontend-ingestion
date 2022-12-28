import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Spinner, Button } from "@chakra-ui/react";
import Swal from "sweetalert2";
import { backend_api } from "../Utils/util";
import CuentasForm from "../components/Forms/CuentasForm";
import CarteraForm from "../components/Forms/CarteraForm";
import RegistroVentasForm from "../components/Forms/RegistroVentasForm";
import FlujoCajaForm from "../components/Forms/FlujoCajaForm";
import CuentaPendienteForm from "../components/Forms/CuentaPendienteForm";
import CuadroVentasForm from "../components/Forms/CuadroVentasForm";
import CategoriasForm from "../components/Forms/CategoriaForm";

export default function AddRow() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<any>({});
    const navigate = useNavigate();
    const location = useLocation();

    const data_state = location.state;
    const module = JSON.parse(localStorage.getItem("module") || "{}");

    useEffect(() => {
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
                    });
                });
        } else {
            setLoading(false);
        }
    }, []);

    const selectForm = (module: string) => {
        switch (module) {
            case "Cuadro de ventas":
                return (
                    <CuadroVentasForm
                        is_update={data_state.isEdit}
                        update_values={data_state.isEdit ? data : {}}
                        row={data_state.id}
                    />
                );
            case "Cartera":
                return (
                    <CarteraForm
                        is_update={data_state.isEdit}
                        update_values={data_state.isEdit ? data : {}}
                        row={data_state.id}
                    />
                );
            case "Cuentas bancarias":
                return (
                    <CuentasForm
                        is_update={data_state.isEdit}
                        update_values={data_state.isEdit ? data : {}}
                        row={data_state.id}
                    />
                );
            case "Cuentas por pagar":
                return (
                    <CuentaPendienteForm
                        is_update={data_state.isEdit}
                        update_values={data_state.isEdit ? data : {}}
                        row={data_state.id}
                    />
                );
            case "Flujo de caja":
                return (
                    <FlujoCajaForm
                        is_update={data_state.isEdit}
                        update_values={data_state.isEdit ? data : {}}
                        row={data_state.id}
                    />
                );
            case "Categoria":
                return (
                    <CategoriasForm
                        is_update={data_state.isEdit}
                        update_values={data_state.isEdit ? data : {}}
                        row={data_state.id}
                    />
                );
            default:
                return (
                    <RegistroVentasForm
                        is_update={data_state.isEdit}
                        update_values={data_state.isEdit ? data : {}}
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
