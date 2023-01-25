import React, { useEffect, useState } from "react";
import VerticalNavbar from "../VerticalNavbar";
import { Outlet, useOutletContext } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { backend_api, checkAuth } from "../../Utils/util";
import Swal from "sweetalert2";

type ContextType = { company: string; idCompany: string };

export default function Layout() {
    const [company, setCompany] = useState<string>("");
    const [listCompanies, setListCompanies] = useState<{}[]>([]);
    const [idCompany, setIdCompany] = useState<string>("2");
    const navigate = useNavigate();

    const regex = /\/home\/modules/gm;

    useEffect(() => {
        if (checkAuth()) {
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
                    }).then((res) => {
                        navigate("../../error", {
                            replace: true,
                        });
                    });
                });
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Debes iniciar sesion para poder ingresar a esta ruta",
            }).then((res) => {
                navigate("../../", {
                    replace: true,
                });
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="Layout">
            <VerticalNavbar
                companies={listCompanies}
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
