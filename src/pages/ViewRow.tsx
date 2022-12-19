import React, {useEffect, useState} from 'react';
import { backend_api } from '../Utils/util';
import Swal from 'sweetalert2';
import { Spinner, Button } from '@chakra-ui/react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

export default function ViewRow(){

    const [data, setData] = useState({} as any);
    const [loading , setLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    
    const navigate = useNavigate();
    const location = useLocation();
    const id = location.state.id;

    useEffect(() => {
        console.log(`Fetching data for the row with id: ${id}`);
        axios.get("https://random-data-api.com/api/v2/users").then((res) => {
            console.log("Success");
            console.log(res.data)
            setData(res.data);
            setLoading(false);
        }).catch((err) => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error fetching data',
                footer: 'Please try again later'
            });
            setLoading(false);
            setIsError(true);
        })
    }, [])

    const loadingDiv = () => {
        return (
            <div className="loading">
                <Spinner size="xl" color="blue.500"/>
                <h2>Cargando</h2>
            </div>
        );
    }

    const displayError = () => {
        return (
            <div className="error">
                <h2>Error 500</h2>
            </div>
        );
    }

    const generateRows = () => {
        let rows = [];
        for(let i = 0; i < Object.keys(data).length; i++){
            let curr : string = Object.keys(data)[i].toString();
            let res : string = data[curr].toString();
            rows.push(
                <div className="fieldData">
                    <h2>{curr}</h2>
                    <input value={res} readOnly={true}></input>
                </div>
            )
        }
        return rows;
    }

    const editElement = () => {
        console.log(`Editing element with id: ${id}`);
        Swal.fire({
            icon: 'info',
            title: 'Editando',
            text: '¿Estas seguro que deseas editar el siguiente registro?',
            showCancelButton: true,
            confirmButtonText: 'Si',
            cancelButtonText: 'No'
        }).then((result) => {
            if(result.isConfirmed){
                navigate(`../edit/${id}`, {replace: true, state: {id: id, isEdit: true}});
            }
        });
    }

    const showData = () => {
        let data_rows = generateRows();
        return(
            <div className="viewDataGrid">
                <h2 className="titleShow">Registro {id}</h2>
                <div className="displayDataGrid">
                    {data_rows}
                </div>
                <div className="buttons">
                    <Button colorScheme='gray' onClick={() => navigate('../modules', {replace: true})}>Ir atras</Button>
                    <Button colorScheme='whatsapp' onClick={() => editElement()}>Editar elemento</Button>
                </div>
            </div>
        )
    };

    return(
        <div>
            {loading ? loadingDiv() : isError ? displayError() : showData() }
        </div>
    )
}