import {useState, useEffect} from 'react';
import { Spinner } from '@chakra-ui/react'; 
import { backend_api } from '../Utils/util';
import VerticalNavbar from '../components/VerticalNavbar';
import Swal from 'sweetalert2';

export default function ViewRegister(){

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Query to get the register
        /*
        backend_api.get('/').then((response) => {

        }).catch((error) => {
        */
       setTimeout(() => setLoading(false),1000);
    },[]);

    const viewDiv = () => {
        return (
            <div>

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

    return (
        <div>
            {loading ? loadingDiv() : viewDiv()}
        </div>
    )
}