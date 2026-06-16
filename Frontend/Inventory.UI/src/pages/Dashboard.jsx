import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  // Get role from localStorage
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      {/* Header */}
      <header className="flex items-center justify-between bg-white px-8 py-5 shadow-md">
        <h1 className="text-3xl font-bold text-gray-800">
          Inventory Management System
        </h1>

        <button
          onClick={handleLogout}
          className="rounded-lg bg-red-600 px-5 py-2 font-semibold text-white transition hover:bg-red-700"
        >
          Logout
        </button>
      </header>

      {/* Main Content */}
      <div className="mx-auto max-w-6xl px-6 py-10">
        <h2 className="mb-2 text-4xl font-bold text-gray-800">
          Welcome 👋
        </h2>

        <p className="mb-10 text-lg text-gray-600">
          Logged in as: <strong>{role}</strong>
        </p>

        <div className="grid gap-8 md:grid-cols-2">

          {/* Products - Visible to Everyone */}
          <div
            onClick={() => navigate("/products")}
            className="cursor-pointer rounded-2xl bg-blue-600 p-8 text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:bg-blue-700 hover:shadow-2xl"
          >
            <div className="mb-4 text-5xl">📦</div>
            <h3 className="mb-2 text-2xl font-bold">Products</h3>
            <p className="text-blue-100">
              View, add, edit and search products.
            </p>
          </div>

          {/* Stock Adjustment - Visible to Everyone */}
          <div
            onClick={() => navigate("/stock-adjustment")}
            className="cursor-pointer rounded-2xl bg-yellow-500 p-8 text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:bg-yellow-600 hover:shadow-2xl"
          >
            <div className="mb-4 text-5xl">📊</div>
            <h3 className="mb-2 text-2xl font-bold">
              Stock Adjustment
            </h3>
            <p className="text-yellow-100">
              Increase or decrease stock and maintain audit logs.
            </p>
          </div>

          {/* Suppliers - Manager/Admin Only */}
          {(role === "Manager" || role === "Admin") && (
            <div
              onClick={() => navigate("/suppliers")}
              className="cursor-pointer rounded-2xl bg-green-600 p-8 text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:bg-green-700 hover:shadow-2xl"
            >
              <div className="mb-4 text-5xl">🏭</div>
              <h3 className="mb-2 text-2xl font-bold">Suppliers</h3>
              <p className="text-green-100">
                Manage supplier information and status.
              </p>
            </div>
          )}

          {/* Purchase Orders - Manager/Admin Only */}
          {(role === "Manager" || role === "Admin") && (
            <div
              onClick={() => navigate("/purchase-orders")}
              className="cursor-pointer rounded-2xl bg-purple-600 p-8 text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:bg-purple-700 hover:shadow-2xl"
            >
              <div className="mb-4 text-5xl">📝</div>
              <h3 className="mb-2 text-2xl font-bold">
                Purchase Orders
              </h3>
              <p className="text-purple-100">
                Create, approve and receive purchase orders.
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default Dashboard;