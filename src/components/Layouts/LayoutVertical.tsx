import React, { useEffect, useState } from "react"
import VerticalNavbar from "../VerticalNavbar"
import { Outlet, useOutletContext } from 'react-router-dom';
import { backend_api } from "../../Utils/util";
import Swal from "sweetalert2";

type ContextType = {company: string, idCompany: string};

export default function Layout() {

    const [company, setCompany] = useState<string>('');
    const [listCompanies, setListCompanies] = useState<{}[]>([]);
    const [idCompany, setIdCompany] = useState<string>('8');
    
    const regex = /\/home\/(modules|\w+)/gm;

    useEffect(() => {
        backend_api.get('empresa').then((res) => {
            console.log(res.data);
        })
        backend_api.get('empresa/user').then((res) => {
            console.log('Setting companies')
            setListCompanies(res.data);
        }).catch((err) => {
            console.log(err);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: '¡Algo ha salido mal! por favor intenta más tarde',
            })
        })
    }, [])

    const companiesTest = [{name: "Empresa 1", id: 8}, {name: "Empresa 2", id: 8}, {name: "Empresa 3", id: 8}, {name: "Empresa 4", id: 8}, {name: "Empresa 5", id: 8}];

    const selectEnterprise = (event: any) => {
        let current_page : string = window.location.pathname;
        console.log(current_page);
        if(regex.test(current_page)){
            console.log("Entre");
            let elements : any = document.getElementsByClassName("company");
            console.log(`Enterprise selected: ${event.target.innerText} id ${event.target.dataset.value}`);
            setCompany(event.target.innerText);
            setIdCompany(event.target.dataset.value)
            for (let i = 0; i < elements.length; i++) {
                if(elements[i].innerText === event.target.innerText){
                    elements[i].style.backgroundColor = 'white';
                    elements[i].style.color = "black";
                }else{
                    elements[i].style.backgroundColor = '#00171F';
                    elements[i].style.color = "white";
                }
            }
        }
    };

    return (
        <div className="Layout">
            <VerticalNavbar companies={listCompanies.length === 0 ? companiesTest : listCompanies} chooseCompany={selectEnterprise} logoImage="https://i.ibb.co/0nQqZ1F/Logo-1.png"></VerticalNavbar>
            <main>
                <Outlet context={{company, idCompany}}/>
            </main>
        </div>
    )
}

export function useCompany(){
    return useOutletContext<ContextType>();
}



