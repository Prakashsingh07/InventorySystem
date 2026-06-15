import { useNavigate } from "react-router-dom";

function Dashboard() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>

            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "2px solid #333",
                paddingBottom: "10px",
                marginBottom: "30px"
            }}>
                <h1>Inventory Management System</h1>
                <button
                    onClick={handleLogout}
                    style={{
                        backgroundColor: "#e74c3c",
                        color: "white",
                        border: "none",
                        padding: "8px 16px",
                        cursor: "pointer",
                        borderRadius: "4px"
                    }}
                >
                    Logout
                </button>
            </div>

            <h2>Welcome! Select a module below:</h2>

            <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>

                <div
                    onClick={() => navigate("/products")}
                    style={{
                        backgroundColor: "#3498db",
                        color: "white",
                        padding: "30px 40px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        textAlign: "center",
                        fontSize: "18px",
                        fontWeight: "bold"
                    }}
                >
                    📦 Products
                </div>

                <div
                    onClick={() => navigate("/suppliers")}
                    style={{
                        backgroundColor: "#2ecc71",
                        color: "white",
                        padding: "30px 40px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        textAlign: "center",
                        fontSize: "18px",
                        fontWeight: "bold"
                    }}
                >
                    🏭 Suppliers
                </div>

            </div>

        </div>
    );
}

export default Dashboard;