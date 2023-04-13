import { Formik, Form, Field, ErrorMessage } from "formik";
import { backend_api } from "../../Utils/util";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FormProps } from ".";
import * as Yup from "yup";

const GastoForm = (props: FormProps) => {
  const { update_values, is_update, row } = props;
  const module = JSON.parse(localStorage.getItem("module") || "{}");
  const navigate = useNavigate();

  const clearDates = () => {
    if (update_values.fecha)
      update_values.fecha = update_values.fecha.substring(0, 10);
  };

  clearDates();

  const validationSchema = Yup.object({
    fecha: Yup.string().required("Esto campo es obligatorio").max(10),
    empresa_id: Yup.number()
      .required("Esto campo es obligatorio")
      .integer()
      .min(0),
    nombre: Yup.string().required("Esto campo es obligatorio").min(5),
    valor_total: Yup.number().required("Este campo es obligatorio").min(0),
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
        initialValues={update_values}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          await onSubmit(values);
        }}
      >
        <Form id="moduleForm">
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
            <label htmlFor="empresa_id">ID de la empresa</label>
            <Field
              name="empresa_id"
              type="number"
              className="input-field-add"
              placeholder="Ingrese el proyecto"
            />
            <ErrorMessage name="empresa_id" render={renderError} />
          </div>
          <div className="add-view-field">
            <label htmlFor="nombre">Nombre del producto o servicio</label>
            <Field
              name="nombre"
              type="text"
              className="input-field-add"
              placeholder="Ingrese el nombre"
            />
            <ErrorMessage name="nombre" render={renderError} />
          </div>
          <div className="add-view-field">
            <label htmlFor="valor_total">Valor total</label>
            <Field
              name="valor_total"
              type="number"
              className="input-field-add"
              placeholder="Ingrese el valor total"
            ></Field>
            <ErrorMessage name="valor_total" render={renderError} />
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default GastoForm;
