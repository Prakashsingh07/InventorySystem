import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getStockHistory } from "../services/productService";

function StockHistory() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [history, setHistory] = useState([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const data = await getStockHistory(id);
      setHistory(data);
    } catch {
      alert("Unable to load stock history");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-7xl rounded-xl bg-white p-6 shadow-lg">
        {/* Header */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-3xl font-bold text-gray-800">
            Stock History
          </h2>

          <button
            onClick={() => navigate("/products")}
            className="rounded-lg bg-gray-600 px-4 py-2 font-medium text-white transition hover:bg-gray-700"
          >
            Back to Products
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full overflow-hidden rounded-lg border border-gray-200">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-4 py-3 text-left">Product</th>
                <th className="px-4 py-3 text-left">Quantity</th>
                <th className="px-4 py-3 text-left">Reason</th>
                <th className="px-4 py-3 text-left">User ID</th>
                <th className="px-4 py-3 text-left">Date</th>
              </tr>
            </thead>

            <tbody>
              {history.length > 0 ? (
                history.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b transition hover:bg-gray-50"
                  >
                    <td className="px-4 py-3">{item.productName}</td>

                    <td
                      className={`px-4 py-3 font-semibold ${
                        item.quantityChanged >= 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {item.quantityChanged > 0
                        ? `+${item.quantityChanged}`
                        : item.quantityChanged}
                    </td>

                    <td className="px-4 py-3">{item.reason}</td>

                    <td className="px-4 py-3">{item.userId}</td>

                    <td className="px-4 py-3">
                      {new Date(item.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="py-8 text-center text-gray-500"
                  >
                    No stock history available.
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

export default StockHistory;