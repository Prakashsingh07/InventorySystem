import { useEffect, useState } from "react";
import { getProducts, searchProducts, getLowStockProducts } from "../services/productService";
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
        <div>
            <h2>Products</h2>

            <button onClick={() => navigate("/products/add")}>
                + Add Product
            </button>

            <button onClick={() => navigate("/dashboard")} style={{ marginLeft: "10px" }}>
                Back to Dashboard
            </button>

            <br /><br />

            <input
                type="text"
                placeholder="Search by name or SKU"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <button onClick={handleSearch}>
                Search
            </button>

            <button onClick={loadProducts}>
                All Products
            </button>

            <button onClick={handleLowStock}>
                Low Stock
            </button>

            <br /><br />

            <table border="1">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Category</th>
                        <th>SKU</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Threshold</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {products.map(product => (
                        <tr key={product.productId}>
                            <td>{product.name}</td>
                            <td>{product.categoryName}</td>
                            <td>{product.sku}</td>
                            <td>{product.unitPrice}</td>
                            <td>
                                {
                                    product.quantity <= product.reorderThreshold
                                    ? "⚠ " + product.quantity
                                    : product.quantity
                                }
                            </td>
                            <td>{product.reorderThreshold}</td>
                            <td>
                                <button onClick={() => navigate(`/products/edit/${product.productId}`)}>
                                    Edit
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Products;