import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import { Tooltip } from '@chakra-ui/react'

export default function VerticalNavbar({logoImage, companies}: {logoImage: string, companies: string[]}){
    return (
        <div className="vertical-navbar">
            <div className="logo-container">
                <img src={logoImage} alt="Your logo here"></img>
            </div>
            <div className="companies-container">
                <div className="companies-list">
                    {companies.map((company) => {
                        return (
                            <div className="company">
                                <h3>{company}</h3>
                            </div>
                        )})}
                </div>
            </div>
            <div className="vertical-navbar-footer">
                <hr></hr>
                <Tooltip label='Cerrar Sesion'>
                    <FontAwesomeIcon icon={faRightFromBracket}/>            
                </Tooltip>
            </div>
        </div>
    )
}