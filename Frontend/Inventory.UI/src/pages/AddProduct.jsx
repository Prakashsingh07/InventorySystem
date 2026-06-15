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
        reorderThreshold: ""
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
                reorderThreshold: parseInt(formData.reorderThreshold)
            });
            alert("Product created successfully");
            navigate("/products");
        } catch (error) {
            alert(error.response?.data?.message || "Failed to create product");
        }
    };

    return (
        <div>
            <h2>Add Product</h2>

            <input
                name="name"
                placeholder="Product Name"
                onChange={handleChange}
            />
            <br /><br />

            <input
                name="categoryId"
                placeholder="Category Id"
                type="number"
                onChange={handleChange}
            />
            <br /><br />

            <input
                name="sku"
                placeholder="SKU"
                onChange={handleChange}
            />
            <br /><br />

            <input
                name="unitPrice"
                placeholder="Unit Price"
                type="number"
                onChange={handleChange}
            />
            <br /><br />

            <input
                name="quantity"
                placeholder="Stock Quantity"
                type="number"
                onChange={handleChange}
            />
            <br /><br />

            <input
                name="reorderThreshold"
                placeholder="Reorder Threshold"
                type="number"
                onChange={handleChange}
            />
            <br /><br />

            <button onClick={handleSubmit}>Create</button>
            <button onClick={() => navigate("/products")} style={{ marginLeft: "10px" }}>
                Cancel
            </button>
        </div>
    );
}

export default AddProduct;