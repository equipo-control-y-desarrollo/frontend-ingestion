import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import { Tooltip } from '@chakra-ui/react'
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function VerticalNavbar({logoImage, companies, chooseCompany}: {logoImage: string, companies: string[], chooseCompany: any}){

    const navigate = useNavigate();

    const Logout = () => {
        localStorage.setItem('enterprise', '');
        navigate('/');
    }

    return (
        <div className="vertical-navbar">
            <div className="logo-container">
                <img src={logoImage} alt="Your logo here"></img>
            </div>
            <div className="companies-container">
                <div className="companies-list">
                    {companies.map((company) => {
                        return (
                            <div key={company} className="company" onClick={(event) => chooseCompany(event)}>
                                <h3>{company}</h3>
                            </div>
                        )})}
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