export default function ModulesMenu({modules}: {modules: string[]}){
    return (
        <div className="modules-menu">
            <h2>Registros</h2>
            <div className="modules-container">
                {modules.map((module) => {
                    return (
                        <div className="module">
                            <img src="" alt="module"></img>
                            <h3>{module}</h3>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}