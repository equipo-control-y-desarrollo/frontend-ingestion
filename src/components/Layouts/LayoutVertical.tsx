import React, { useEffect, useState } from "react"
import VerticalNavbar from "../VerticalNavbar"
import { Outlet, useOutletContext } from 'react-router-dom';

type ContextType = {company: string};

export default function Layout() {

    const [company, setCompany] = useState<string>('');

    const companiesTest = ["Empresa 1", "Empresa 2", "Empresa 3", "Empresa 4", "Empresa 5", "Empresa 6", "Empresa 7", "Empresa 8", "Empresa 9", "Empresa 10"];
    
    const selectEnterprise = (event: any) => {
        let elements : any = document.getElementsByClassName("company");
        console.log(`Enterprise selected: ${event.target.innerText}`);
        setCompany(event.target.innerText);
        for (let i = 0; i < elements.length; i++) {
            if(elements[i].innerText === event.target.innerText){
                elements[i].style.backgroundColor = 'white';
                elements[i].style.color = "black";
            }else{
                elements[i].style.backgroundColor = '#00171F';
                elements[i].style.color = "white";
            }
        }
    };

    return (
        <div className="Layout">
            <VerticalNavbar companies={companiesTest} chooseCompany={selectEnterprise} logoImage="https://i.ibb.co/0nQqZ1F/Logo-1.png"></VerticalNavbar>
            <main>
                <Outlet context={{company}}/>
            </main>
        </div>
    )
}

export function useCompany(){
    return useOutletContext<ContextType>();
}



