import React, { useEffect, useState } from "react";
import VerticalNavbar from "../VerticalNavbar";
import { Outlet, useOutletContext } from "react-router-dom";
import { backend_api } from "../../Utils/util";
import Swal from "sweetalert2";

type ContextType = { company: string; idCompany: string };

export default function Layout() {
    const [company, setCompany] = useState<string>("");
    const [listCompanies, setListCompanies] = useState<{}[]>([]);
    const [idCompany, setIdCompany] = useState<string>("2");

    const regex = /\/home\/modules/gm;

    useEffect(() => {
        backend_api.get("empresas").then((res) => {
            console.log(res.data);
        });
        backend_api
            .get("empresas/user")
            .then((res) => {
                console.log("Setting companies");
                setListCompanies(res.data);
            })
            .catch((err) => {
                console.log(err);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "¡Algo ha salido mal! por favor intenta más tarde",
                });
            });
    }, []);

    const companiesTest = [
        { name: "Jaula", id: 2 },
        { name: "Cafe", id: 2 },
        { name: "Prueba", id: 2 },
        { name: "La Jaula", id: 2 },
        { name: "Cafe el Diario", id: 2 },
    ];

    const selectEnterprise = (event: any) => {
        let current_page: string = window.location.pathname;
        if (regex.test(current_page)) {
            let elements: any = document.getElementsByClassName("company");
            setCompany(event.target.innerText);
            setIdCompany(event.target.dataset.value);
            console.log(elements);
            for (let i = 0; i < elements.length; i++) {
                if (elements[i].innerText === event.target.innerText) {
                    elements[i].style.backgroundColor = "white";
                    elements[i].style.color = "black";
                } else {
                    elements[i].style.backgroundColor = "#00171F";
                    elements[i].style.color = "white";
                }
            }
        }
    };

    return (
        <div className="Layout">
            <VerticalNavbar
                companies={
                    listCompanies.length === 0 ? companiesTest : listCompanies
                }
                chooseCompany={selectEnterprise}
                logoImage="https://i.ibb.co/0nQqZ1F/Logo-1.png"
            ></VerticalNavbar>
            <main>
                <Outlet context={{ company, idCompany }} />
            </main>
        </div>
    );
}

export function useCompany() {
    return useOutletContext<ContextType>();
}
