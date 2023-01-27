import { ReactElement, useState } from "react";
import Swal from "sweetalert2";
import Cookies from "universal-cookie";
import { Spinner } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Input } from "@chakra-ui/react";
import { backend_api } from "../Utils/util";

import "../styles/index.scss";

export default function Login() {
    const [data, setData] = useState<{ username: string; password: string }>({
        username: "",
        password: "",
    });
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const changeData = (event: any): void => {
        setData({
            ...data,
            [event.target.name]: event.target.value,
        });
    };

    const validForm = (): boolean => {
        if (data.username === "" || data.password === "") {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Por favor, ingrese un usuario y contraseña",
            });
            return false;
        }
        return true;
    };

    const sendForm = (event: any): void => {
        event.preventDefault();
        if (!validForm()) return;
        setLoading(true);
        console.log(
            `Sending data to server...(${data.username},${data.password})`
        );
        backend_api
            .post("/auth/login", {
                username: data.username,
                password: data.password,
            })
            .then((res) => {
                console.log(res.data);
                let empresas = res.data.usuario.empresas;
                const cookies = new Cookies();
                console.log("Cookies has been set");
                cookies.set("token", res.data.token, { path: "/" });
                Swal.fire({
                    icon: "success",
                    title: `Bienvenido ${data.username}`,
                    text: "Ingreso exitoso",
                }).then((res) => {
                    navigate("/home/modules", {
                        state: { enterprises: empresas },
                    });
                });
            })
            .catch((err) => {
                console.log(err);
                if (err.response?.message === "Usuario not found") {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Usuario o contraseña incorrectos",
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Oops :(",
                        text: "Error al intentar ingresar, por favor intenté más tarde",
                    });
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const alertForget = (): void => {
        Swal.fire({
            title: "¿Olvidaste tu contraseña?",
            text: "Por favor ponte en contacto con el administrador",
            icon: "question",
            confirmButtonText: "OK",
        });
    };

    const loadingDiv = (): ReactElement => {
        return (
            <div className="loading">
                <Spinner size="xl" color="blue.500" />
                <h2>Cargando</h2>
            </div>
        );
    };

    return (
        <div>
            {loading ? (
                loadingDiv()
            ) : (
                <div className="login-form-container">
                    <form onSubmit={sendForm} id="loginForm">
                        <img alt="YOUR LOGO HERE"></img>
                        <div className="inputs-form-login">
                            <Input
                                onChange={changeData}
                                className="formButton"
                                variant="flushed"
                                name="username"
                                placeholder="Username"
                                type="text"
                            ></Input>
                            <Input
                                onChange={changeData}
                                className="formButton"
                                variant="flushed"
                                name="password"
                                placeholder="Password"
                                type="password"
                            ></Input>
                            <button className="formButton" type="submit">
                                Iniciar Sesión
                            </button>
                            <h4 onClick={alertForget}>
                                ¿Olvidaste tu contraseña?
                            </h4>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}
