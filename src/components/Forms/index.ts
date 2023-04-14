import { FormProps } from "../../interfaces";
import { ReactElement } from "react";
import CuentasForm from "./CuentasForm";
import CarteraForm from "./CarteraForm";
import RegistroVentasForm from "./RegistroVentasForm";
import FlujoCajaForm from "./FlujoCajaForm";
import CuentaPendienteForm from "./CuentaPendienteForm";
import CategoriasForm from "./CategoriaForm";
import MovimientosForm from "./MovimientosForm";
import CuadroVentasForm from "./CuadroVentasForm";
import GastoForm from "./GastoForm";

interface GenericPropsForm {
    form_name: string;
    state: any;
    formProps: FormProps;
    data?: any;
}

const Form = (props: GenericPropsForm): ReactElement | null => {
    const { form_name, state, formProps, data } = props;
    const { isEdit, data_state } = props.state;
    switch (form_name) {
        case "Cuentas bancarias":
            return CuentasForm({ ...formProps });
        case "Cartera":
            return CarteraForm({ ...formProps });
        case "Registro de ventas":
            return RegistroVentasForm({ ...formProps });
        case "Flujo de caja":
            return FlujoCajaForm({ ...formProps });
        case "Cuentas por pagar":
            return CuentaPendienteForm({ ...formProps });
        case "Cuadro de ventas":
            return CuadroVentasForm({ ...formProps });
        case "Gastos":
            return GastoForm({ ...formProps });
        case "Categoria":
            return CategoriasForm({
                ...formProps,
                update_values: {
                    ...data,
                    flujo_caja_id: localStorage.getItem("father_module_row_id"),
                },
            });
        case "Movimientos":
            return MovimientosForm({
                ...formProps,
                update_values: isEdit
                    ? data
                    : {
                          ...data,
                          saldo_inicial: data_state.previous_data["saldo"],
                          cuenta_id: localStorage.getItem(
                              "father_module_row_id"
                          ),
                      },
            });
        default:
            throw new Error("Form not found");
    }
};

export default Form;
