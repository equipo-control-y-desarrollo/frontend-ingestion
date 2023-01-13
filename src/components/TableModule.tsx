import PaginatedItems from "./PaginatedItems";
import SearchBar from "./SearchBar";
import { useState } from "react";

export default function TableModule({ rows }: { rows: {}[] }) {
    const [filterRows, setFilterRows] = useState<{}[]>(rows);
    const module = JSON.parse(localStorage.getItem("module") || "{}").name;

    const handleEnter = (search: string) => {
        console.log("Entre con " + search);
        if (search === "") {
            setFilterRows(rows);
        } else {
            const filteredRows = filterRows.filter((row: any) => {
                if (row["nfactura"]) {
                    return row["nfactura"].includes(search);
                }
            });
            setFilterRows(filteredRows);
        }
    };

    return (
        <div className="tableData">
            {module === "Cuentas por pagar" && (
                <SearchBar handleEnter={handleEnter} />
            )}
            <PaginatedItems
                items={filterRows}
                itemsPerPage={5}
            ></PaginatedItems>
        </div>
    );
}
