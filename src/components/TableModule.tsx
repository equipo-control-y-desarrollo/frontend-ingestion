import PaginatedItems from "./PaginatedItems";
import SearchBar from "./SearchBar";
import { useState } from "react";
import { crucialData } from "../Utils/util";

/**
 * Component that renders a table with a search bar
 */
export default function TableModule({rows}: { rows: {}[] }) {
    const [filterRows, setFilterRows] = useState<{}[]>(() => rows);
    
    const handleEnter = (search: string): void => {
        if (search === "") {
            setFilterRows(rows);
        } else {
            const filteredRows = rows.filter((row: any) =>
                crucialData(row).toLowerCase().includes(search.toLowerCase())
            );
            setFilterRows(filteredRows);
        }
    };

    return (
        <div>
            <div className="tableData">
                <SearchBar handleEnter={handleEnter} />
                <PaginatedItems
                    items={filterRows}
                    itemsPerPage={5}
                ></PaginatedItems>
            </div>
        </div>
    );
}
