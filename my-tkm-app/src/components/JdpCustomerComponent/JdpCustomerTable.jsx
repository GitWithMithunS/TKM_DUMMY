import React from "react";

const JdpCustomerTable = ({
  rows,
  handleCheckboxChange,
  handleInputChange,
}) => {
  return (
    <>
      <div className="overflow-x-auto flex justify-center">
        <table className="w-full max-w-4xl border border-gray-300">
          <thead>
            <tr className="bg-gray-600 text-white">
              <th className="border px-4 py-2">Select</th>
              <th className="border px-4 py-2">S.No</th>
              <th className="border px-4 py-2">Sale Date From</th>
              <th className="border px-4 py-2">Sale Date To</th>
              <th className="border px-4 py-2">Status</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row, index) => (
              <tr
                key={row.id}
                className={
                  row.isDisabled
                  ? "bg-gray-200 text-gray-500" 
                  : Object.keys(row.errors || {}).length > 0
                    ? "bg-red-100"
                    : "hover:bg-gray-300"
                }
              >
                <td className="border text-center px-4 py-2">
                  <input
                    type="checkbox"
                    checked={row.selected}
                    onChange={() => handleCheckboxChange(row.id)}
                  />
                </td>

                <td className="border text-center px-4 py-2">{index + 1}</td>

                <td className="border px-4 py-2">
                  <input
                    type="date"
                    disabled = {row.isDisabled}
                    value={row.saleDateFrom}
                    min={index > 0 ? rows[index - 1].saleDateTo : "2000-01-01"}
                    max="2099-12-31"
                    className={`w-full rounded px-2 py-1 ${
                      row.errors?.saleDateFrom
                        ? "border-2 border-red-500"
                        : "border"
                    }`}
                    onChange={(e) =>
                      handleInputChange(row.id, "saleDateFrom", e.target.value)
                    }
                  />
                  {row.errors?.saleDateFrom && (
                    <p className="text-red-500 text-xs mt-1">
                      {row.errors.saleDateFrom}
                    </p>
                  )}
                </td>

                <td className="border px-4 py-2">
                  <input
                    type="date"
                    disabled = {row.isDisabled}
                    min={row.saleDateFrom}
                    max="2099-12-31"
                    value={row.saleDateTo}
                    className={`w-full rounded px-2 py-1 ${
                      row.errors?.saleDateFrom
                        ? "border-2 border-red-500"
                        : "border"
                    }`}
                    onChange={(e) =>
                      handleInputChange(row.id, "saleDateTo", e.target.value)
                    }
                  />
                  {row.errors?.saleDateTo && (
                    <p className="text-red-500 text-xs mt-1">
                      {row.errors.saleDateTo}
                    </p>
                  )}
                </td>

                <td className = "border px-4 py-2">
                  {row.isDisabled ? (
                    <span className = "text-red-600 font-bold">
                      Disabled
                    </span>

                  ) : (
                    <span className = "text-green-600 font-bold">
                      Active
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default JdpCustomerTable;
