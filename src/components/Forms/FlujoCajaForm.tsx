import { Formik, Form, Field, ErrorMessage } from "formik";
import { backend_api } from "../../Utils/util";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as Yup from "yup";

const FlujoCajaForm = ({
    is_update,
    update_values,
    row,
}: {
    is_update: boolean;
    update_values: {};
    row: string;
}) => {
    const module = JSON.parse(localStorage.getItem("module") || "{}");
    const navigate = useNavigate();

    const validationSchema = Yup.object({
        fecha: Yup.string().required().max(10),
        empresa_id: Yup.number().required().integer().positive(),
        saldo_anterior: Yup.number().optional().positive().default(0),
    });

    const renderError = (message: string) => (
        <p className="help is-danger">{message}</p>
    );

    const initialValues = {
        fecha: "",
        empresa_id: "",
        saldo_anterior: "",
    };

    const onSubmit = async (values: any) => {
        values = validationSchema.cast(values, { stripUnknown: true });
        alert(JSON.stringify(values, null, 2));
        try {
            if (!is_update)
                await backend_api.post(`${module.query}`, { ...values });
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
                initialValues={!is_update ? initialValues : update_values}
                validationSchema={validationSchema}
                onSubmit={async (values) => {
                    await onSubmit(values);
                }}
            >
                <Form>
                    <div className="add-view-field">
                        <label htmlFor="fecha">Fecha de creación</label>
                        <Field
                            name="fecha"
                            type="date"
                            className="input-field-add"
                            placeholder="Ingrese la fecha de creación"
                        />
                        <ErrorMessage name="fecha" render={renderError} />
                    </div>
                    <div className="add-view-field">
                        <label htmlFor="empresa_id">ID de la empresa</label>
                        <Field
                            name="empresa_id"
                            type="number"
                            className="input-field-add"
                            placeholder="Ingrese el id de la empresa"
                        />
                        <ErrorMessage name="empresaID" render={renderError} />
                    </div>
                    <div className="add-view-field">
                        <label htmlFor="saldo_anterior">Saldo anterior</label>
                        <Field
                            name="saldo_anterior"
                            type="number"
                            className="input-field-add"
                            placeholder="Ingrese el saldo anterior"
                        />
                        <ErrorMessage
                            name="saldo_anterior"
                            render={renderError}
                        />
                    </div>
                    <button type="submit">Enviar</button>
                </Form>
            </Formik>
        </div>
    );
};

export default FlujoCajaForm;
