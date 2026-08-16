import React from 'react'

const JdpCustomerTable = ({
    rows,
    handleCheckboxChange,
    handleInputChange
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
            </tr>
          </thead>

          <tbody>
            {rows.map((row, index) => (
              <tr
                key={row.id}
                className="hover:bg-gray-300"
              >
                <td className="border text-center px-4 py-2">
                  <input
                    type="checkbox"
                    checked={row.selected}
                    onChange={() =>
                      handleCheckboxChange(row.id)
                    }
                  />
                </td>

                <td className="border text-center px-4 py-2">
                  {index + 1}
                </td>

                <td className="border px-4 py-2">
                  <input
                    type="text"
                    value={row.saleDateFrom}
                    className="w-full border rounded px-2 py-1"
                    onChange={ (e) => 
                      handleInputChange(
                        row.id,
                        "saleDateFrom",
                        e.target.value
                      )
                    }
                  />
                </td>

                <td className="border px-4 py-2">
                  <input
                    type="text"
                    value={row.saleDateTo}
                    className="w-full border rounded px-2 py-1"
                    onChange={(e) =>
                      handleInputChange(
                        row.id,
                        "saleDateTo",
                        e.target.value
                      )
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default JdpCustomerTable
