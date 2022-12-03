export default function ModulesMenu({modules}: {modules: string[]}){
    return (
        <div className="modules-menu">
            <h2>Registers</h2>
            <div className="modules-container">
                {modules.map((module) => {
                    return (
                        <div className="module">
                            <h3>{module}</h3>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}