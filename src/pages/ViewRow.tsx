import { ReactElement, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Button } from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";
import useLoader from "../hooks/useLoader";
import { getRow } from "../services/rows";
import { messageModal } from "../Utils";

export default function ViewRow() {
  const { loading, setLoading, loadingDiv } = useLoader();
  const [data, setData] = useState({} as any);

  const navigate = useNavigate();
  const location = useLocation();
  const id = location.state.id;

  const module = JSON.parse(localStorage.getItem("module") || "{}");

  useEffect(() => {
    const getCurrenRow = async (query: string) => {
      const res = await getRow(query);
      setData(res.data.data);
      setLoading(false);
    };
    const query = `${module.query}/${id}`;
    try {
      getCurrenRow(query);
    } catch (error) {
      messageModal({
        iconType: "error",
        title: "Oops...",
        text: "Ha ocurrido un error en el servidor, por favor, intente más tarde",
        next: () => {
          navigate("../../error", {
            replace: true,
          });
        },
      });
    } finally {
      setLoading(false);
    }
  }, []);

  const generateRows = (): ReactElement[] => {
    const rows = [];
    for (let i = 0; i < Object.keys(data).length; i++) {
      const curr: string = Object.keys(data)[i].toString();
      if (data[curr]) {
        const date: boolean = curr.includes("fecha") || curr.includes("date");
        const res: string = date
          ? data[curr].toString().substring(0, 10)
          : data[curr].toString();
        rows.push(
          <div className="fieldData" key={curr}>
            <h2>{curr}</h2>
            <input value={res} readOnly={true}></input>
          </div>,
        );
      } else {
        rows.push(
          <div className="fieldData" key={curr}>
            <h2>{curr}</h2>
            <input value="N/A"></input>
          </div>,
        );
      }
    }
    return rows;
  };

  const checkIfHasSubmodules = (): ReactElement => {
    if (module.submodules.length > 0) {
      const module_name = module.submodules[0].name;
      return (
        <Button
          colorScheme={"teal"}
          onClick={() => {
            localStorage.setItem(
              "module",
              JSON.stringify({
                query: module.submodules[0].value,
                name: module.submodules[0].name,
                submodules: [],
              }),
            );
            const data_query =
              module_name === "Categoria" ? `flujo/${id}` : `cuenta/${id}`;
            localStorage.setItem("father_module_row_id", id);
            navigate(`../${module_name}`, {
              state: { query: data_query },
            });
          }}
        >
          Ver {module_name}
        </Button>
      );
    }
    return <></>;
  };

  const editElement = (): void => {
    Swal.fire({
      icon: "info",
      title: "Editando",
      text: "¿Estas seguro que deseas editar el siguiente registro?",
      showCancelButton: true,
      confirmButtonText: "Si",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(`../edit/${id}`, {
          replace: true,
          state: { id: id, isEdit: true },
        });
      }
    });
  };

  const showData = (): ReactElement => {
    return (
      <div className="viewDataGrid">
        <h2 className="titleShow">Registro {id}</h2>
        <div className="displayDataGrid">{generateRows()}</div>
        <div className="buttons">
          <Button colorScheme="gray" onClick={() => navigate(-1)}>
            Ir atras
          </Button>
          <Button colorScheme="whatsapp" onClick={() => editElement()}>
            Editar elemento
          </Button>
          {checkIfHasSubmodules()}
        </div>
      </div>
    );
  };

  return <div>{loading ? loadingDiv() : showData()}</div>;
}
