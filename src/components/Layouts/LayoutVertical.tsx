import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import VerticalNavbar from "../VerticalNavbar";
import { useNavigate } from "react-router-dom";
import { backend_api, checkAuth } from "../../Utils/util";
import Swal from "sweetalert2";
import { Company } from "../../interfaces";

export default function Layout() {
    const [listCompanies, setListCompanies] = useState<Company[]>([]);
    const navigate = useNavigate();

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
                <Outlet></Outlet>
            </main>
        </div>
    );
}
