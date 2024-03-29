import { Formik, Form, Field, ErrorMessage } from "formik";
import { backend_api } from "../../Utils";
import { useNavigate } from "react-router-dom";
import { FormProps } from "../../interfaces";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { ReactElement } from "react";

const CarteraForm = (props: FormProps): ReactElement => {
  const { update_values, is_update, row } = props;
  const module = JSON.parse(localStorage.getItem("module") || "{}");
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    valor: Yup.number().required("Esto campo es obligatorio").integer().min(0),
    valor_abonado: Yup.number().required("Este campo es obligatorio").min(0),
    fecha_factura: Yup.string().required("Esto campo es obligatorio").max(10),
    fecha_vencimiento: Yup.string()
      .required("Esto campo es obligatorio")
      .max(10),
    estado: Yup.boolean().optional().default(false),
    nro_factura: Yup.string().required("Esto campo es obligatorio").min(5),
    cliente: Yup.string().required("Este campo es obligatorio").min(0),
    proyecto: Yup.string().optional(),
    empresa_id: Yup.number()
      .required("Esto campo es obligatorio")
      .integer()
      .min(0),
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
            <label htmlFor="valor">Valor de la cartera</label>
            <Field
              name="valor"
              type="number"
              className="input-field-add"
              placeholder="Ingrese el valor de la cartera"
            />
            <ErrorMessage name="valor" render={renderError} />
          </div>
          <div className="add-view-field">
            <label htmlFor="valor_abonado">Valor abonado</label>
            <Field
              name="valor_abonado"
              type="number"
              className="input-field-add"
              placeholder="Ingrese el valor abonado"
            />
            <ErrorMessage name="valor_abonado" render={renderError} />
          </div>
          <div className="add-view-field">
            <label htmlFor="fecha_factura">
              Fecha de creación de la factura
            </label>
            <Field
              name="fecha_factura"
              type="date"
              className="input-field-add"
              placeholder="Ingrese la fecha"
            />
            <ErrorMessage name="fecha_factura" render={renderError} />
          </div>
          <div className="add-view-field">
            <label htmlFor="fecha_vencimiento">
              Fecha de vencimiento de la factura
            </label>
            <Field
              name="fecha_vencimiento"
              type="date"
              className="input-field-add"
              placeholder="Ingrese la fecha"
            ></Field>
            <ErrorMessage name="fecha_vencimiento" render={renderError} />
          </div>
          <div className="add-view-field">
            <label htmlFor="estado">¿Estado de la factura?</label>
            <label>
              <Field type="checkbox" name="estado" />
              Pagada
            </label>
            <ErrorMessage name="estado" render={renderError} />
          </div>
          <div className="add-view-field">
            <label htmlFor="nro_factura">Numero de la factura</label>
            <Field
              name="nro_factura"
              type="text"
              className="input-field-add"
              placeholder="Ingrese el numero de la factura"
            />
            <ErrorMessage name="nro_factura" render={renderError} />
          </div>
          <div className="add-view-field">
            <label htmlFor="proyecto">Proyecto</label>
            <Field
              name="proyecto"
              type="text"
              className="input-field-add"
              placeholder="Ingrese el nombre del proyecto"
            />
            <ErrorMessage name="proyecto" render={renderError} />
          </div>
          <div className="add-view-field">
            <label htmlFor="cliente">Cliente</label>
            <Field
              name="cliente"
              type="text"
              className="input-field-add"
              placeholder="Ingrese el nombre del cliente"
            />
            <ErrorMessage name="cliente" render={renderError} />
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
        </Form>
      </Formik>
    </div>
  );
};

export default CarteraForm;
