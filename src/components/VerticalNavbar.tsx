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
            <hr></hr>
            <div className="vertical-navbar-footer">
                <h4>Log Out</h4>
            </div>
        </div>
    )
}