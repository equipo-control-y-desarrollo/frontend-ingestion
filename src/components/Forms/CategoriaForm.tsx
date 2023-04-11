import { Formik, Form, Field, ErrorMessage } from "formik";
import { backend_api } from "../../Utils/util";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as Yup from "yup";

const CategoriasForm = ({
    is_update,
    update_values,
    row,
}: {
    is_update: boolean;
    update_values: any;
    row: string;
}) => {
    const module = JSON.parse(localStorage.getItem("module") || "{}");
    const navigate = useNavigate();

    const clearDates = () => {
        if (update_values.fecha_factura)
            update_values.fecha_factura = update_values.fecha_factura.substring(
                0,
                10
            );
        if (update_values.fecha_vencimiento)
            update_values.fecha_vencimiento =
                update_values.fecha_vencimiento.substring(0, 10);
    };

    clearDates();

    const validationSchema = Yup.object({
        flujo_cada_id: Yup.number()
            .required("Esto campo es obligatorio")
            .integer()
            .min(0),
        descripcion: Yup.string().required("Esto campo es obligatorio").max(20),
        efectivo: Yup.number().required("Esto campo es obligatorio").min(0),
        datafono: Yup.number().required("Esto campo es obligatorio").min(0),
        transferencia: Yup.number()
            .required("Esto campo es obligatorio")
            .min(0),
        gastos: Yup.number().required("Esto campo es obligatorio").min(0),
    });

    const renderError = (message: string) => (
        <p className="help is-danger">{message}</p>
    );

    const onSubmit = async (values: any) => {
        values = validationSchema.cast(values, { stripUnknown: true });
        try {
            if (!is_update)
                await backend_api.post(`${module.query}`, { ...values });
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
                initialValues={update_values}
                validationSchema={validationSchema}
                onSubmit={async (values) => {
                    await onSubmit(values);
                }}
            >
                <Form id="moduleForm">
                    <div className="add-view-field">
                        <label htmlFor="flujo_caja_id">
                            ID del Flujo de caja
                        </label>
                        <Field
                            name="flujo_caja_id"
                            type="number"
                            className="input-field-add"
                            placeholder="Ingrese el ID"
                        />
                        <ErrorMessage
                            name="flujo_caja_id"
                            render={renderError}
                        />
                    </div>
                    <div className="add-view-field">
                        <label htmlFor="descripcion">Descripción</label>
                        <Field
                            name="descripcion"
                            type="text"
                            className="input-field-add"
                            placeholder="Ingrese la descripcion"
                        />
                        <ErrorMessage name="descripcion" render={renderError} />
                    </div>
                    <div className="add-view-field">
                        <label htmlFor="efectivo">Efectivo</label>
                        <Field
                            name="efectivo"
                            type="number"
                            className="input-field-add"
                            placeholder="Ingrese la cantidad de efectivo"
                        />
                        <ErrorMessage name="datafono" render={renderError} />
                    </div>
                    <div className="add-view-field">
                        <label htmlFor="datafono">Datafono</label>
                        <Field
                            name="datafono"
                            type="number"
                            className="input-field-add"
                            placeholder="Ingrese la cantidad por datafono"
                        />
                        <ErrorMessage name="datafono" render={renderError} />
                    </div>
                    <div className="add-view-field">
                        <label htmlFor="transferencia">Transferencia</label>
                        <Field
                            name="transferencia"
                            type="number"
                            className="input-field-add"
                            placeholder="Ingrese la cantidad por transferencia"
                        />
                        <ErrorMessage
                            name="transferencia"
                            render={renderError}
                        />
                    </div>
                    <div className="add-view-field">
                        <label htmlFor="gastos">Gastos</label>
                        <Field
                            name="gastos"
                            type="number"
                            className="input-field-add"
                            placeholder="Ingrese la cantidad de gastos"
                        />
                        <ErrorMessage name="gastos" render={renderError} />
                    </div>
                </Form>
            </Formik>
        </div>
    );
};

export default CategoriasForm;
