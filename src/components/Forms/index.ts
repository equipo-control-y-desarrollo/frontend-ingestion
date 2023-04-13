import CuentasForm from "./CuentasForm";
import CarteraForm from "./CarteraForm";
import RegistroVentasForm from "./RegistroVentasForm";
import FlujoCajaForm from "./FlujoCajaForm";
import CuentaPendienteForm from "./CuentaPendienteForm";
import CuadroVentasForm from "./CuadroVentasForm";
import CategoriasForm from "./CategoriaForm";
import MovimientosForm from "./MovimientosForm";
import GastoForm from "./GastoForm";

export interface FormProps {
  is_update: boolean;
  update_values: any;
  row: any;
}


const Form = (form_name: any, state: any, props: FormProps, data?: any) : any => {
  const {isEdit, data_state} = state;
  switch (form_name) {
    case "Cuentas bancarias":
      return <CuentasForm {...props}/>;
    case "Cartera":
      return <CarteraForm {...props}/>;
    case "Registro de ventas":
      return <RegistroVentasForm {...props}/>;
    case "Flujo de caja":
      return <FlujoCajaForm {...props}/>;
    case "Cuentas por pagar":
      return <CuentaPendienteForm {...props}/>;
    case "Cuadro de ventas":
      return <CuadroVentasForm {...props}/>;
    case "Categoria":
      return <CategoriasForm {
        ...props,
        update_values: {
          ...data,
          flujo_caja_id: localStorage.getItem("father_module_row_id"),
        }
      }/>;    
    case "Movimientos":
      return <MovimientosForm {...props, update_values: isEdit ? data : {
            ...data,
            saldo_inicial:
                data_state.previous_data["saldo"],
            cuenta_id: localStorage.getItem(
                "father_module_row_id"
            )
          }
        }/>;
    case "Gastos":
      return <GastoForm props}/>;
    default:
      throw new Error("Form not found");  
    }
} 

export default Form;