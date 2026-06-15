import { useState } from "react";
import { createSupplier } from "../services/supplierService";
import { useNavigate } from "react-router-dom";

function AddSupplier() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        isActive: true
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
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
        <div>
            <h2>Add Supplier</h2>

            <input
                name="name"
                placeholder="Supplier Name"
                onChange={handleChange}
            />
            <br /><br />

            <button onClick={handleSubmit}>Create</button>
            <button onClick={() => navigate("/suppliers")} style={{ marginLeft: "10px" }}>
                Cancel
            </button>
        </div>
    );
}

export default AddSupplier;