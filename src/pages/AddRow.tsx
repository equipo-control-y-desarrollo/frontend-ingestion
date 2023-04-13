import { useNavigate, useLocation } from "react-router-dom";
import { ReactElement, useEffect, useState } from "react";
import { Button } from "@chakra-ui/react";
import { useGlobalContext } from "../context/Context";
import useLoader from "../hooks/useLoader";
import { addRow } from "../services/rows";
import { messageModal } from "../Utils/util";
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
  const { loading, setLoading, loadingDiv } = useLoader();
  const [data, setData] = useState<object>({});
  const navigate = useNavigate();
  const location = useLocation();

  const { currentID } = useGlobalContext();

  let id_enterprise: string =
    currentID || JSON.parse(localStorage.getItem("companyData") || "{}").id;

  const data_state = location.state;
  const module = JSON.parse(localStorage.getItem("module") || "{}");

  useEffect(() => {
    const addNewRow = async (isEdit: boolean) => {
      if (isEdit) {
        const query = `${module.query}`;
        const res = await addRow(query);
        setData(res.data.data);
        setLoading(false);
      } else {
        setData({ ...data, empresa_id: id_enterprise });
        setLoading(false);
      }
    };
    try {
      addNewRow(data_state.isEdit);
    } catch (error) {
      messageModal({
        iconType: "error",
        title: "Oops...",
        text: "Ha ocurrido un error en el servidor, por favor, intente más tarde",
        next: () => {
          navigate("../../error", { replace: true });
        },
      });
      throw new Error();
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
              flujo_caja_id: localStorage.getItem("father_module_row_id"),
            }}
            row={data_state.id}
          />
        );
      case "Movimientos":
        return (
          <MovimientosForm
            is_update={data_state.isEdit}
            update_values={
              data_state.isEdit
                ? data
                : {
                    ...data,
                    saldo_inicial: data_state.previous_data["saldo"],
                    cuenta_id: localStorage.getItem("father_module_row_id"),
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
          <Button colorScheme="blackAlpha" onClick={() => navigate(-1)}>
            Ir atras
          </Button>
          <Button colorScheme="whatsapp" type="submit" form="moduleForm">
            {data_state.isEdit ? "Editar Registro" : "Crear Registro"}
          </Button>
        </div>
      </div>
    );
  };

  return <div>{loading ? loadingDiv() : addDiv()}</div>;
}
