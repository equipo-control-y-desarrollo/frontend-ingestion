import PaginatedItems from "./PaginatedItems";
import SearchBar from "./SearchBar";
import { useState } from "react";
import { crucialData } from "../../Utils/util";

export interface Props {
  rows: {}[];
}

export default function TableModule(props: Props) {
  const { rows } = props;

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
        <PaginatedItems items={filterRows} itemsPerPage={5}></PaginatedItems>
      </div>
    </div>
  );
}
