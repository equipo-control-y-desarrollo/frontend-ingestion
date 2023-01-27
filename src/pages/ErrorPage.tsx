import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const ErrorPage = () => {
    const navigate = useNavigate();
    const fire: string = require("../assets/this-is-fine.jpg");

    const Logout = (): void => {
        const cookie = new Cookies();
        cookie.remove("token", { path: "/" });
        localStorage.clear();
        navigate("/", { replace: true });
    };

    return (
        <div>
            <div className="error-message-container">
                <img src={fire} alt="meme"></img>
                <h2>Lo sentimos, un error inesperado ha ocurrido</h2>
                <p>
                    Manten la calma probablemente no es tu culpa, estamos
                    trabajando para solucionarlo. Estaremos de vuelta,
                    <i>todo esta bien</i>
                </p>
                <Button
                    colorScheme="telegram"
                    marginTop={2}
                    onClick={() => Logout()}
                >
                    Ir al inicio de sesion
                </Button>
            </div>
        </div>
    );
};

export default ErrorPage;
