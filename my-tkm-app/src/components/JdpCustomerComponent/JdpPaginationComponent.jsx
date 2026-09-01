import React from "react";

const JdpPaginationComponent = ({
  page,
  setPage,
  totalPages,
  totalElements,
}) => {
  return (
    <div>
      <div className="flex items-center justify-between gap-4 mt-6">
        <button
          disabled={page === 0}
          onClick={() => setPage((prev) => prev - 1)}
          className="px-4 py-2 bg-gray-500 text-white rounded disabled:bg-gray-300"
        >
          Prev
        </button>

        <span className="font-medium">
          Page {page + 1} of {totalPages}
        </span>

        <button
          disabled={page >= totalPages - 1}
          onClick={() => setPage((prev) => prev + 1)}
          className="px-4 py-2 bg-gray-500 text-white rounded disabled:bg-gray-300"
        >
          Next
        </button>
      </div>

      <div className="text-center text-sm mt-2 text-gray-600">
        Total Records : {totalElements}
      </div>
    </div>
  );
};

export default JdpPaginationComponent;
