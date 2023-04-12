import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import MenuTab from "./MenuTab";
import { Company } from "../../interfaces";

export interface Props {
  logoImage: string;
  companies: Company[];
}

export default function VerticalNavbar(props: Props) {
  const { logoImage, companies } = props;

  const navigate = useNavigate();

  const Logout = (): void => {
    const cookie = new Cookies();
    cookie.remove("token", { path: "/" });
    localStorage.clear();
    navigate("/", { replace: true });
  };

  return (
    <div className="vertical-navbar">
      <div className="logo-container">
        <img src={logoImage} alt="Your logo here"></img>
      </div>
      <div className="companies-container">
        <div className="companies-list">
          {companies.length === 0 ? (
            <div>There is no company to this user</div>
          ) : (
            companies.map((company) => {
              return (
                <MenuTab
                  key={company.id}
                  id={company.id}
                  name={company.nombre}
                />
              );
            })
          )}
        </div>
      </div>
      <div className="vertical-navbar-footer">
        <hr></hr>
        <div onClick={() => Logout()}>
          <Tooltip label="Cerrar Sesion">
            <FontAwesomeIcon icon={faRightFromBracket} />
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
