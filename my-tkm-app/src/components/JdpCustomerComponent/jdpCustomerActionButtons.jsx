import React from "react";

const jdpCustomerActionButtons = ({ handleAdd, handleDelete, handleSave }) => {
  return (
    <div>
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
  );
};

export default jdpCustomerActionButtons;
