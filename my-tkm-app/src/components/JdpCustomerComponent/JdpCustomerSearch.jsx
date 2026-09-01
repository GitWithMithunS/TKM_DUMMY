import React from "react";

const JdpCustomerSearch = ({searchFilters , setSearchFilters , handleSearch , handleResetSearch}) => {
  return (
    <div>
      <div className="mb-4 border-0 p-2 rounded-sm bg-gray-100 ">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <input
            type="date"
              value={searchFilters.saleDateFrom}
              onChange={(e) =>
                setSearchFilters(prev => ({
                  ...prev,
                  saleDateFrom: e.target.value,
                }))
              }
            className="border rounded px-3 py-2"
          />

          <input
            type="date"
              value={searchFilters.saleDateTo}
                onChange = {(e) => {
                    setSearchFilters(prev => ({
                        ...prev,
                        saleDateTo : e.target.value,
                    }))
                }}
            className="border rounded px-3 py-2"
          />

          <select
              value={searchFilters.isDisabled}
              onChange={(e) =>
                setSearchFilters(prev => ({
                  ...prev,
                  isDisabled: e.target.value,
                }))
              }
            className="border rounded px-3 py-2 "
          >
            <option value="">All Status</option>

            <option value="false">Active</option>

            <option value="true">Disabled</option>
          </select>

          <div className="flex gap-2">
            <button
              onClick={handleSearch}
              className="bg-blue-400 text-white px-4 py-2 rounded"
            >
              Search
            </button>

            <button
              onClick={handleResetSearch}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JdpCustomerSearch;
