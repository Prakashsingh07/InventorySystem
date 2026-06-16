import { useState } from "react";
import { createSupplier } from "../services/supplierService";
import { useNavigate } from "react-router-dom";

function AddSupplier() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    isActive: true,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createSupplier(formData);
      alert("Supplier created successfully");
      navigate("/suppliers");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to create supplier");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-center text-3xl font-bold text-gray-800">
          Add Supplier
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Supplier Name
            </label>

            <input
              name="name"
              placeholder="Enter supplier name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
            />
          </div>

          <div className="flex gap-4 pt-2">
            <button
              type="submit"
              className="flex-1 rounded-lg bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700"
            >
              Create Supplier
            </button>

            <button
              type="button"
              onClick={() => navigate("/suppliers")}
              className="flex-1 rounded-lg bg-gray-500 py-3 font-semibold text-white transition hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddSupplier;