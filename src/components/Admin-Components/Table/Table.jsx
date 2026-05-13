import React from "react";
import ErrorMsg from "../Messages/ErrorMsg";
export default function Table({
  columns = [],
  data = [],
  loading = false,
  error,
}) {
  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow">
      <table className="w-full  text-sm">
        <thead className="bg-gray-50 text-gray-600">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="p-4 text-left">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {loading && (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center py-10 text-gray-500"
              >
                Loading...
              </td>
            </tr>
          )}

          {error && (
            <tr>
              <td colSpan={columns.length}>
                <ErrorMsg message={error} />
              </td>
            </tr>
          )}
          {data.length === 0 && (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center py-10 text-gray-400"
              >
                No data available
              </td>
            </tr>
          )}

          {data &&
            data?.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="border-b last:border-none hover:bg-gray-50 transition"
              >
                {columns.map((col) => (
                  <td key={col.key} className="px-6 py-4">
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
