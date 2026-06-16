import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { adjustStock, getProducts } from "../services/productService";

function StockAdjustment() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [products, setProducts] = useState([]);

  const [formData, setFormData] = useState({
    productId: id || "",
    quantityDelta: "",
    reason: "",
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await adjustStock(formData.productId, {
        quantityDelta: Number(formData.quantityDelta),
        reason: formData.reason,
      });

      alert("Stock adjusted successfully");
      navigate("/products");
    } catch (error) {
      alert("Unable to adjust stock");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-lg rounded-xl bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-center text-3xl font-bold text-gray-800">
          Adjust Stock
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Product Selection */}
          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Select Product
            </label>

            <select
              name="productId"
              value={formData.productId}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              <option value="">-- Select Product --</option>

              {products.map((product) => (
                <option
                  key={product.productId}
                  value={product.productId}
                >
                  {product.name} ({product.sku})
                </option>
              ))}
            </select>
          </div>

          {/* Quantity */}
          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Quantity Change
            </label>

            <input
              type="number"
              name="quantityDelta"
              placeholder="Example: +10 or -5"
              value={formData.quantityDelta}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* Reason */}
          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Reason
            </label>

            <input
              type="text"
              name="reason"
              placeholder="Reason for adjustment"
              value={formData.reason}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Save Adjustment
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

export default StockAdjustment;