import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState} from "react";
import { backend_api } from "../Utils/util";
import Swal from 'sweetalert2';
import Axios from "axios";


export default function AddRow(){

    const [loading, setLoading] = useState(true);
    const [columns, setColumns] = useState<any>([]);
    const [data, setData] = useState<any>([]);
    const navigate = useNavigate();
    const location  = useLocation();

    const data_state = location.state;

    console.log('We are making an edit:', data_state.isEdit);

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
                setColumns(data);
                console.log(columns)
            })
        }
    }, [])

    return(
        <div className="addView">
            <hr className="blueLine"></hr>
            Form 1
            <hr className="blueLine"></hr>
            Form 2
        </div>
    )
}