import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState} from "react";
import { Spinner, Input, Button} from "@chakra-ui/react";
import Swal from 'sweetalert2';
import Axios from "axios";
import { useCompany } from "../components/Layouts/LayoutVertical";
import { backend_api } from "../Utils/util";


export default function AddRow(){

    const [loading, setLoading] = useState(true);
    const [columns, setColumns] = useState<string[]>([]);
    const [data, setData] = useState<any>({});
    const [updatable,setUpdatable] = useState<string[]>([]);
    let enterprise = useCompany().idCompany;
    const navigate = useNavigate();
    const location  = useLocation();

    const data_state = location.state;
    const module = JSON.parse(localStorage.getItem('module') || '{}')

    useEffect(() => {
        backend_api.get(`${module.query}/schema`).then((res) => {
                setColumns(res.data);
        })
        if (data_state.isEdit) {
            console.log(`We are editing a new row ${data_state.id}`);
            backend_api.get(`${module.query}/1`).then((res) => {
                setData(res.data.data);
                setUpdatable(res.data.updatable)
                setLoading(false)
            }).catch((err) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: '¡Algo ha salido mal! por favor intenta más tarde',
                })
            });
        }else{
            setLoading(false);
        }
    }, [])

    const handleDataChange = (event: any) => {
        setData({
            ...data,
            [event.target.name]: event.target.value 
        })
    }

    const sendData = () => {
        const empresa = document.querySelector('[name="empresa_id"]');
        if(empresa) setData({...data,'empresa_id': enterprise,})
        if(!data_state.isEdit){
            backend_api.post(`${module.query}`, {
                ...data
            })
            .then((res) => {
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
            })
            .catch((err) => {
                console.log(err);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: '¡Algo ha salido mal! por favor intenta más tarde',
                })
            })
        }else{
            backend_api.put(`${module.query}/${data_state.id}`)
            .then((res) => {
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
            })
            .catch((err) => {
                console.log(err);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: '¡Algo ha salido mal! por favor intenta más tarde',
                })
            })
        }
    }

    const createField = (low: number ,upper: number ) => {
        let fields = []
        for(let i = low; i < upper; i++){
            let curr : string = String(data[columns[i]]);
            let date : boolean = curr.includes('fecha') || curr.includes('date');
            let is_update : boolean = !updatable.includes(columns[i]);
            fields.push(
                <div className="add-view-field" key={columns[i]}>
                    <h2>{columns[i]}</h2>
                    <Input
                    name={columns[i]}
                    className="input-field-add"
                    placeholder={`Escriba la ${columns[i]}`}
                    onChange={handleDataChange}
                    value={columns[i].includes('empresa_id') ? enterprise : data_state.isEdit ? curr : ""}
                    size="md"
                    type={date === true ? 'date' : 'text'}
                    readOnly={columns[i].includes('empresa_id') ? true : data_state.isEdit ? is_update : false}
                    />
                </div>
            )
        }
        return fields;
    }

    const addDiv = () => {
        return(
            <div className="addView-Cols">
                <h2 className='titleShow'>Creación en {module.name}</h2>
                <div className="addView-Rows">
                    <div className="add-form">
                        <hr className="blueLine"></hr>
                        <div className="form">
                            {createField(0,(columns.length / 2) >> 0)} 
                        </div> 
                    </div>
                    <div className="add-form">
                        <hr className="blueLine"></hr>
                        <div className="form">
                            {createField((columns.length / 2) >> 0, columns.length)} 
                        </div> 
                    </div>
                </div>
                <div className="buttons">
                    <Button colorScheme='gray' onClick={() => navigate('../modules', {replace: true})}>Ir atras</Button>
                    <Button colorScheme='whatsapp' onClick={() => sendData()}>{data_state.isEdit ? 'Editar Registro' : 'Crear Registro'}</Button>
                </div>
            </div>

        )
    }

    const loadingDiv = () => {
        return (
            <div className="loading">
                <Spinner size="xl" color="blue.500"/>
                <h2>Cargando</h2>
            </div>
        );
    }

    return(
        <div>
            {loading ? 
            loadingDiv() : 
            addDiv()}
        </div>
    )
}