import React, { useState, useEffect } from "react";
import JdpCustomerTable from "../components/JdpCustomerComponent/JdpCustomerTable";
import JdpCustomerForm from "../components/JdpCustomerComponent/JdpCustomerForm";
import JdpCustomerSearch from "../components/JdpCustomerComponent/JdpCustomerSearch";
import JdpPaginationComponent from "../components/JdpCustomerComponent/JdpPaginationComponent";
import JdpCustomerActionButtons from "../components/JdpCustomerComponent/jdpCustomerActionButtons";
import {
  getAllCustomers,
  addCustomersBulk,
  deleteCustomersBulk,
  updateCustomersBulk,
  searchjdpCustomers,
} from "../services/jdpCustomerMaster.js";
import { toast } from "react-toastify";

const JdpCustomerMaster = () => {
  const [rows, setRows] = useState([]);

  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    saleDateFrom: "",
    saleDateTo: "",
  });

  const [deletedIds, setDeletedIds] = useState([]);

  const [searchFilters, setSearchFilters] = useState({
    saleDateFrom: "",
    saleDateTo: "",
    isDisabled: "",
  });

  const [page, setPage] = useState(0);
  const [size, setSize] = useState(8);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  //getting all customers data when the page is opened/refreshed
  useEffect(() => {
    const hasFilters =
      searchFilters.saleDateFrom !== "" ||
      searchFilters.saleDateTo !== "" ||
      searchFilters.isDisabled !== "";

    if (hasFilters) {
      handleSearch();
    } else {
      fetchCustomers();
    }
  }, [page]);

  const fetchCustomers = async () => {
    try {
      const response = await getAllCustomers(page , size);

      const data = response.data.content.map((customer) => ({
        ...customer,
        selected: false,
        isNew: false,
        isModified: false,
        errors: {},
        isDisabled: customer.isDisabled ?? false,
      }));

      console.log("customer fetched successfully : ", data);

      setRows(data);
      setTotalPages(response.data.totalPages);
      setTotalElements(response.data.totalElements);
      // toast.success("Search Completed");
    } catch (err) {
      console.log(err);
      toast.error("Failed to load jdp customers");
    }
  };

  const handleCheckboxChange = (id) => {
    setRows((prev) =>
      prev.map((row) =>
        row.id === id ? { ...row, selected: !row.selected } : row,
      ),
    );
  };

  const handleInputChange = (id, key, value) => {
    setRows((prev) => {
      const updatedRows = prev.map((row) =>
        row.id === id
          ? {
              ...row,
              [key]: value,
              isModified: true,
            }
          : row,
      );

      return validateTable(updatedRows);
    });
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
      toast.warning("Some fields are not filled");
      return;
    }

    //adding new row info
    const newRow = {
      id: `temp-${Date.now()}`,
      selected: false,
      saleDateFrom: formData.saleDateFrom,
      saleDateTo: formData.saleDateTo,
      isNew: true,
      isModified: false,
      errors: {},
    };

    toast("New row added to then Table");

    // newRow.errors = validateRow(newRow);
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

  const handleDisable = () => {
    setRows((prev) =>
      prev.map((row) =>
        row.selected
          ? {
              ...row,
              isModified: true,
              isDisabled: true,
              selected: false,
            }
          : row,
      ),
    );

    toast.info("Rows marked as disabled. Click Save to persist.");
  };

  const handleDelete = () => {
    // setRows((prev) => prev.filter((row) => !row.selected));
    const idsToDelete = rows
      .filter((row) => row.selected && !row.isNew)
      .map((row) => {
        return row.id;
      });

    //keeping track of all the rows to be deleted later on save/persist
    // setDeletedIds((prev) => [...prev, ...idsToDelete]);
    //to prevent duplicateing same number. storeing in new set
    setDeletedIds((prev) => [...new Set([...prev, ...idsToDelete])]);

    //displying rows which were not selected
    setRows((prev) => prev.filter((row) => !row.selected));

    toast.info("Rows marked for deletion. Click Save to persist changes.");
  };

  const handleSave = async () => {
    try {
      //handling invlaid iputs and updates first
      const invalidRows = rows.filter(
        (row) => Object.keys(row.errors).length > 0,
      );

      if (invalidRows.length > 0) {
        toast.warning("Please fix highlighted rows before saving");
        return;
      }

      //add new rows to db
      const newRows = rows.filter((row) => row.isNew);
      console.log("new customer to be added :", newRows);

      //update old rows already present in db
      const exisitingRows = rows.filter((row) => !row.isNew && row.isModified);

      if (newRows.length > 0) {
        const payload = newRows.map(
          ({ id, selected, isNew, isModified, ...customer }) => customer,
        );

        // const delayPromise = new Promise((resolve) => setTimeout(resolve , 3000));
        // const res = await addCustomersBulk(payload);
        const res = await toast.promise(addCustomersBulk(payload), {
          pending: "Adding customers...",
          success: "Customers added successfully",
          error: "Failed to add customers",
        });
        console.log("Successfully added new customers:", res.data);
      }

      if (exisitingRows.length > 0) {
        const payload = exisitingRows.map(
          ({ selected, isNew, isModified, ...customer }) => customer,
        );

        // const res = await updateCustomersBulk(payload);
        const res = await toast.promise(updateCustomersBulk(payload), {
          pending: "Updating customers...",
          success: "Customers updated successfully",
          error: "Failed to update customers",
        });
        console.log("Successfully updated old customers:", res);
      }

      //delete the rows in the actual DB for persistance
      if (deletedIds.length > 0) {
        console.log("Ids to be deleted :", deletedIds);
        await deleteCustomersBulk(deletedIds);
        setDeletedIds([]);
      }

      await fetchCustomers();

      toast.success("All changes saved Successfully");
    } catch (err) {
      console.error(err);

      toast.error("Failed to save changes");
    }
  };

  const validateTable = (rows) => {
    return rows.map((row, index) => {
      const errors = {};

      if (!row.saleDateFrom) {
        errors.saleDateFrom = "Required";
      }

      if (!row.saleDateTo) {
        errors.saleDateTo = "Required";
      }

      if (
        row.saleDateFrom &&
        row.saleDateTo &&
        new Date(row.saleDateTo) < new Date(row.saleDateFrom)
      ) {
        errors.saleDateFrom = "Must be before Sale Date To";
        errors.saleDateTo = "Must be after Sale Date From";
      }

      if (index > 0) {
        const previousRow = rows[index - 1];

        if (
          row.saleDateFrom &&
          previousRow.saleDateTo &&
          new Date(row.saleDateFrom) <= new Date(previousRow.saleDateTo)
        ) {
          errors.saleDateFrom = "Must be after previous row's Sale Date To";
        }
      }

      if (Object.keys(errors).length > 0) {
        console.log(...rows, errors);
      }

      return {
        ...row,
        errors: errors,
      };
    });
  };

  const handleResetSearch = async () => {
    setSearchFilters({
      saleDateFrom: "",
      saleDateTo: "",
      isDisabled: "",
    });

    await fetchCustomers;

    toast.success("Search filter is Reset");
  };

  const handleSearch = async () => {
    try {
      if(searchFilters.saleDateFrom > searchFilters.saleDateTo){
        toast.error("Sale date from must be less than or eaul to sale Date to ");
        return;
      }

      const response = await searchjdpCustomers(
        searchFilters.isDisabled,
        searchFilters.saleDateFrom,
        searchFilters.saleDateTo,
        page,
        size,
      );
      console.log(response);
      
      const data = response.data.content.map((customers) => ({
        ...customers,
        selected: false,
        isNew: false,
        isModified: false,
        errors: {},
      }));
        console.log("data => " , data);
      
      setRows(data);
      setTotalPages(response.data.totalPages);
      setTotalElements(response.data.totalElements);
    } catch (err) {
      console.log(err);
      toast.error("Failed to search Customers");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start p-4 md:p-8">
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-lg p-4 md:p-6">
        <h1 className="text-xl md:text-2xl font-bold text-center mb-6">
          JDP Customer Master
        </h1>

        <JdpCustomerSearch
          searchFilters={searchFilters}
          setSearchFilters={setSearchFilters}
          handleSearch={handleSearch}
          handleResetSearch={handleResetSearch}
        />

        {/* Jdp Table */}
        <JdpCustomerTable
          page = {page}
          size = {size}
          rows={rows}
          handleCheckboxChange={handleCheckboxChange}
          handleInputChange={handleInputChange}
        />

        <JdpPaginationComponent
          page = {page}
          setPage = {setPage}
          totalPages = {totalPages}
          totalElements = {totalElements}
        />

        {/* Jdp Action buttons */}
        <JdpCustomerActionButtons
          handleAdd={handleAdd}
          handleDisable={handleDisable}
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
