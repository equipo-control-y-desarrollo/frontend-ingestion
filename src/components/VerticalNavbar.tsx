import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import { Tooltip } from '@chakra-ui/react'
import { useNavigate } from "react-router-dom"
import Cookies from "universal-cookie";

export default function VerticalNavbar({logoImage, companies, chooseCompany}: {logoImage: string, companies: any[], chooseCompany: any}){

    const navigate = useNavigate();

    const Logout = () => { 
        const cookie = new Cookies()
        cookie.remove('token', {path: "/"});
        navigate('/', {replace: true})
    };

    return (
        <div className="vertical-navbar">
            <div className="logo-container">
                <img src={logoImage} alt="Your logo here"></img>
            </div>
            <div className="companies-container">
                <div className="companies-list">
                    {companies.length === 0 ? 
                    <div>There is no company to this user</div>
                    : companies.map((company) => {
                        return (
                            <div key={company.name} data-value={company.id} className="company" onClick={(event) => chooseCompany(event)}>
                                <h3 data-value={company.id}>{company.name}</h3>
                            </div>
                        )})
                    }
                </div>
            </div>
            <div className="vertical-navbar-footer">
                <hr></hr>
                <div onClick={() => Logout()}>
                    <Tooltip label='Cerrar Sesion'>
                        <FontAwesomeIcon icon={faRightFromBracket}/>            
                    </Tooltip>
                </div>
            </div>
        </div>
    )
}