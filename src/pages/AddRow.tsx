import { useNavigate, useLocation } from "react-router-dom";
import { ReactElement, useEffect, useState } from "react";
import { Button } from "@chakra-ui/react";
import { useGlobalContext } from "../components/Context";
import { backend_api } from "../Utils/util";
import Swal from "sweetalert2";
import useLoader from "../hooks/useLoader";
import {
    CarteraForm,
    CategoriasForm,
    CuadroVentasForm,
    CuentaPendienteForm,
    CuentasForm,
    FlujoCajaForm,
    GastoForm,
    MovimientosForm,
    RegistroVentasForm,
} from "../components/Forms";

export default function AddRow() {
    const { loading, setLoading, loadingDiv } = useLoader(false);
    const [data, setData] = useState<object>({});
    const navigate = useNavigate();
    const location = useLocation();

    const { currentID } = useGlobalContext();

    let id_enterprise: string =
        currentID || JSON.parse(localStorage.getItem("companyData") || "{}").id;

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const selectForm = (module: string): ReactElement => {
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
                console.log(data_state);
                return (
                    <MovimientosForm
                        is_update={data_state.isEdit}
                        update_values={
                            data_state.isEdit
                                ? data
                                : {
                                      ...data,
                                      saldo_inicial:
                                          data_state.previous_data["saldo"],
                                      cuenta_id: localStorage.getItem(
                                          "father_module_row_id"
                                      ),
                                  }
                        }
                        row={data_state.id}
                    />
                );
            case "Gastos":
                return (
                    <GastoForm
                        is_update={data_state.isEdit}
                        update_values={data}
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

    const addDiv = (): ReactElement => {
        return (
            <div className="addView-page">
                <h2 className="titleShow">Creación en {module.name}</h2>
                {selectForm(module.name)}
                <div className="buttons">
                    <Button
                        colorScheme="blackAlpha"
                        onClick={() => navigate(-1)}
                    >
                        Ir atras
                    </Button>
                    <Button
                        colorScheme="whatsapp"
                        type="submit"
                        form="moduleForm"
                    >
                        {data_state.isEdit
                            ? "Editar Registro"
                            : "Crear Registro"}
                    </Button>
                </div>
            </div>
        );
    };

    return <div>{loading ? loadingDiv() : addDiv()}</div>;
}
