import { useEffect, useState } from "react";
import { getProducts, searchProducts, getLowStockProducts} from "../services/productService";
import { useNavigate } from "react-router-dom";

function Products() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");

    const navigate = useNavigate();

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

    const handleSearch = async () => {
        if (search.trim() === "") {
            loadProducts();
            return;
        }

        try {
            const data = await searchProducts(search);
            setProducts(data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleLowStock = async () => {
        try {
            const data = await getLowStockProducts();
            setProducts(data);
        } catch (error) {
            console.log(error);
        }
    };

   return (
  <div className="min-h-screen bg-gray-100 p-8">
    <div className="mx-auto max-w-7xl rounded-xl bg-white p-6 shadow-lg">
      <h2 className="mb-6 text-3xl font-bold text-gray-800">Products</h2>

      {/* Top Buttons */}
      <div className="mb-6 flex flex-wrap gap-3">
        <button
          onClick={() => navigate("/products/add")}
          className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
        >
          + Add Product
        </button>

        <button
          onClick={() => navigate("/dashboard")}
          className="rounded-lg bg-gray-600 px-4 py-2 font-medium text-white hover:bg-gray-700"
        >
          Back to Dashboard
        </button>
      </div>

      {/* Search Section */}
      <div className="mb-6 flex flex-wrap gap-3">
        <input
          type="text"
          placeholder="Search by Name or SKU"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
        />

        <button
          onClick={handleSearch}
          className="rounded-lg bg-green-600 px-4 py-2 font-medium text-white hover:bg-green-700"
        >
          Search
        </button>

        <button
          onClick={loadProducts}
          className="rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700"
        >
          All Products
        </button>

        <button
          onClick={handleLowStock}
          className="rounded-lg bg-red-600 px-4 py-2 font-medium text-white hover:bg-red-700"
        >
          Low Stock
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full overflow-hidden rounded-lg border border-gray-200">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Category</th>
              <th className="px-4 py-3 text-left">SKU</th>
              <th className="px-4 py-3 text-left">Price</th>
              <th className="px-4 py-3 text-left">Stock</th>
              <th className="px-4 py-3 text-left">Threshold</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr
                key={product.productId}
                className="border-b hover:bg-gray-50"
              >
                <td className="px-4 py-3">{product.name}</td>
                <td className="px-4 py-3">{product.categoryName}</td>
                <td className="px-4 py-3">{product.sku}</td>
                <td className="px-4 py-3">${product.unitPrice}</td>

                <td className="px-4 py-3">
                  {product.quantity <= product.reorderThreshold ? (
                    <span className="font-semibold text-red-600">
                      ⚠ {product.quantity}
                    </span>
                  ) : (
                    product.quantity
                  )}
                </td>

                <td className="px-4 py-3">
                  {product.reorderThreshold}
                </td>

                <td className="px-4 py-3">
                  <div className="flex flex-wrap justify-center gap-2">
                    <button
                      onClick={() =>
                        navigate(
                          `/products/edit/${product.productId}`
                        )
                      }
                      className="rounded bg-yellow-500 px-3 py-1 text-sm text-white hover:bg-yellow-600"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        navigate(
                          `/stock-adjustment/${product.productId}`
                        )
                      }
                      className="rounded bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600"
                    >
                      Adjust Stock
                    </button>

                    <button
                      onClick={() =>
                        navigate(
                          `/stock-history/${product.productId}`
                        )
                      }
                      className="rounded bg-purple-600 px-3 py-1 text-sm text-white hover:bg-purple-700"
                    >
                      View History
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {products.length === 0 && (
              <tr>
                <td
                  colSpan="7"
                  className="py-6 text-center text-gray-500"
                >
                  No products found.
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

export default Products;