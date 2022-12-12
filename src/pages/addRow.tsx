import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState} from "react";
import { backend_api } from "../Utils/util";
import { Spinner } from "@chakra-ui/react";
import Swal from 'sweetalert2';
import Axios from "axios";


export default function AddRow(){

    const [loading, setLoading] = useState(true);
    const [columns, setColumns] = useState<string[]>([]);
    const [data, setData] = useState<any>([]);
    const navigate = useNavigate();
    const location  = useLocation();

    const data_state = location.state;

    useEffect(() => {
        if (data_state.isEdit) {
            console.log('We are editing a new row');
            Axios.get('https://random-data-api.com/api/v2/users').then((res) => {
                setData(res.data);
                setColumns(Object.keys(data));
                setLoading(false);
                console.log(columns);
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
                console.log(columns)
                setLoading(false);
            })
        }
    }, [])

    const createField = (low: number ,upper: number ) => {
        let fields = []
        for(let i = low; i < upper; i++){
            let curr : string = columns[i];
            console.log(curr);
            if(curr.includes('fecha') || curr.includes('date')){
                fields.push(
                <div>
                    Fecha
                </div>)
            }else{
                fields.push(
                    <div>
                        Text
                    </div>
                )
            }
        }
        return fields;
    }

    const addDiv = () => {
        return(
            <div className="addView">
                <hr className="blueLine"></hr>
                <div className="add-form">
                    {createField(0,8)}
                </div>
                <hr className="blueLine"></hr>
                <div className="add-form">
                    {createField(8,16)} 
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