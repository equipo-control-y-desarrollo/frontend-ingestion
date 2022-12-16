import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState} from "react";
import { backend_api } from "../Utils/util";
import { Spinner, Input, Button} from "@chakra-ui/react";
import Swal from 'sweetalert2';
import Axios from "axios";

export default function AddRow(){

    const [loading, setLoading] = useState(true);
    const [columns, setColumns] = useState<string[]>([]);
    const [data, setData] = useState<any>({});
    const [dataRes, setDataRes] = useState<any>({})
    const navigate = useNavigate();
    const location  = useLocation();

    const data_state = location.state;

    useEffect(() => {
        if (data_state.isEdit) {
            console.log('We are editing a new row');
            Axios.get('https://random-data-api.com/api/v2/users').then((res) => {
                setData(res.data);
                setDataRes(res.data);
                setColumns(Object.keys(res.data));
                setLoading(false);
            }).catch((err) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: '¡Algo ha salido mal! por favor intenta más tarde',
                })
            });
        }else{
            console.log('We are adding a row');
            Axios.get('https://random-data-api.com/api/v2/users').then((res) => {
                setColumns(Object.keys(res.data));
                setLoading(false);
            })
        }
    }, [])

    const handleDataChange = (event: any) => {
        setData({
            ...data,
            [event.target.name]: event.target.value.length === 0 ? dataRes[event.target.name] : event.target.value 
        })
    }

    const sendData = () => {
        Swal.fire({
            icon: 'success',
            title: 'Creación exitosa',
            text: `El registro fue creado en la tabla ${localStorage.getItem('module')} fue realizado de manera exitosa. ¿Desea crear uno nuevo o regresar al menu?`,
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

    const createField = (low: number ,upper: number ) => {
        let fields = []
        for(let i = low; i < upper; i++){
            let curr : string = columns[i];
            let date : boolean = curr.includes('fecha') || curr.includes('date');
            fields.push(
                <div className="add-view-field" key={curr}>
                    <h2>{curr}</h2>
                    <Input
                    name={curr}
                    className="input-field-add"
                    placeholder={`Escriba la ${curr}`}
                    value={data[curr]}
                    onChange={handleDataChange}
                    size="md"
                    type={date === true ? 'date' : 'text'}
                    />
                </div>
            )
        }
        return fields;
    }

    const addDiv = () => {
        return(
            <div className="addView-Cols">
                <h2 className='titleShow'>Creación en {localStorage.getItem('module')}</h2>
                <div className="addView-Rows">
                    <div className="add-form">
                        <hr className="blueLine"></hr>
                        <div className="form">
                            {createField(0,8)} 
                        </div> 
                    </div>
                    <div className="add-form">
                        <hr className="blueLine"></hr>
                        <div className="form">
                            {createField(8,16)} 
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