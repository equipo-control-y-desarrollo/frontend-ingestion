import RowTable from "./RowTable"; 

export default function TableModule({rows} : {rows: any[]}){
    return(
        <div className="tableData">
            {rows.map((row) => {
                    return (
                        <RowTable id={row.id} fecha={row.fecha}></RowTable>
                    )
                })}
        </div>
    )
}