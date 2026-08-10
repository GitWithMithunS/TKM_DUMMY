import React, { useState } from "react";

const initialData = [
  {
    id: 1,
    selected: false,
    saleDateFrom: "01/05/2010",
    saleDateTo: "31/08/2011",
  },
  {
    id: 2,
    selected: false,
    saleDateFrom: "01/05/2011",
    saleDateTo: "31/08/2012",
  },
];

const JsdCustomerMaster = () => {

  const [rows, setRows] = useState(() => {
    const savedData = localStorage.getItem("vehicleData");
    return savedData ? JSON.parse(savedData) : initialData;
  });

  const [showForm , setShowForm] = useState(false);
  const [formData , setFormData] = useState({
    saleDateFrom: "",
    saleDateTo: ""
  });


  const handleCheckboxChange = (id) => {
    setRows((prev) =>
      prev.map((row) =>
        row.id === id
          ? { ...row, selected: !row.selected }
          : row
      )
    );
  };
  
  const handleInputChange = (id, key, value) => {
    setRows((prev) =>
      prev.map((row) =>
        row.id === id
          ? { ...row, [key] : value }
          : row
      )
    );
  };

  const handleFormChange = (e) =>{
    const {name , value} = e.target;

    setFormData((prev) => ({
      ...prev,
      [name] : value,
    }))

    console.log(name, value);

  }

  const handleFormSubmit = (e) => {
    e.preventDefault();

    console.log("Submitting");

    //edge cases
    if(formData.saleDateFrom == "" || formData.saleDateTo == ""){
      console.log("empty formdata");
      alert("Some fields are not filled");
      return;
    }

    //adding new row info
    const newRow = {
      id : Date.now(),
      selected : false,
      saleDateFrom : formData.saleDateFrom,
      saleDateTo : formData.saleDateTo,
    };

    setRows((prev) => [...prev , newRow]);
    
    //reset formdata value
    setFormData({
      saleDateFrom: "",
      saleDateTo: "",
    })  
    //clos ethe form
    setShowForm(false);
  }

  const handleAdd = () => {
    setShowForm(true);
  };

  const handleDelete = () => {
    setRows((prev) =>
      prev.filter((row) => !row.selected)
    );
    alert("Delected successfully");
  };

  const handleSave = () => {
    localStorage.setItem(
      "vehicleData",
      JSON.stringify(rows)
    );

    alert("Data Saved Successfully");
  };



return (
    
  <div className="min-h-screen bg-gray-100 flex justify-center items-start p-4 md:p-8">
    <div className="w-full max-w-5xl bg-white rounded-xl shadow-lg p-4 md:p-6">

      <h1 className="text-xl md:text-2xl font-bold text-center mb-6">
        JDP Customer Master
      </h1>

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

      <div className="flex justify-center gap-4 mt-6 flex-wrap">
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-300"
        >
          Add
        </button>

        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-300"
        >
          Delete
        </button>

        <button
          onClick={handleSave}
          className="bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-300"
        >
          Save
        </button>
      </div>

    </div>

     {/* Add Form */}
      {showForm && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50"
          onClick={() => setShowForm(false)}
        >
          <div
            className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gray-600 text-white px-6 py-4">
              <h2 className="text-xl font-semibold">
                Add Vehicle Sale Dates
              </h2>
              <p className="text-sm text-gray-100">
                Enter the sale date range below
              </p>
            </div>

            {/* Form Body */}
            <form className="p-6" onSubmit={handleFormSubmit}>
              
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sale Date From
                </label>
                <input
                  type="date"
                  name="saleDateFrom"
                  value = {formData.saleDateFrom}
                  onChange = {                    
                    handleFormChange
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sale Date To
                </label>
                <input
                  type="date"
                  name="saleDateTo"
                  value={formData.saleDateTo}
                  onChange = {
                    handleFormChange
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400"
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-gray-500 text-white hover:bg-red-400 transition"
                >
                  Add Row
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

  </div>
);
};

export default JsdCustomerMaster;