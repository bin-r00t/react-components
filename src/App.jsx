import { useState } from "react";
import Paginator from "./components/Paginator";

function App() {
  const [total, setTotal] = useState(25);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [list, setList] = useState([]);

  return (
    <div className="h-screen bg-gray-200 p-8">
      <p className="flex items-center gap-2">
        <span className="w-32 text-right font-bold text-white bg-black">
          total:
        </span>{" "}
        {total}
      </p>
      <p className="flex items-center gap-2">
        <span className="w-32 text-right font-bold text-white bg-black">
          currentPage:
        </span>{" "}
        {currentPage}
      </p>
      <p className="flex items-center gap-2">
        <span className="w-32 text-right font-bold text-white bg-black">
          pageSize:
        </span>{" "}
        {pageSize}
      </p>
      <div className="py-10">
        <Paginator
          total={42}
          defaultPage={0}
          defaultPageSize={pageSize}
          onPageChange={({ page }) => {
            console.log(page);
            setCurrentPage(page);
          }}
          onPageSizeChange={(pageSize) => setPageSize(pageSize)}
        />
      </div>
    </div>
  );
}

export default App;
