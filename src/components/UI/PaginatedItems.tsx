import { useState } from "react";
import ReactPaginate from "react-paginate";
import { crucialData } from "../../Utils";
import RowTable from "./RowTable";

function Items({ currentItems }: { currentItems: object[] }) {
  return (
    <>
      {currentItems &&
        currentItems.map((row: any, index: number) => (
          <div key={index} className="row-container">
            <RowTable id={row.id} header={crucialData(row)} />
          </div>
        ))}
    </>
  );
}

export default function PaginatedItems({
  items,
  itemsPerPage,
}: {
  items: object[];
  itemsPerPage: number;
}) {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <Items currentItems={currentItems} />
      <ReactPaginate
        className="pagination"
        breakLabel="..."
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        renderOnZeroPageCount={undefined}
      />
    </>
  );
}
