import React, { useState } from "react";
import JdpCustomerTable from "../components/JdpCustomerComponent/JdpCustomerTable";
import JdpCustomerForm from "../components/JdpCustomerComponent/JdpCustomerForm";
import JdpCustomerActionButtons from "../components/JdpCustomerComponent/jdpCustomerActionButtons";

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

const JdpCustomerMaster = () => {
  const [rows, setRows] = useState(() => {
    const savedData = localStorage.getItem("vehicleData");
    return savedData ? JSON.parse(savedData) : initialData;
  });

  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    saleDateFrom: "",
    saleDateTo: "",
  });

  const handleCheckboxChange = (id) => {
    setRows((prev) =>
      prev.map((row) =>
        row.id === id ? { ...row, selected: !row.selected } : row,
      ),
    );
  };

  const handleInputChange = (id, key, value) => {
    setRows((prev) =>
      prev.map((row) => (row.id === id ? { ...row, [key]: value } : row)),
    );
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    console.log(name, value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    console.log("Submitting");

    //edge cases
    if (formData.saleDateFrom == "" || formData.saleDateTo == "") {
      console.log("empty formdata");
      alert("Some fields are not filled");
      return;
    }

    //adding new row info
    const newRow = {
      id: Date.now(),
      selected: false,
      saleDateFrom: formData.saleDateFrom,
      saleDateTo: formData.saleDateTo,
    };

    setRows((prev) => [...prev, newRow]);

    //reset formdata value
    setFormData({
      saleDateFrom: "",
      saleDateTo: "",
    });
    //close the form
    setShowForm(false);
  };

  const handleAdd = () => {
    setShowForm(true);
  };

  const handleDelete = () => {
    setRows((prev) => prev.filter((row) => !row.selected));
    alert("Delected successfully");
  };

  const handleSave = () => {
    localStorage.setItem("vehicleData", JSON.stringify(rows));

    alert("Data Saved Successfully");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start p-4 md:p-8">
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-lg p-4 md:p-6">
        <h1 className="text-xl md:text-2xl font-bold text-center mb-6">
          JDP Customer Master
        </h1>

        {/* Jdp Table */}
        <JdpCustomerTable
          rows={rows}
          handleCheckboxChange={handleCheckboxChange}
          handleInputChange={handleInputChange}
        />

        {/* Jdp Action buttons */}
        <JdpCustomerActionButtons
          handleAdd={handleAdd}
          handleDelete={handleDelete}
          handleSave={handleSave}
        />
      </div>

      {/* Add Form */}
      <JdpCustomerForm
        showForm={showForm}
        setShowForm={setShowForm}
        formData={formData}
        handleFormChange={handleFormChange}
        handleFormSubmit={handleFormSubmit}
      />
    </div>
  );
};

export default JdpCustomerMaster;
