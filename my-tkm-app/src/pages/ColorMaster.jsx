import React, { useState } from "react";
import { Plus, X, Save } from "lucide-react";

const initialData = [
  {
    id: 1,
    selected: false,
    code: "040",
    description: "SUPER WHITE",
    thaiDescription: "SUPER WHITE",
    type: "Pearl",
  },
  {
    id: 2,
    selected: false,
    code: "056",
    description: "WHITE",
    thaiDescription: "WHITE",
    type: "Pearl",
  },
  {
    id: 3,
    selected: false,
    code: "077",
    description: "WHITE PEARL CS",
    thaiDescription: "WHITE PEARL CS",
    type: "Metallic",
  },
  {
      id: 4,
      selected: false,
      code: "058",
      description: "WHITE",
      thaiDescription: "WHITE",
      type: "Perl",
    },
    {
      id: 5,
      selected: false,
      code: "070",
      description: "WHITE PEARL CRYSTAL",
      thaiDescription: "WHITE PEARL CRYSTAL",
      type: "Perl",
    },
    {
      id: 6,
      selected: false,
      code: "077",
      description: "WHITE PEARL CS",
      thaiDescription: "WHITE PEARL CS",
      type: "Metallic",
    },
];

export default function ColorMaster() {
  const [colorCategory, setColorCategory] =
    useState("EXTERIOR");

  const [colors, setColors] = useState(() => {
    const savedData =
      localStorage.getItem("colorMasterData");

    return savedData
      ? JSON.parse(savedData)
      : initialData;
  });

  const [showForm, setShowForm] =
    useState(false);

  const [formData, setFormData] = useState({
    code: "",
    description: "",
    thaiDescription: "",
    type: "Pearl",
  });

  const handleCheckboxChange = (id) => {
    setColors((prev) =>
      prev.map((row) =>
        row.id === id
          ? {
              ...row,
              selected: !row.selected,
            }
          : row
      )
    );
  };

  const handleInputChange = (
  id,
  key,
  value
) => {
  setColors((prev) =>
    prev.map((row) => {
      if (row.id !== id) return row;

      if (key === "code") {
        return {
          ...row,
          code: value,
        };
      }

      if (key === "description") {
        return {
          ...row,
          description: value,
        };
      }

      if (key === "thaiDescription") {
        return {
          ...row,
          thaiDescription: value,
        };
      }

      if (key === "type") {
        return {
          ...row,
          type: value,
        };
      }

      return row;
    })
  );
};

  const handleFormChange = (e) => {
  const { name, value } = e.target;

  if (name === "code") {
    setFormData((prev) => ({
      ...prev,
      code: value,
    }));
  }

  if (name === "description") {
    setFormData((prev) => ({
      ...prev,
      description: value,
    }));
  }

  if (name === "thaiDescription") {
    setFormData((prev) => ({
      ...prev,
      thaiDescription: value,
    }));
  }

  if (name === "type") {
    setFormData((prev) => ({
      ...prev,
      type: value,
    }));
  }
};

  const handleAdd = () => {
    setShowForm(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.code.trim() ||
      !formData.description.trim() ||
      !formData.thaiDescription.trim()
    ) {
      alert("Please fill all fields");
      return;
    }

    const newRow = {
      id: Date.now(),
      selected: false,
      code: formData.code,
      description: formData.description,
      thaiDescription:
        formData.thaiDescription,
      type: formData.type,
    };

    setColors((prev) => [
      ...prev,
      newRow,
    ]);

    setFormData({
      code: "",
      description: "",
      thaiDescription: "",
      type: "Pearl",
    });

    setShowForm(false);
  };

  const handleDelete = () => {
    setColors((prev) =>
      prev.filter((row) => !row.selected)
    );
  };

  const handleSave = () => {
    localStorage.setItem(
      "colorMasterData",
      JSON.stringify(colors)
    );

    alert("Data Saved Successfully");
  };

  return (
    <div className="min-h-screen bg-[#e6e6e6] text-xs">
      {/* Title */}
      <div className="bg-[#6f6f6f] px-3 py-1 font-bold text-white">
        SMST006 : Color Code Master
      </div>

      {/* Search Section */}
      <div className="mx-auto mt-4 flex w-[720px] items-center gap-3">
        <label className="flex items-center gap-1">
          <input
            type="radio"
            checked={
              colorCategory === "EXTERIOR"
            }
            onChange={() =>
              setColorCategory("EXTERIOR")
            }
          />
          Exterior Color
        </label>

        <label className="flex items-center gap-1">
          <input
            type="radio"
            checked={
              colorCategory === "INTERIOR"
            }
            onChange={() =>
              setColorCategory("INTERIOR")
            }
          />
          Interior Color
        </label>

        <button
          className="
            ml-6
            border border-blue-500
            bg-gradient-to-b
            from-white
            to-gray-200
            px-8 py-[2px]
            text-[11px]
            font-bold
            tracking-[2px]
            text-blue-700
          "
        >
          SEARCH
        </button>
      </div>

      {/* Table */}
      <div className="mx-auto mt-4 w-[720px] border border-gray-500 bg-white">
        <div className="h-[420px] overflow-y-scroll">
          <table className="w-full border-collapse">
            <thead className="sticky top-0">
              <tr className="bg-[#7f7f7f] text-white">
                <th className="border p-1">
                  Select
                </th>
                <th className="border p-1">
                  Color Code
                </th>
                <th className="border p-1">
                  Description
                </th>
                <th className="border p-1">
                  Thai Description
                </th>
                <th className="border p-1">
                  Color Type
                </th>
              </tr>
            </thead>

            <tbody>
              {colors.map((row, index) => (
                <tr
                  key={row.id}
                  className={
                    index % 2 === 0
                      ? "bg-white"
                      : "bg-gray-100"
                  }
                >
                  <td className="border p-1 text-center">
                    <input
                      type="checkbox"
                      checked={row.selected}
                      onChange={() =>
                        handleCheckboxChange(
                          row.id
                        )
                      }
                    />
                  </td>

                  <td className="border p-1">
                    <input
                      value={row.code}
                      onChange={(e) =>
                        handleInputChange(
                          row.id,
                          "code",
                          e.target.value
                        )
                      }
                      className="w-full bg-transparent outline-none"
                    />
                  </td>

                  <td className="border p-1">
                    <input
                      value={row.description}
                      onChange={(e) =>
                        handleInputChange(
                          row.id,
                          "description",
                          e.target.value
                        )
                      }
                      className="w-full bg-transparent outline-none"
                    />
                  </td>

                  <td className="border p-1">
                    <input
                      value={row.thaiDescription}
                      onChange={(e) =>
                        handleInputChange(
                          row.id,
                          "thaiDescription",
                          e.target.value
                        )
                      }
                      className="w-full bg-transparent outline-none"
                    />
                  </td>

                  <td className="border p-1">
                    <select
                      value={row.type}
                      onChange={(e) =>
                        handleInputChange(
                          row.id,
                          "type",
                          e.target.value
                        )
                      }
                      className="w-full border-none bg-transparent"
                    >
                      <option value="Pearl">
                        Pearl
                      </option>
                      <option value="Metallic">
                        Metallic
                      </option>
                      <option value="Solid">
                        Solid
                      </option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Buttons */}
      <div className="mx-auto mt-3 w-[760px]">
        <div className="ml-10 flex gap-8">
          <button
            onClick={handleAdd}
            className="flex items-center gap-1 border border-gray-500 bg-gradient-to-b from-white to-gray-200 px-3 py-[2px] text-[11px] font-bold text-blue-700"
          >
            ADD
            <Plus
              size={14}
              color="red"
              strokeWidth={3}
            />
          </button>

          <button
            onClick={handleDelete}
            className="flex items-center gap-1 border border-gray-500 bg-gradient-to-b from-white to-gray-200 px-3 py-[2px] text-[11px] font-bold text-blue-700"
          >
            DELETE
            <X
              size={14}
              color="red"
              strokeWidth={3}
            />
          </button>

          <button
            onClick={handleSave}
            className="flex items-center gap-1 border border-gray-500 bg-gradient-to-b from-white to-gray-200 px-3 py-[2px] text-[11px] font-bold text-blue-700"
          >
            SAVE
            <Save
              size={14}
              color="#1e40af"
              strokeWidth={3}
            />
          </button>
        </div>
      </div>

      {/* Add Form */}
      {showForm && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/30"
          onClick={() =>
            setShowForm(false)
          }
        >
          <div
            className="w-full max-w-md rounded-lg bg-white shadow-xl"
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            <div className="bg-gray-600 px-6 py-4 text-white">
              <h2 className="text-lg font-semibold">
                Add Color Record
              </h2>
            </div>

            <form
              className="p-6"
              onSubmit={handleFormSubmit}
            >
              <div className="mb-4">
                <label className="block mb-1">
                  Color Code
                </label>
                <input
                  type="text"
                  name="code"
                  value={formData.code}
                  onChange={handleFormChange}
                  className="w-full rounded border p-2"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-1">
                  Description
                </label>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleFormChange}
                  className="w-full rounded border p-2"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-1">
                  Thai Description
                </label>
                <input
                  type="text"
                  name="thaiDescription"
                  value={
                    formData.thaiDescription
                  }
                  onChange={handleFormChange}
                  className="w-full rounded border p-2"
                />
              </div>

              <div className="mb-6">
                <label className="block mb-1">
                  Color Type
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleFormChange}
                  className="w-full rounded border p-2"
                >
                  <option value="Pearl">
                    Pearl
                  </option>
                  <option value="Metallic">
                    Metallic
                  </option>
                  <option value="Solid">
                    Solid
                  </option>
                </select>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setShowForm(false)
                  }
                  className="rounded bg-gray-200 px-4 py-2"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded bg-blue-600 px-4 py-2 text-white"
                >
                  Add Row
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="fixed bottom-0 left-0 w-full bg-red-600 py-1 text-center text-xs font-bold text-white">
        © 2010 Toyota. All trademarks acknowledged.
      </div>
    </div>
  );
}