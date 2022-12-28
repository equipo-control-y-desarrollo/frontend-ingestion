import React, { useEffect, useState } from "react";
import { backend_api } from "../Utils/util";
import Swal from "sweetalert2";
import { Spinner, Button } from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

export default function ViewRow() {
    const [data, setData] = useState({} as any);
    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const id = location.state.id;

    const module = JSON.parse(localStorage.getItem("module") || "{}");

    useEffect(() => {
        console.log(`Fetching data for the row with id: ${id}`);
        backend_api
            .get(`${module.query}/${id}`)
            .then((res) => {
                console.log(`Success : ${res.data}`);
                setData(res.data.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Error fetching data",
                    footer: "Please try again later",
                });
                setLoading(false);
                setIsError(true);
            });
    }, []);

    const loadingDiv = () => {
        return (
            <div className="loading">
                <Spinner size="xl" color="blue.500" />
                <h2>Cargando</h2>
            </div>
        );
    };

    const displayError = () => {
        return (
            <div className="error">
                <h2>Error 500</h2>
            </div>
        );
    };

    const generateRows = () => {
        let rows = [];
        for (let i = 0; i < Object.keys(data).length; i++) {
            let curr: string = Object.keys(data)[i].toString();
            let date: boolean = curr.includes("fecha") || curr.includes("date");
            let res: string = date
                ? data[curr].toString().substring(0, 10)
                : data[curr].toString();
            rows.push(
                <div className="fieldData">
                    <h2>{curr}</h2>
                    <input value={res} readOnly={true}></input>
                </div>
            );
        }
        return rows;
    };

    const editElement = () => {
        console.log(`Editing element with id: ${id}`);
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

    const showData = () => {
        let data_rows = generateRows();
        return (
            <div className="viewDataGrid">
                <h2 className="titleShow">Registro {id}</h2>
                <div className="displayDataGrid">{data_rows}</div>
                <div className="buttons">
                    <Button colorScheme="gray" onClick={() => navigate(-1)}>
                        Ir atras
                    </Button>
                    <Button
                        colorScheme="whatsapp"
                        onClick={() => editElement()}
                    >
                        Editar elemento
                    </Button>
                </div>
            </div>
        );
    };

    return (
        <div>
            {loading ? loadingDiv() : isError ? displayError() : showData()}
        </div>
    );
}
