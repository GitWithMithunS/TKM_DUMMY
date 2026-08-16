import React from "react";

const JdpCustomerForm = ({
  showForm,
  setShowForm,
  formData,
  handleFormChange,
  handleFormSubmit,
}) => {
  return (
    <>
      <div>
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
                    value={formData.saleDateFrom}
                    onChange={handleFormChange}
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
                    onChange={handleFormChange}
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
    </>
  );
};

export default JdpCustomerForm;
