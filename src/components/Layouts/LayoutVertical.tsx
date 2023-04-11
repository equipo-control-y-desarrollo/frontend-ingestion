import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import VerticalNavbar from "../UI/VerticalNavbar";
import { useNavigate } from "react-router-dom";
import { backend_api } from "../../Utils/util";
import Swal from "sweetalert2";
import { Company } from "../../interfaces";

export default function Layout() {
    const [listCompanies, setListCompanies] = useState<Company[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        backend_api
            .get("empresas/user")
            .then((res) => {
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
