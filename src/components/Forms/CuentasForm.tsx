import { Formik, Form, Field, ErrorMessage } from "formik";
import { backend_api } from "../../Utils/util";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as Yup from "yup";

const CuentasForm = ({
    is_update,
    update_values,
    row,
}: {
    is_update: boolean;
    update_values: {};
    row: string;
}) => {
    let tiposCuenta = ["corriente", "ahorros", "fiducuenta"];
    const module = JSON.parse(localStorage.getItem("module") || "{}");
    const navigate = useNavigate();

    const cuentasOptions = tiposCuenta.map((product, key) => (
        <option value={product} key={key}>
            {product}
        </option>
    ));

    const validationSchema = Yup.object({
        banco: Yup.string().required().max(20),
        empresa_id: Yup.number().required().positive().integer(),
        numero: Yup.string().required().max(20),
        tipo: Yup.string()
            .required()
            .oneOf(["corriente", "ahorros", "fiducuenta"]),
    });

    const renderError = (message: string) => (
        <p className="help is-danger">{message}</p>
    );

    const initialValues = {
        banco: "",
        empresa_id: "",
        numero: "",
        tipo: "",
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
                        <label htmlFor="banco">Banco</label>
                        <Field
                            name="banco"
                            type="text"
                            className="input-field-add"
                            placeholder="Ingrese el nombre del banco"
                        />
                        <ErrorMessage name="banco" render={renderError} />
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
                        <label htmlFor="numero">Numero de cuenta</label>
                        <Field
                            name="numero"
                            type="text"
                            className="input-field-add"
                            placeholder="Ingrese el numero de cuenta"
                        />
                        <ErrorMessage name="numero" render={renderError} />
                    </div>
                    <div className="add-view-field">
                        <label htmlFor="tipoCuenta">
                            Ingrese el tipo de cuenta
                        </label>
                        <Field
                            name="tipo"
                            type="text"
                            className="input-field-add"
                            placeholder="Ingrese el tipo de cuenta"
                            as="select"
                        >
                            <option value={""}>
                                Seleccione un tipo de cuenta
                            </option>
                            {cuentasOptions}
                        </Field>
                        <ErrorMessage name="tipo" render={renderError} />
                    </div>
                    <button type="submit">Enviar</button>
                </Form>
            </Formik>
        </div>
    );
};

export default CuentasForm;