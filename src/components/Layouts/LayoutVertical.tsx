import React, { useEffect, useState } from "react"
import VerticalNavbar from "../VerticalNavbar"
import { Outlet } from 'react-router-dom';
import useLocalStorage from "../../hooks/useLocalStorage";

export default function Layout() {

    const companiesTest = ["Empresa 1", "Empresa 2", "Empresa 3", "Empresa 4", "Empresa 5", "Empresa 6", "Empresa 7", "Empresa 8", "Empresa 9", "Empresa 10"];

    const selectEnterprise = (event: any) => {
        let elements : any = document.getElementsByClassName("company");
        console.log(`Enterprise selected: ${event.target.innerText}`);
        localStorage.setItem('enterprise', event.target.innerText);
        window.dispatchEvent(new Event("storage"));
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
                <Outlet/>
            </main>
        </div>
    )
}