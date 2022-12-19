import { useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import TableModule from "../components/TableModule"
import { backend_api } from "../Utils/util";
import { useCompany } from "../components/Layouts/LayoutVertical";

export default function ViewModule(){

    const [rows, setRows] = useState([{}]);    
    const navigate = useNavigate();
    let enterprise = useCompany().company;
    let id_enterprise = useCompany().idCompany;
    let module = localStorage.getItem('module');


    console.log(useCompany());
    useEffect(() => {
        backend_api.get(`${module}/empresas/${id_enterprise}`).then((res) => {
            console.log('Fetch Status for the rows: OK')
            console.log(res.data);
            setRows(res.data);
        }).catch(() => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ha ocurrido un error en el servidor, por favor, intente más tarde',
            });
        })
        /*
        setRows([{id: "1", fecha:"9-12-2022"},{id: "2", fecha:"9-12-2022"},{id: "3", fecha:"9-12-2022"},
        {id: "4", fecha:"9-12-2022"},{id: "5", fecha:"9-12-2022"},{id: "6", fecha:"9-12-2022"},{id: "7", fecha:"9-12-2022"}
        ,{id: "8", fecha:"9-12-2022"},{id: "9", fecha:"9-12-2022"}, {id: "10", fecha:"9-12-2022"}]);
        setRows([]);
        */
        console.log("Re-render with new enterprise")
    },[enterprise]);

    const showNoData = () => {
        return (
            <div className="NoData">
                La tabla {module} para la empresa {enterprise} no cuenta con información por el momento :(
            </div>
        )
    }

    return(
        <div className="viewModule">
            <h3>{module} para {enterprise}</h3>
            {rows.length === 0 ? showNoData() : <TableModule rows={rows}/>}
            <div className="buttons">
                <Button id="backButton" colorScheme={"#00171F"} onClick={() => navigate('../modules', {replace: true})}>Ir atras</Button>
                <Button colorScheme='whatsapp' onClick={() => navigate(`../addRow/${module}`, {replace: true, state:{id: -1, isEdit: false}})}>Crear elemento</Button>
            </div>
        </div>
    )
}