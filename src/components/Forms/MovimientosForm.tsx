import { Formik, Form, Field, ErrorMessage } from "formik";
import { backend_api } from "../../Utils";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { FormProps } from "../../interfaces";
import { ReactElement } from "react";

const MovimientosForm = (props: FormProps): ReactElement => {
  const { update_values, is_update, row } = props;
  const module = JSON.parse(localStorage.getItem("module") || "{}");
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    cuenta_id: Yup.number()
      .required("Esto campo es obligatorio")
      .integer()
      .min(1),
    fecha: Yup.string().required("Esto campo es obligatorio").max(10),
    saldo_inicial: Yup.number().required("Esto campo es obligatorio"),
    ingreso: Yup.number().optional().min(0),
    pago: Yup.number().optional().min(0),
    pago_impuesto: Yup.number().optional().min(0),
    gasto_bancario: Yup.number().optional().min(0),
  });

  const renderError = (message: string) => (
    <p className="help is-danger">{message}</p>
  );

  const onSubmit = async (values: any) => {
    values = validationSchema.cast(values, { stripUnknown: true });
    try {
      if (!is_update) await backend_api.post(`${module.query}`, { ...values });
      else await backend_api.put(`${module.query}/${row}`, { ...values });
    } catch (e) {
      console.log(e);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "¡Algo ha salido mal! por favor intenta más tarde",
      }).then((res) => {
        return;
      });
    }
    Swal.fire({
      icon: "success",
      title: "Creación exitosa",
      text: `El registro fue creado en la tabla ${module.name} fue realizado de manera exitosa. ¿Desea crear uno nuevo o regresar al menu?`,
      showDenyButton: true,
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: "Crear otro",
      denyButtonText: `Ir al menu de modulos`,
    }).then((res) => {
      if (!res.isConfirmed) {
        navigate("../modules", { replace: true });
      }
    });
  };

  return (
    <div className="form-container">
      <Formik
        enableReinitialize
        initialValues={update_values}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          await onSubmit(values);
        }}
      >
        <Form id="moduleForm">
          <div className="add-view-field">
            <label htmlFor="cuenta_id">ID de la cuenta</label>
            <Field
              name="cuenta_id"
              type="number"
              className="input-field-add"
              placeholder="Ingrese el ID de la cuenta"
            />
            <ErrorMessage name="cuenta_id" render={renderError} />
          </div>
          <div className="add-view-field">
            <label htmlFor="fecha">Fecha</label>
            <Field
              name="fecha"
              type="date"
              className="input-field-add"
              placeholder="Ingrese la fecha"
            />
            <ErrorMessage name="fecha" render={renderError} />
          </div>
          <div className="add-view-field">
            <label htmlFor="saldo_inicial">Saldo inicial</label>
            <Field
              name="saldo_inicial"
              type="number"
              className="input-field-add"
              placeholder="Ingrese el saldo inicial"
            />
            <ErrorMessage name="saldo_inicial" render={renderError} />
          </div>
          <div className="add-view-field">
            <label htmlFor="ingreso">Ingreso</label>
            <Field
              name="ingreso"
              type="number"
              className="input-field-add"
              placeholder="Escriba su ingreso"
            />
            <ErrorMessage name="ingreso" render={renderError} />
          </div>
          <div className="add-view-field">
            <label htmlFor="pago">Pago</label>
            <Field
              name="pago"
              type="number"
              className="input-field-add"
              placeholder="Ingrese su pago"
            />
            <ErrorMessage name="pago" render={renderError} />
          </div>
          <div className="add-view-field">
            <label htmlFor="pago_impuesto">Pago impuesto</label>
            <Field
              name="pago_impuesto"
              type="number"
              className="input-field-add"
              placeholder="Ingrese su pago en impuestos"
            />
            <ErrorMessage name="pago_impuesto" render={renderError} />
          </div>
          <div className="add-view-field">
            <label htmlFor="gasto_bancario">Gasto bancario</label>
            <Field
              name="gasto_bancario"
              type="number"
              className="input-field-add"
              placeholder="Ingrese su gasto bancario"
            />
            <ErrorMessage name="gasto_bancario" render={renderError} />
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default MovimientosForm;
