import { Formik, Form, Field, ErrorMessage } from "formik";
import { backend_api } from "../../Utils/util";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as Yup from "yup";

const CuadroVentasForm = ({
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
        empresa_id: Yup.number().required().integer().positive(),
        ventas_manana: Yup.number().optional().positive().default(0),
        ventas_tarde: Yup.number().optional().positive().default(0),
        efectivo: Yup.number().optional().positive().default(0),
        datafono: Yup.number().optional().positive().default(0),
        transferencia: Yup.number().optional().positive().default(0),
        propinas: Yup.number().optional().positive().default(0),
        iva: Yup.number().optional().positive().default(0),
        hipoconsumo: Yup.number().optional().positive().default(0),
        tks: Yup.number().required().integer().positive(),
        epayco: Yup.number().optional().positive().default(0),
        ventas_cafe: Yup.number().optional().positive().default(0),
        ventas_bar: Yup.number().optional().positive().default(0),
        ventas_mercado: Yup.number().optional().positive().default(0),
        gastos_caja_menor: Yup.number().optional().positive().default(0),
        fecha: Yup.string().required().max(10),
        horas_reserva: Yup.number().optional().integer().positive(),
    });

    const renderError = (message: string) => (
        <p className="help is-danger">{message}</p>
    );

    const initialValues = {
        empresa_id: "",
        ventas_manana: "",
        ventas_tarde: "",
        efectivo: "",
        datafono: "",
        transferencia: "",
        propinas: "",
        iva: "",
        hipoconsumo: "",
        tks: "",
        epayco: "",
        ventas_cafe: "",
        ventas_bar: "",
        ventas_mercado: "",
        gastos_caja_menor: "",
        fecha: "",
        horas_reserva: "",
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
                        <label htmlFor="empresa_id">ID de la empresa</label>
                        <Field
                            name="empresa_id"
                            type="number"
                            className="input-field-add"
                            placeholder="Ingrese el ID de la empresa"
                        />
                        <ErrorMessage name="empresa_id" render={renderError} />
                    </div>
                    <div className="add-view-field">
                        <label htmlFor="ventas_manana">
                            Ventas de la mañana
                        </label>
                        <Field
                            name="ventas_manana"
                            type="number"
                            className="input-field-add"
                            placeholder="Ingrese la cantidad de ventas"
                        ></Field>
                        <ErrorMessage
                            name="ventas_manana"
                            render={renderError}
                        />
                    </div>
                    <div className="add-view-field">
                        <label htmlFor="ventas_tarde">Ventas de la tarde</label>
                        <Field
                            name="ventas_tarde"
                            type="number"
                            className="input-field-add"
                            placeholder="Ingrese la cantidad de ventas"
                        ></Field>
                        <ErrorMessage
                            name="ventas_tarde"
                            render={renderError}
                        />
                    </div>
                    <div className="add-view-field">
                        <label htmlFor="efectivo">Cantidad en efectivo</label>
                        <Field
                            name="efectivo"
                            type="number"
                            className="input-field-add"
                            placeholder="Ingrese la cantidad en efectivo"
                        />
                        <ErrorMessage name="efectivo" render={renderError} />
                    </div>
                    <div className="add-view-field">
                        <label htmlFor="datafono">Cantidad en datafono</label>
                        <Field
                            name="datafono"
                            type="number"
                            className="input-field-add"
                            placeholder="Ingrese la cantidad en datafano"
                        />
                        <ErrorMessage name="datafono" render={renderError} />
                    </div>
                    <div className="add-view-field">
                        <label htmlFor="transferencia">
                            Cantidad por datafono
                        </label>
                        <Field
                            name="transferencia"
                            type="number"
                            className="input-field-add"
                            placeholder="Ingrese la cantidad por datafono"
                        />
                        <ErrorMessage
                            name="transferencia"
                            render={renderError}
                        />
                    </div>
                    <div className="add-view-field">
                        <label htmlFor="propinas">Propinas</label>
                        <Field
                            name="propinas"
                            type="number"
                            className="input-field-add"
                            placeholder="Ingrese las propinas"
                        />
                        <ErrorMessage name="propinas" render={renderError} />
                    </div>
                    <div className="add-view-field">
                        <label htmlFor="iva">IVA</label>
                        <Field
                            name="iva"
                            type="number"
                            className="input-field-add"
                            placeholder="Ingrese el IVA"
                        />
                        <ErrorMessage name="iva" render={renderError} />
                    </div>
                    <div className="add-view-field">
                        <label htmlFor="hipoconsumo">Hipoconsumo</label>
                        <Field
                            name="hipoconsumo"
                            type="number"
                            className="input-field-add"
                            placeholder="Ingrese el hipoconsumo"
                        />
                        <ErrorMessage name="hipoconsumo" render={renderError} />
                    </div>
                    <div className="add-view-field">
                        <label htmlFor="tks">TKS</label>
                        <Field
                            name="tks"
                            type="number"
                            className="input-field-add"
                            placeholder="Ingrese el TKS"
                        />
                        <ErrorMessage name="tks" render={renderError} />
                    </div>
                    <div className="add-view-field">
                        <label htmlFor="epayco">EPayCo</label>
                        <Field
                            name="epayco"
                            type="number"
                            className="input-field-add"
                            placeholder="Ingrese por EPayCo"
                        />
                        <ErrorMessage name="epayco" render={renderError} />
                    </div>
                    <div className="add-view-field">
                        <label htmlFor="ventas_cafe">Ventas del cafe</label>
                        <Field
                            name="ventas_cafe"
                            type="number"
                            className="input-field-add"
                            placeholder="Ingrese las ventas en cafe"
                        />
                        <ErrorMessage name="ventas_cafe" render={renderError} />
                    </div>
                    <div className="add-view-field">
                        <label htmlFor="ventas_bar">Ventas del bar</label>
                        <Field
                            name="ventas_bar"
                            type="number"
                            className="input-field-add"
                            placeholder="Ingrese las ventas en bar"
                        />
                        <ErrorMessage name="ventas_bar" render={renderError} />
                    </div>
                    <div className="add-view-field">
                        <label htmlFor="ventas_mercado">
                            Ventas del mercado
                        </label>
                        <Field
                            name="ventas_mercado"
                            type="number"
                            className="input-field-add"
                            placeholder="Ingrese las ventas del mercado"
                        />
                        <ErrorMessage
                            name="ventas_mercado"
                            render={renderError}
                        />
                    </div>
                    <div className="add-view-field">
                        <label htmlFor="gastos_caja_menor">
                            Gastos caja menor
                        </label>
                        <Field
                            name="gastos_caja_menor"
                            type="number"
                            className="input-field-add"
                            placeholder="Ingrese los gastos de la caja menor"
                        />
                        <ErrorMessage
                            name="gastos_caja_menor"
                            render={renderError}
                        />
                    </div>
                    <div className="add-view-field">
                        <label htmlFor="fecha">Fecha</label>
                        <Field
                            name="fecha"
                            type="date"
                            className="input-field-add"
                            placeholder="Ingrese la fecha"
                        ></Field>
                        <ErrorMessage name="fecha" render={renderError} />
                    </div>
                    <button type="submit">Enviar</button>
                </Form>
            </Formik>
        </div>
    );
};

export default CuadroVentasForm;