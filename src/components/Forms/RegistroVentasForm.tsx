import { Formik, Form, Field, ErrorMessage } from 'formik';
import { backend_api } from '../../Utils/util';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import * as Yup from "yup";

const RegistroVentasForm = ({is_update, update_values, row}: {is_update: boolean, update_values: {}, row: string}) => {

    const module = JSON.parse(localStorage.getItem('module') || '{}')
    const navigate = useNavigate();

    const validationSchema = Yup.object({
        fecha: Yup.string().required().max(10),
        empresa_id : Yup.number().required().integer().positive(),
        cantidad: Yup.number().required().integer().positive().default(1),
        producto: Yup.string().required().max(20),
        valor_total: Yup.number().required().integer().positive(),
    })

    const renderError = (message: string) => <p className="help is-danger">{message}</p>;

    const initialValues = {
        fecha: "",
        empresa_id: "",
        cantidad: "",
        producto: "",
    }

    const onSubmit = async (values: any) => {
        values = validationSchema.cast(values, {stripUnknown: true});
        alert(JSON.stringify(values, null, 2));
        try{
            if(!is_update) await backend_api.post(`${module.query}`, {...values}) 
            else await backend_api.put(`${module.query}/${row}`, {...values})
        }catch(e){
            console.log(e)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: '¡Algo ha salido mal! por favor intenta más tarde',
            }).then((res) => {
                return;
            })
        }
        Swal.fire({
            icon: 'success',
            title: 'Creación exitosa',
            text: `El registro fue creado en la tabla ${module.name} fue realizado de manera exitosa. ¿Desea crear uno nuevo o regresar al menu?`,
            showDenyButton: true,
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonText: 'Crear otro',
            denyButtonText: `Ir al menu de modulos`,
        }).then((res) => {
            if(!res.isConfirmed){
                navigate('../modules', {replace: true});
            }
        })
    }

    return (
        <div className='form-container'>
            <Formik
                initialValues={!is_update ? initialValues : update_values}
                validationSchema={validationSchema}
                onSubmit={async (values) => {
                    await onSubmit(values);
                }}
            >
                <Form>
                    <div className="add-view-field">
                        <label htmlFor='fecha'>
                            Fecha de la venta
                        </label>
                        <Field
                            name="fecha"
                            type="date"
                            className="input-field-add"
                            placeholder='Ingrese la fecha'
                        />
                        <ErrorMessage name="fecha" render={renderError}/>
                    </div>
                    <div className="add-view-field">
                        <label htmlFor='empresa_id'>
                            ID de la empresa
                        </label>
                        <Field
                            name="empresa_id"
                            type="number"
                            className="input-field-add"
                            placeholder='Ingrese el ID de la empresa'
                        />
                        <ErrorMessage name="empresa_id" render={renderError}/>
                    </div>
                    <div className="add-view-field">
                        <label htmlFor='cantidad'>
                            Cantidad del producto
                        </label>
                        <Field
                            name="cantidad"
                            type="number"
                            className="input-field-add"
                            placeholder='Ingrese la cantidad de productos'
                        />
                        <ErrorMessage name="cantidad" render={renderError}/>
                    </div>
                    <div className="add-view-field">
                        <label htmlFor='producto'>
                            Nombre del producto
                        </label>
                        <Field
                            name="producto"
                            type="text"
                            className="input-field-add"
                            placeholder='Ingrese el nombre producto'
                        >
                        </Field>
                        <ErrorMessage name="producto" render={renderError}/>
                    </div>
                    <div className="add-view-field">
                        <label htmlFor='valor_total'>
                            Valor total de la venta
                        </label>
                        <Field
                            name="valor_total"
                            type="number"
                            className="input-field-add"
                            placeholder='Ingrese el coste total'
                        >
                        </Field>
                        <ErrorMessage name="valor_total" render={renderError}/>
                    </div>
                    <button type="submit">Enviar</button>
                </Form>
            </Formik>
        </div>
    )
}

export default RegistroVentasForm;