import React, {useState, useEffect} from 'react';
import VerticalNavbar from '../components/VerticalNavbar';
import ModulesMenu from '../components/ModulesMenu';
import { backend_api } from '../Utils/util';
import { Spinner } from '@chakra-ui/react'
import Swal from 'sweetalert2';

export default function Home(){

    const [loading, setLoading] = useState(true);

    const companiesTest = ["Empresa 1", "Empresa 2", "Empresa 3", "Empresa 4", "Empresa 5", "Empresa 6", "Empresa 7"];
    const modulesTest = ["Cuentas por pagar","Cartera","Cuentas bancarias","Flujo de caja","Cuadro de ventas","Registro de ventas"];

    const loadingDiv = () => {
        return (
            <div className="loading">
                <Spinner size="xl" color="blue.500"/>
                <h2>Cargando</h2>
            </div>
        );
    }

    const homeDiv = () => {
        return (
            <div className="main-menu">
                <VerticalNavbar logoImage="https://i.ibb.co/0nQqZ1F/Logo-1.png" companies={companiesTest}></VerticalNavbar>
                <ModulesMenu modules={modulesTest}></ModulesMenu>
            </div>
        )
    }

    useEffect(() => {
        /*backend_api.get('/').then((response) => {
            // Query to get the companies 
            backend_api.get('/').then((response) => {
                // Query to get the modules
                setLoading(false);
            })
        }).catch((error) => {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo conectar con el servidor',
            })
        })*/ 
        setTimeout(() => setLoading(false),1000);
    },[]);

    return (
        <div>
            {loading ?
            loadingDiv():
            homeDiv()}
        </div>
    )
}