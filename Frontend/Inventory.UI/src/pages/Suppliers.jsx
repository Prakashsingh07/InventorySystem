import { useEffect, useState } from "react";
import { getSuppliers, updateSupplierStatus } from "../services/supplierService";
import { useNavigate } from "react-router-dom";

function Suppliers() {
    const [suppliers, setSuppliers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        loadSuppliers();
    }, []);

    const loadSuppliers = async () => {
        try {
            const data = await getSuppliers();
            setSuppliers(data);
        } catch (error) {
            console.log(error);
        }
    };

    const changeStatus = async (id, currentStatus) => {
        try {
            await updateSupplierStatus(id, { isActive: !currentStatus });
            loadSuppliers();
        } catch (error) {
            alert("Failed to update status");
        }
    };

    return (
        <div>
            <h2>Suppliers</h2>

            <button onClick={() => navigate("/suppliers/add")}>
                + Add Supplier
            </button>

            <br /><br />

            <table border="1">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {suppliers.map(supplier => (
                        <tr key={supplier.supplierId}>
                            <td>{supplier.name}</td>
                            <td>{supplier.isActive ? "Active" : "Inactive"}</td>
                            <td>
                                <button onClick={() => changeStatus(supplier.supplierId, supplier.isActive)}>
                                    {supplier.isActive ? "Deactivate" : "Activate"}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Suppliers;