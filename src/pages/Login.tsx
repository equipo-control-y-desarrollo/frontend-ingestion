import { useState } from "react";
import Swal from "sweetalert2";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { Input } from "@chakra-ui/react";
import "../styles/index.scss";
import { login } from "../services/login";

export default function Login() {

    const [data, setData] = useState<{ username: string; password: string }>({
        username: "",
        password: "",
    });

    const navigate = useNavigate();
    const cookies = new Cookies();

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
        console.log(
            `Sending data to server...(${data.username},${data.password})`
        );
        login(data.username, data.password).then((res) => {
            let empresas = res.data.usuario.empresas;
            cookies.set("token", res.data.token, { path: "/" });
            console.log("Cookies has been set");
            Swal.fire({
                icon: "success",
                title: `Bienvenido ${data.username}`,
                text: "Ingreso exitoso",
            }).then(() => {
                navigate("/home/modules", {
                    state: { enterprises: empresas },
                });
            });
        }).catch((err) => {
            if (err.response.data?.message === "Usuario not found") {
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

    return (
        <div>
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
        </div>
    );
}
