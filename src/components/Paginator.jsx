import { useState } from "react";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/solid";
import "./paginator.css";

export default function Paginator({
  total,
  onPageChange,
  onPageSizeChange,
  defaultPage,
  defaultPageSize,
  showPrev = true,
  showNext = true,
}) {
  const [page, setPage] = useState(defaultPage || 1);
  const [pageSize, setPageSize] = useState(defaultPageSize || 5);
  const MAX_INTERNAL_ITEMS = 5;
  const MAX_ITEMS = MAX_INTERNAL_ITEMS + 3;

  const handlePageChange = (newPage) => {
    console.log("handlePageChange --- ", newPage);
    if (newPage < 1) return;
    if (newPage > total) return;
    setPage(newPage);
    onPageChange?.({ page: newPage, size: pageSize });
  };

  const handlePageSizeChange = (newPageSize) => {
    console.log("handlePageSizeChange --- ", newPage);
    setPageSize(newPageSize);
    onPageSizeChange?.({ page, size: newPageSize });
  };

  const renderPrevEllipsis = () => {
    if (total <= MAX_ITEMS || page <= 5) return null;
    if (page > 5)
      return (
        <button
          className="prev-ellipsis relative flex items-center justify-center cursor-pointer hover:border border-1 border-transparent hover:border-indigo-400  hover:bg-indigo-400 hover:text-white rounded-md p-2"
          onClick={() => handlePageChange(page - 1)}
          title="向前5页"
        >
          <span className="w-4 h-4"></span>
          <EllipsisHorizontalIcon className="before w-6 h-6" />
          <span role="img" aria-label="double-right" className="after w-4 h-4">
            <svg
              viewBox="64 64 896 896"
              focusable="false"
              data-icon="double-left"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M272.9 512l265.4-339.1c4.1-5.2.4-12.9-6.3-12.9h-77.3c-4.9 0-9.6 2.3-12.6 6.1L186.8 492.3a31.99 31.99 0 000 39.5l255.3 326.1c3 3.9 7.7 6.1 12.6 6.1H532c6.7 0 10.4-7.7 6.3-12.9L272.9 512zm304 0l265.4-339.1c4.1-5.2.4-12.9-6.3-12.9h-77.3c-4.9 0-9.6 2.3-12.6 6.1L490.8 492.3a31.99 31.99 0 000 39.5l255.3 326.1c3 3.9 7.7 6.1 12.6 6.1H836c6.7 0 10.4-7.7 6.3-12.9L576.9 512z"></path>
            </svg>
          </span>
        </button>
      );
  };

  const renderPostEllipsis = () => {
    if (total <= MAX_ITEMS || page >= total - 3) return null;
    if (page < total - 3)
      return (
        <button
          className="post-ellipsis  flex items-center justify-center cursor-pointer hover:border border-1 border-transparent hover:border-indigo-400  hover:bg-indigo-400 hover:text-white rounded-md p-2"
          onClick={() => handlePageChange(page + 1)}
          title="向后5页"
        >
          <span className="w-4 h-4"></span>
          <EllipsisHorizontalIcon className="before w-6 h-6" />
          <span role="img" aria-label="double-right" className="after w-4 h-4">
            <svg
              viewBox="64 64 896 896"
              focusable="false"
              data-icon="double-right"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M533.2 492.3L277.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H188c-6.7 0-10.4 7.7-6.3 12.9L447.1 512 181.7 851.1A7.98 7.98 0 00188 864h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.1c9.1-11.7 9.1-27.9 0-39.5zm304 0L581.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H492c-6.7 0-10.4 7.7-6.3 12.9L751.1 512 485.7 851.1A7.98 7.98 0 00492 864h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.1c9.1-11.7 9.1-27.9 0-39.5z"></path>
            </svg>
          </span>
        </button>
      );
  };

  const renderMainRange = () => {
    if (total <= MAX_ITEMS || page <= 5)
      return (
        <ul className="flex items-center gap-2">
          {Array.from({ length: Math.min(total, 5) }, (_, i) => (
            <li key={i}>
              <button
                className={`cursor-pointer hover:border border-1 border-transparent hover:border-indigo-400  hover:bg-indigo-400 hover:text-white rounded-md p-2 ${
                  page === i + 1
                    ? "bg-indigo-400 border-indigo-400 text-white"
                    : ""
                }`}
                onClick={() => handlePageChange(i + 1)}
              >
                <span className="flex items-center justify-center text-sm leading-none w-4 h-4">
                  {i + 1}
                </span>
              </button>
            </li>
          ))}
        </ul>
      );
    else {
      const start = page - Math.floor(MAX_INTERNAL_ITEMS / 2);
      const end = Math.min(start + MAX_INTERNAL_ITEMS - 1, total);
      return (
        <ul className="flex items-center gap-2">
          {Array.from({ length: end - start + 1 }, (_, i) => (
            <li key={i}>
              <button
                className={`cursor-pointer hover:border border-1 border-transparent hover:border-indigo-400  hover:bg-indigo-400 hover:text-white rounded-md p-2 ${
                  page === i + start
                    ? "bg-indigo-400 border-indigo-400 text-white"
                    : ""
                }`}
                onClick={() => handlePageChange(i + start)}
              >
                <span className="flex items-center justify-center text-sm leading-none w-4 h-4">
                  {i + start}
                </span>
              </button>
            </li>
          ))}
        </ul>
      );
    }
  };

  return (
    <div className="paginator bg-gray-300 rounded-md p-4 flex items-center gap-2">
      {/* prev  */}
      {showPrev && (
        <button
          className="cursor-pointer hover:border border-1 border-transparent hover:border-indigo-400  hover:bg-indigo-400 hover:text-white rounded-md p-2"
          onClick={() => handlePageChange(page - 1)}
        >
          <ArrowLeftIcon className="w-4 h-4  " />
        </button>
      )}

      {/* first page  */}
      {total > 10 && page > 5 && (
        <button
          className="cursor-pointer hover:border border-1 border-transparent hover:border-indigo-400  hover:bg-indigo-400 hover:text-white rounded-md p-2"
          onClick={() => handlePageChange(1)}
        >
          <span className="flex items-center justify-center text-sm leading-none w-4 h-4">
            1
          </span>
        </button>
      )}

      {/* ellipsis  */}
      {renderPrevEllipsis()}

      {/* main logic  */}
      {renderMainRange()}

      {/* ellipsis  */}
      {renderPostEllipsis()}

      {/* last page  */}
      {total > 10 && page < total - 2 && (
        <button
          className="cursor-pointer hover:border border-1 border-transparent hover:border-indigo-400  hover:bg-indigo-400 hover:text-white rounded-md p-2"
          onClick={() => handlePageChange(total)}
        >
          <span className="flex items-center justify-center text-sm leading-none w-4 h-4">
            {total}
          </span>
        </button>
      )}

      {/* next  */}
      {showNext && (
        <button
          className="cursor-pointer hover:border border-1 border-transparent hover:border-indigo-400  hover:bg-indigo-400 hover:text-white rounded-md p-2"
          onClick={() => handlePageChange(page + 1)}
        >
          <ArrowRightIcon className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
