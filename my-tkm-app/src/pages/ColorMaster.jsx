import { useState } from "react";
import {
  Plus,
  X,
  Save,
} from "lucide-react";
export default function ColorMaster() {
  const [colorCategory, setColorCategory] =
    useState("EXTERIOR");

  const [colors, setColors] = useState([
    {
      id: 1,
      code: "040",
      description: "SUPER WHITE",
      thaiDescription: "SUPER WHITE",
      type: "Perl",
    },
    {
      id: 2,
      code: "056",
      description: "WHITE",
      thaiDescription: "WHITE",
      type: "Perl",
    },
    {
      id: 3,
      code: "057",
      description: "WHITE PEARL MICA",
      thaiDescription: "WHITE PEARL MICA",
      type: "Perl",
    },
    {
      id: 4,
      code: "058",
      description: "WHITE",
      thaiDescription: "WHITE",
      type: "Perl",
    },
    {
      id: 5,
      code: "070",
      description: "WHITE PEARL CRYSTAL",
      thaiDescription: "WHITE PEARL CRYSTAL",
      type: "Perl",
    },
    {
      id: 6,
      code: "077",
      description: "WHITE PEARL CS",
      thaiDescription: "WHITE PEARL CS",
      type: "Metallic",
    },
    {
      id: 7,
      code: "083",
      description: "WHITE NOVA GF",
      thaiDescription: "WHITE NOVA GF",
      type: "Metallic",
    },
    {
      id: 8,
      code: "085",
      description: "SONIC QUARTZ",
      thaiDescription: "SONIC QUARTZ",
      type: "Metallic",
    },
    {
      id: 9,
      code: "089",
      description: "PLATINUM WHITE PEARL",
      thaiDescription: "PLATINUM WHITE PEARL",
      type: "Perl",
    },
    {
      id: 10,
      code: "090",
      description: "PRECIOUS PEARL WHITE",
      thaiDescription: "PRECIOUS PEARL WHITE",
      type: "Perl",
    },
    {
      id: 11,
      code: "094",
      description: "HAKUGIN",
      thaiDescription: "HAKUGIN",
      type: "Metallic",
    },
    {
      id: 12,
      code: "1A0",
      description: "BLUISH SILVER METALLIC",
      thaiDescription: "BLUISH SILVER METALLIC",
      type: "Perl",
    },
    {
      id: 13,
      code: "1B1",
      description: "WARM SILVER",
      thaiDescription: "WARM SILVER",
      type: "Perl",
    },
    {
      id: 14,
      code: "1C0",
      description: "SILVER METALLIC",
      thaiDescription: "SILVER METALLIC",
      type: "Perl",
    },
    {
      id: 15,
      code: "1C8",
      description: "SILVER METALLIC",
      thaiDescription: "SILVER METALLIC",
      type: "Perl",
    },
    {
      id: 16,
      code: "1D4",
      description: "SILVER METALLIC",
      thaiDescription: "SILVER METALLIC",
      type: "Metallic",
    },
  ]);

  const updateType = (id, value) => {
    setColors((prev) =>
      prev.map((row) =>
        row.id === id
          ? { ...row, type: value }
          : row
      )
    );
  };

  return (
    <div className="min-h-screen bg-[#e6e6e6] text-xs">
      {/* Title Bar */}
      <div className="bg-[#6f6f6f] py-1 px-3 font-bold text-white">
        SMST006 : Color Code Master
      </div>

      {/* Search Area */}
      <div className="mx-auto mt-4 flex w-[720px] items-center gap-3 text-xs">
        <label className="flex items-center gap-1">
          <input
            type="radio"
            checked={colorCategory === "EXTERIOR"}
            onChange={() => setColorCategory("EXTERIOR")}
          />
          Exterior Color
        </label>

        <label className="flex items-center gap-1">
          <input
            type="radio"
            checked={colorCategory === "INTERIOR"}
            onChange={() => setColorCategory("INTERIOR")}
          />
          Interior Color
        </label>

        <button
          className="
      ml-6
      border border-blue-500
      bg-gradient-to-b from-white to-gray-200
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
        <div className="h-[420px] overflow-y-scroll overflow-x-hidden">
          <table className="w-full border-collapse text-xs">
            <thead className="sticky top-0">
              <tr className="bg-[#7f7f7f] text-white">
                <th className="border p-1">
                  Status
                </th>
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
              {colors.map((color, index) => (
                <tr
                  key={color.id}
                  className={
                    index % 2 === 0
                      ? "bg-white"
                      : "bg-gray-100"
                  }
                >
                  <td className="border p-1"></td>

                  <td className="border p-1 text-center">
                    <input type="checkbox" />
                  </td>

                  <td className="border p-1">
                    {color.code}
                  </td>

                  <td className="border p-1">
                    {color.description}
                  </td>

                  <td className="border p-1">
                    {color.thaiDescription}
                  </td>

                  <td className="border p-1">
                    <select
                      value={color.type}
                      onChange={(e) =>
                        updateType(
                          color.id,
                          e.target.value
                        )
                      }
                      className="w-full border-none bg-transparent"
                    >
                      <option value="Perl">
                        Perl
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
          className="
      flex items-center gap-1
      border border-gray-500
      bg-gradient-to-b from-white to-gray-200
      px-3 py-[2px]
      text-[11px]
      font-bold
      text-blue-700
      shadow-sm
    "
        >
          ADD
          <Plus size={14} color="red" strokeWidth={3} />
        </button>

        <button
          className="
      flex items-center gap-1
      border border-gray-500
      bg-gradient-to-b from-white to-gray-200
      px-3 py-[2px]
      text-[11px]
      font-bold
      text-blue-700
      shadow-sm
    "
        >
          DELETE
          <X size={14} color="red" strokeWidth={3} />
        </button>

        <button
          className="
      flex items-center gap-1
      border border-gray-500
      bg-gradient-to-b from-white to-gray-200
      px-3 py-[2px]
      text-[11px]
      font-bold
      text-blue-700
      shadow-sm
    "
        >
          SAVE
          <Save size={14} color="#1e40af" strokeWidth={3} />
        </button>
      </div>
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 w-full bg-red-600 py-1 text-center text-xs font-bold text-white">
        © 2010 Toyota. All trademarks acknowledged.
      </div>
    </div>
  );
}