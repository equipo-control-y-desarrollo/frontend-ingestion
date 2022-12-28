import PaginatedItems from "./PaginatedItems";

export default function TableModule({ rows }: { rows: {}[] }) {
    return (
        <div className="tableData">
            <PaginatedItems items={rows} itemsPerPage={5}></PaginatedItems>
        </div>
    );
}
