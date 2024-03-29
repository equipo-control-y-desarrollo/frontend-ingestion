import { Formik, Form, Field, ErrorMessage } from "formik";
import { backend_api } from "../../Utils";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { FormProps } from "../../interfaces";
import { ReactElement } from "react";

const CuentaPendienteForm = (props: FormProps): ReactElement => {
  const { update_values, is_update, row } = props;

  const module = JSON.parse(localStorage.getItem("module") || "{}");
  const navigate = useNavigate();

  const estadoCuenta = ["CXP", "Pagada", "Anulada", "Abonado"];

  const clasificacionesCuentas = [
    "Projecto",
    "Cancha",
    "Academia",
    "Cafetería",
    "Otros",
  ];

  const estadoOptions = estadoCuenta.map((product, key) => (
    <option value={product} key={key}>
      {product}
    </option>
  ));

  const clasificacionOptions = clasificacionesCuentas.map((product, key) => (
    <option value={product} key={key}>
      {product}
    </option>
  ));

  const validationSchema = Yup.object({
    proyecto: Yup.string().required("Esto campo es obligatorio").max(50),
    nit: Yup.string().optional().max(30),
    proveedor: Yup.string().optional().max(100),
    nfactura: Yup.string().optional().max(20),
    fecha_recibido: Yup.string().required("Esto campo es obligatorio").max(10),
    fecha_vencida: Yup.string().required("Esto campo es obligatorio").max(10),
    estado: Yup.string()
      .required("Esto campo es obligatorio")
      .oneOf(estadoCuenta),
    clasificacion: Yup.string()
      .required("Este campo es obligatorio")
      .oneOf(clasificacionesCuentas),
    inmediato: Yup.number().optional().min(0),
    dias_30: Yup.number().optional().min(0),
    dias_60: Yup.number().optional().min(0),
    empresa_id: Yup.number()
      .required("Esto campo es obligatorio")
      .integer()
      .min(1),
  });

  const renderError = (message: string) => (
    <p className="help is-danger">{message}</p>
  );

  const onSubmit = async (values: object) => {
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
      }).then(() => {
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
            <label htmlFor="proyecto">Nombre del proyecto</label>
            <Field
              name="proyecto"
              type="text"
              className="input-field-add"
              placeholder="Ingrese el nombre del proyecto"
            />
            <ErrorMessage name="proyecto" render={renderError} />
          </div>
          <div className="add-view-field">
            <label htmlFor="nit">NIT</label>
            <Field
              name="nit"
              type="text"
              className="input-field-add"
              placeholder="Ingrese el NIT de la empresa"
            />
            <ErrorMessage name="nit" render={renderError} />
          </div>
          <div className="add-view-field">
            <label htmlFor="proveedor">Proveedor</label>
            <Field
              name="proveedor"
              type="text"
              className="input-field-add"
              placeholder="Ingrese el nombre del proveedor"
            />
            <ErrorMessage name="proveedor" render={renderError} />
          </div>
          <div className="add-view-field">
            <label htmlFor="nfactura">Numero de la factura</label>
            <Field
              name="nfactura"
              type="text"
              className="input-field-add"
              placeholder="Ingrese el numero de la factura"
            />
            <ErrorMessage name="nfactura" render={renderError} />
          </div>
          <div className="add-view-field">
            <label htmlFor="fecha_recibido">
              Fecha de recibido de la factura
            </label>
            <Field
              name="fecha_recibido"
              type="date"
              className="input-field-add"
              placeholder="Ingrese la fecha de recibido"
            ></Field>
            <ErrorMessage name="fecha_recibidos" render={renderError} />
          </div>
          <div className="add-view-field">
            <label htmlFor="fecha_vencida">
              Fecha de vencimiento de la factura
            </label>
            <Field
              name="fecha_vencida"
              type="date"
              className="input-field-add"
              placeholder="Ingrese la fecha de vencimiento"
            ></Field>
            <ErrorMessage name="fecha_vencida" render={renderError} />
          </div>
          <div className="add-view-field">
            <label htmlFor="estado">Estado</label>
            <Field
              name="estado"
              type="text"
              className="input-field-add"
              placeholder="Ingrese el estado de la cuenta"
              as="select"
            >
              <option value={""}>Seleccione el estado de la cuenta</option>
              {estadoOptions}
            </Field>
            <ErrorMessage name="estado" render={renderError} />
          </div>
          <div className="add-view-field">
            <label htmlFor="clasificacion">Clasificación</label>
            <Field
              name="clasificacion"
              type="text"
              className="input-field-add"
              placeholder="Ingrese la clasificacion de pago"
              as="select"
            >
              <option value={""}>Seleccione la clasificación de pago</option>
              {clasificacionOptions}
            </Field>
            <ErrorMessage name="clasificacion" render={renderError} />
          </div>
          <div className="add-view-field">
            <label htmlFor="inmediato">Inmediato</label>
            <Field
              name="inmediato"
              type="number"
              className="input-field-add"
              placeholder="Ingrese el inmediato"
            />
            <ErrorMessage name="inmediato" render={renderError} />
          </div>
          <div className="add-view-field">
            <label htmlFor="dias_30">Dias 30</label>
            <Field
              name="dias_30"
              type="number"
              className="input-field-add"
              placeholder="Ingrese el valor en dias 30"
            />
            <ErrorMessage name="dias_30" render={renderError} />
          </div>
          <div className="add-view-field">
            <label htmlFor="dias_60">Dias 60</label>
            <Field
              name="dias_60"
              type="number"
              className="input-field-add"
              placeholder="Ingrese el valor en dias 60"
            />
            <ErrorMessage name="dias_60" render={renderError} />
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

export default CuentaPendienteForm;
