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
import { formatDates } from "../../Utils";

interface GenericPropsForm {
  form_name: string;
  state: any;
  formProps: FormProps;
  data?: any;
}

const Form = (props: GenericPropsForm): ReactElement | null => {
  const { form_name, state, formProps, data } = props;
  const { isEdit, data_state } = state;

  const [clearData, clearFormProps] = formatDates([
    data,
    formProps.update_values,
  ]);

  const formPropsWithClearData = {
    ...formProps,
    update_values: clearFormProps,
  };

  switch (form_name) {
    case "Cuentas bancarias":
      return CuentasForm({ ...formPropsWithClearData });
    case "Cartera":
      return CarteraForm({ ...formPropsWithClearData });
    case "Registro de ventas":
      return RegistroVentasForm({ ...formPropsWithClearData });
    case "Flujo de caja":
      return FlujoCajaForm({ ...formPropsWithClearData });
    case "Cuentas por pagar":
      return CuentaPendienteForm({ ...formPropsWithClearData });
    case "Cuadro de ventas":
      return CuadroVentasForm({ ...formPropsWithClearData });
    case "Gastos":
      return GastoForm({ ...formPropsWithClearData });
    case "Categoria":
      return CategoriasForm({
        ...formPropsWithClearData,
        update_values: {
          ...clearData,
          flujo_caja_id: localStorage.getItem("father_module_row_id"),
        },
      });
    case "Movimientos":
      return MovimientosForm({
        ...formPropsWithClearData,
        update_values: isEdit
          ? clearData
          : {
              ...clearData,
              saldo_inicial: data_state.previous_data["saldo"],
              cuenta_id: localStorage.getItem("father_module_row_id"),
            },
      });
    default:
      throw new Error("Form not found");
  }
};

export default Form;
