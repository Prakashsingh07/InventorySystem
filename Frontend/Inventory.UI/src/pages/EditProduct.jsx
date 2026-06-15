import { useState, useEffect } from "react";
import { getProducts, updateProduct } from "../services/productService";
import { useNavigate, useParams } from "react-router-dom";

function EditProduct() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [formData, setFormData] = useState({
        name: "",
        categoryId: "",
        unitPrice: "",
        reorderThreshold: ""
    });

    useEffect(() => {
        const loadProduct = async () => {
            try {
                const all = await getProducts();
                const product = all.find(p => p.productId === parseInt(id));
                if (product) {
                    setFormData({
                        name: product.name,
                        categoryId: product.categoryId || "",
                        unitPrice: product.unitPrice,
                        reorderThreshold: product.reorderThreshold
                    });
                }
            } catch (error) {
                alert("Failed to load product");
            }
        };
        loadProduct();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateProduct(id, {
                ...formData,
                categoryId: parseInt(formData.categoryId),
                unitPrice: parseFloat(formData.unitPrice),
                reorderThreshold: parseInt(formData.reorderThreshold)
            });
            alert("Product updated successfully");
            navigate("/products");
        } catch (error) {
            alert("Unable to update product");
        }
    };

    return (
        <div>
            <h2>Edit Product</h2>

            <input
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
            />
            <br /><br />

            <input
                name="categoryId"
                placeholder="Category Id"
                type="number"
                value={formData.categoryId}
                onChange={handleChange}
            />
            <br /><br />

            <input
                name="unitPrice"
                placeholder="Price"
                type="number"
                value={formData.unitPrice}
                onChange={handleChange}
            />
            <br /><br />

            <input
                name="reorderThreshold"
                placeholder="Threshold"
                type="number"
                value={formData.reorderThreshold}
                onChange={handleChange}
            />
            <br /><br />

            <button onClick={handleSubmit}>Update</button>
            <button onClick={() => navigate("/products")} style={{ marginLeft: "10px" }}>
                Cancel
            </button>
        </div>
    );
}

export default EditProduct;