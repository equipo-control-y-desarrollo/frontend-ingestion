import TableModule from "../components/TableModule"
import { Navigate, useLocation } from "react-router-dom"
import { backend_api } from "../Utils/util";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import Swal from 'sweetalert2';

export default function ViewModule(){

    const [rows, setRows] = useState([{}]);    
    const location = useLocation();
    const {module} = location.state;
    const navigate = useNavigate();
    const [enterpriseLS, setEnterpriseLS] = useState(localStorage.getItem('enterprise'));

    useEffect(() => {
        window.addEventListener('storage', () => {
            console.log("Change to : " + localStorage.getItem('enterprise'));
            setEnterpriseLS(localStorage.getItem('enterprise'));
        })
        /*backend_api.get("").then((res) => {
            setRows(res.data);
        }).catch(() => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ha ocurrido un error en el servidor, por favor, intente más tarde',
            });
        })
        */
        setRows([{id: "1", fecha:"9-12-2022"},{id: "2", fecha:"9-12-2022"},{id: "3", fecha:"9-12-2022"},
        {id: "4", fecha:"9-12-2022"},{id: "5", fecha:"9-12-2022"},{id: "6", fecha:"9-12-2022"},{id: "7", fecha:"9-12-2022"}
        ,{id: "8", fecha:"9-12-2022"},{id: "9", fecha:"9-12-2022"}, {id: "10", fecha:"9-12-2022"}]);
        //setRows([]);
        console.log("Re-render with new enterprise")
    },[enterpriseLS]);

    const showNoData = () => {
        return (
            <div>
                La tabla {module} para la empresa {enterpriseLS} no cuenta con información por el momento 
            </div>
        )
    }

    return(
        <div className="viewModule">
            <h3>{module} para {enterpriseLS}</h3>
            {rows.length === 0 ? showNoData() : <TableModule rows={rows}/>}
            <div className="buttons">
                <Button colorScheme='gray' onClick={() => navigate('../modules', {replace: true})}>Ir atras</Button>
                <Button colorScheme='whatsapp' onClick={() => navigate(`../addRow/${module}`, {replace: true, state:{id: -1, isEdit: false}})}>Crear elemento</Button>
            </div>
        </div>
    )
}