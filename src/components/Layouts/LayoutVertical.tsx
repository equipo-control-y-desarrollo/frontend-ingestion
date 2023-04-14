import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import VerticalNavbar from "../UI/VerticalNavbar";
import { useNavigate } from "react-router-dom";
import { getEmpresas } from "../../services/empresas";
import Swal from "sweetalert2";
import { Company } from "../../interfaces";

export default function Layout() {
  const [listCompanies, setListCompanies] = useState<Company[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getEmpresa = async () => {
      try {
        const empresas: Company[] = await getEmpresas();
        setListCompanies(empresas);
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Algo salió mal!",
          footer: "Por favor, intenta de nuevo",
        }).then(() => {
          navigate("/login");
        });
      }
    };
    getEmpresa();
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
