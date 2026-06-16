import { useEffect, useState } from "react";
import { getSuppliers, updateSupplierStatus } from "../services/supplierService";
import { useNavigate } from "react-router-dom";

function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadSuppliers();
  }, []);

  const loadSuppliers = async () => {
    try {
      const data = await getSuppliers();
      setSuppliers(data);
    } catch (error) {
      console.log(error);
    }
  };

  const changeStatus = async (id, currentStatus) => {
    try {
      await updateSupplierStatus(id, { isActive: !currentStatus });
      loadSuppliers();
    } catch (error) {
      alert("Failed to update status");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-5xl rounded-xl bg-white p-6 shadow-lg">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-3xl font-bold text-gray-800">Suppliers</h2>

          <div className="flex gap-3">
            <button
              onClick={() => navigate("/suppliers/add")}
              className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
            >
              + Add Supplier
            </button>

            <button
              onClick={() => navigate("/dashboard")}
              className="rounded-lg bg-gray-600 px-4 py-2 font-medium text-white transition hover:bg-gray-700"
            >
              Back to Dashboard
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full overflow-hidden rounded-lg border border-gray-200">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-4 py-3 text-left">Supplier Name</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {suppliers.length > 0 ? (
                suppliers.map((supplier) => (
                  <tr
                    key={supplier.supplierId}
                    className="border-b transition hover:bg-gray-50"
                  >
                    <td className="px-4 py-3 font-medium text-gray-800">
                      {supplier.name}
                    </td>

                    <td className="px-4 py-3 text-center">
                      <span
                        className={`rounded-full px-3 py-1 text-sm font-semibold ${
                          supplier.isActive
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {supplier.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>

                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() =>
                          changeStatus(
                            supplier.supplierId,
                            supplier.isActive
                          )
                        }
                        className={`rounded-lg px-4 py-2 text-sm font-medium text-white transition ${
                          supplier.isActive
                            ? "bg-red-600 hover:bg-red-700"
                            : "bg-green-600 hover:bg-green-700"
                        }`}
                      >
                        {supplier.isActive
                          ? "Deactivate"
                          : "Activate"}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="3"
                    className="py-8 text-center text-gray-500"
                  >
                    No suppliers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Suppliers;