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
    update_values: any;
    row: string;
}) => {
    const module = JSON.parse(localStorage.getItem("module") || "{}");
    const navigate = useNavigate();

    const clearDates = () => {
        if (update_values.fecha)
            update_values.fecha = update_values.fecha.substring(0, 10);
    };

    clearDates();

    const validationSchema = Yup.object({
        empresa_id: Yup.number()
            .required("Esto campo es obligatorio")
            .integer()
            .positive(),
        ventas_ma_ana: Yup.number().optional().min(0),
        ventas_tarde: Yup.number().optional().min(0),
        efectivo: Yup.number().optional().min(0),
        datafono: Yup.number().optional().min(0),
        transferencia: Yup.number().optional().min(0),
        propinas: Yup.number().optional().min(0),
        iva: Yup.number().optional().min(0),
        hipoconsumo: Yup.number().optional().min(0),
        tks: Yup.number().required("Esto campo es obligatorio").min(0),
        rappi: Yup.number().optional().min(0),
        ventas_cafe: Yup.number().optional().min(0),
        ventas_bar: Yup.number().optional().min(0),
        ventas_mercado: Yup.number().optional().min(0),
        gastos_caja_menor: Yup.number().optional().min(0),
        fecha: Yup.string().required("Esto campo es obligatorio").max(10),
        horas_reserva: Yup.number().optional().integer(),
    });

    const renderError = (message: string) => (
        <p className="help is-danger">{message}</p>
    );

    const onSubmit = async (values: any) => {
        values = validationSchema.cast(values, { stripUnknown: true });
        values = {
            ...values,
            ventas_mañana: values.ventas_ma_ana || 0,
        }
        delete values.ventas_ma_ana;
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
                initialValues={update_values}
                validationSchema={validationSchema}
                onSubmit={async (values) => {
                    await onSubmit(values);
                }}
            >
                <Form id="moduleForm">
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
                        <label htmlFor="ventas_ma_ana">
                            Ventas de la mañana
                        </label>
                        <Field
                            name="ventas_ma_ana"
                            type="number"
                            className="input-field-add"
                            placeholder="Ingrese la cantidad de ventas"
                        ></Field>
                        <ErrorMessage
                            name="ventas_ma_ana"
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
                            Cantidad por transferencia
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
                        <label htmlFor="hipoconsumo">Impoconsumo</label>
                        <Field
                            name="hipoconsumo"
                            type="number"
                            className="input-field-add"
                            placeholder="Ingrese el Impoconsumo"
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
                        <label htmlFor="Rappi">Rappi</label>
                        <Field
                            name="rappi"
                            type="number"
                            className="input-field-add"
                            placeholder="Ingrese por Rappi"
                        />
                        <ErrorMessage name="rappi" render={renderError} />
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
                    <div className="add-view-field">
                        <label htmlFor="horas_reserva">Horas a reservar</label>
                        <Field
                            name="horas_reserva"
                            type="number"
                            className="input-field-add"
                            placeholder="Ingrese el numero de horas a reservar"
                        />
                        <ErrorMessage
                            name="horas_reserva"
                            render={renderError}
                        />
                    </div>
                </Form>
            </Formik>
        </div>
    );
};

export default CuadroVentasForm;
