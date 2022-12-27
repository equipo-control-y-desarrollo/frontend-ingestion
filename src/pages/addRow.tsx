import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState} from "react";
import { Spinner, Input, Button, Center} from "@chakra-ui/react";
import Swal from 'sweetalert2';
import { useCompany } from "../components/Layouts/LayoutVertical";
import { backend_api, checkSchema } from "../Utils/util";
import CuentasForm from "../components/Forms/CuentasForm";


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
        if (data_state.isEdit) {
            console.log(`We are editing a new row ${data_state.id}`);
            backend_api.get(`${module.query}/${data_state.id}`).then((res) => {
                setData(res.data.data);
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
        if(event.target.name.includes('fecha')) event.target.value = event.target.value.substring(0,10)
        setData({
            ...data,
            [event.target.name]: event.target.value 
        })
    }

    const sendData = async () => {
        let data_parse = {};
        const empresa = document.querySelector('[name="empresa_id"]');
        if(empresa) setData({...data,'empresa_id': enterprise})
        try{
            data_parse = checkSchema(module.name).cast(data);
        }catch(e){
            console.log(e)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: '¡Algo ha salido mal! Hay un campo que no fue ingresado o tiene un valor erroneo',
            })
            return;
        }
        try{
        !data_state.isEdit ? await backend_api.post(`${module.query}`, {...data_parse}) : await backend_api.put(`${module.query}/${data_state.id}`, {...data_parse})
        }catch(e){
            console.log(e);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: '¡Algo ha salido mal! por favor intenta más tarde',
            })
            return;
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

    const createField = (low: number ,upper: number ) => {
        let fields = []
        for(let i = low; i < upper; i++){
            let curr : string = String(data[columns[i]]);
            let date : boolean = columns[i].includes('fecha') || columns[i].includes('date');
            let is_update : boolean = !updatable.includes(columns[i]);
            fields.push(
                <div className="add-view-field" key={columns[i]}>
                    <h2>{columns[i]}</h2>
                    <Input
                    name={columns[i]}
                    className="input-field-add"
                    placeholder={`Escriba la ${columns[i]}`}
                    onChange={handleDataChange}
                    value={columns[i].includes('empresa_id') ? enterprise : date ? curr.substring(0,10): curr}
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
                    <CuentasForm is_update={data_state.isEdit} update_values={data_state.isEdit ? data : {}} row={data_state.id}/>
                </div>
                <div className="buttons">
                    <Button colorScheme='gray' onClick={() => navigate(-1)}>Ir atras</Button>
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