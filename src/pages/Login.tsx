import { useState } from "react";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { Input } from "@chakra-ui/react";
import "../styles/index.scss";
import { login } from "../services/login";
import { messageModal } from "../Utils/util";

export default function Login() {

  const [data, setData] = useState<{ username: string; password: string }>({
    username: "",
    password: "",
  });

  const [user, setUser] = useState<any>();
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
      messageModal({
        iconType: "error",
        title: "Oops...",
        text: "Por favor, ingrese un usuario y contraseña",
      });
      return false;
    }
    return true;
  };

  const loginForm = async () => {
    const res = await login(data.username, data.password);
    cookies.set("token", res.data.token, { path: "/" });
    setUser(res.data);
  };

  const sendForm = async (event: React.FormEvent<HTMLFormElement>): Promise<any> => {
    event.preventDefault();
    if (!validForm()) return;
    try {
      await loginForm();
    } catch (error: any) {
      console.log(error)
      if (error.response.data?.message === "Usuario not found") {
        messageModal({
          iconType: "error",
          title: "Oops...",
          text: "Usuario o contraseña incorrectos",
        });
      } else {
        messageModal({
          iconType: "error",
          title: "Oops...",
          text: "Error al iniciar sesión",
        });
      }
      return;
    }
    messageModal({
      iconType: "sucess",
      title: "Bienvenido",
      text: "Ingreso exitoso",
      next: () => {
        navigate("/home/modules", { state: { enterprises: user?.usuario.empresas } });
      },
    });
  };

  const alertForget = (): void => {
    messageModal({
      iconType: "question",
      title: "¿Olvidaste tu contraseña?",
      text: "Por favor ponte en contacto con el administrador",
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
            <h4 onClick={alertForget}>¿Olvidaste tu contraseña?</h4>
          </div>
        </form>
      </div>
    </div>
  );
}
