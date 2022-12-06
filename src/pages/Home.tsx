import React, {useState, useEffect} from 'react';
import VerticalNavbar from '../components/Layouts/Vertical/VerticalNavbar';
import ModulesMenu from '../components/ModulesMenu';
import { backend_api } from '../Utils/util';
import { faFileInvoice, faWallet, faBuildingColumns  } from '@fortawesome/free-solid-svg-icons';
import { faBox, faCashRegister, faBagShopping  } from '@fortawesome/free-solid-svg-icons';
import { Spinner } from '@chakra-ui/react'
import Swal from 'sweetalert2';
import Layout from '../components/Layouts/Layout';

export default function Home(){

    const [loading, setLoading] = useState(true);
    const [enterprise, setEnterprise] = useState('');

    const modulesTest = [
        {name: "Cuentas por pagar", icon: faFileInvoice},
        {name: "Cartera", icon: faWallet },
        {name: "Cuentas bancarias", icon: faBuildingColumns},
        {name: "Flujo de caja", icon: faBox},
        {name: "Cuadro de ventas", icon: faCashRegister},
        {name: "Registro de ventas", icon: faBagShopping}
    ];

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
                <Layout>
                    <ModulesMenu modules={modulesTest}></ModulesMenu>
                </Layout>
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