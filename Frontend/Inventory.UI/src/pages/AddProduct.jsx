import { useState } from "react";
import { createProduct } from "../services/productService";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    categoryId: "",
    sku: "",
    unitPrice: "",
    quantity: "",
    reorderThreshold: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createProduct({
        ...formData,
        categoryId: parseInt(formData.categoryId),
        unitPrice: parseFloat(formData.unitPrice),
        quantity: parseInt(formData.quantity),
        reorderThreshold: parseInt(formData.reorderThreshold),
      });

      alert("Product created successfully");
      navigate("/products");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to create product");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl rounded-xl bg-white p-8 shadow-lg">
        <h2 className="mb-8 text-center text-3xl font-bold text-gray-800">
          Add Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Product Name
            </label>
            <input
              name="name"
              placeholder="Enter product name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block font-medium text-gray-700">
                Category ID
              </label>
              <input
                name="categoryId"
                type="number"
                placeholder="Enter category ID"
                value={formData.categoryId}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium text-gray-700">
                SKU
              </label>
              <input
                name="sku"
                placeholder="Enter SKU"
                value={formData.sku}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <div>
              <label className="mb-2 block font-medium text-gray-700">
                Unit Price
              </label>
              <input
                name="unitPrice"
                type="number"
                placeholder="0.00"
                value={formData.unitPrice}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium text-gray-700">
                Stock Quantity
              </label>
              <input
                name="quantity"
                type="number"
                placeholder="0"
                value={formData.quantity}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium text-gray-700">
                Reorder Threshold
              </label>
              <input
                name="reorderThreshold"
                type="number"
                placeholder="0"
                value={formData.reorderThreshold}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Create Product
            </button>

            <button
              type="button"
              onClick={() => navigate("/products")}
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

export default AddProduct;