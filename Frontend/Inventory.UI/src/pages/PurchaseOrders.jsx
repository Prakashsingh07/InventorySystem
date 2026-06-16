import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { createPurchaseOrder } from "../services/purchaseOrderService";
import { getSuppliers } from "../services/supplierService";
import { getProducts } from "../services/productService";

function AddPurchaseOrder() {

    const navigate = useNavigate();

    const [suppliers, setSuppliers] = useState([]);
    const [products, setProducts] = useState([]);

    const [formData, setFormData] = useState({
        supplierId: "",
        productId: "",
        quantity: "",
        unitPrice: ""
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const supplierData = await getSuppliers();
            const productData = await getProducts();

            
            setSuppliers(supplierData);
            setProducts(productData);
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const request = {
            supplierId: Number(formData.supplierId),
            lineItems: [
                {
                    productId: Number(formData.productId),
                    quantity: Number(formData.quantity),
                    unitPrice: Number(formData.unitPrice)
                }
            ]
        };

        try {
            await createPurchaseOrder(request);

            alert("Purchase Order Created Successfully");

            navigate("/purchase-orders");
        }
        catch (error) {
            alert("Failed to create Purchase Order");
        }
    };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div className="w-full max-w-xl rounded-xl bg-white shadow-lg p-8">

            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                Create Purchase Order
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">

                {/* Supplier */}
                <div>
                    <label className="block mb-2 font-semibold text-gray-700">
                        Supplier
                    </label>

                    <select
                        name="supplierId"
                        value={formData.supplierId}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">-- Select Supplier --</option>

                        {suppliers.map((supplier) => (
                            <option
                                key={supplier.supplierId}
                                value={supplier.supplierId}
                            >
                                {supplier.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Product */}
                <div>
                    <label className="block mb-2 font-semibold text-gray-700">
                        Product
                    </label>

                    <select
                        name="productId"
                        value={formData.productId}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">-- Select Product --</option>

                        {products.map((product) => (
                            <option
                                key={product.productId}
                                value={product.productId}
                            >
                                {product.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Quantity */}
                <div>
                    <label className="block mb-2 font-semibold text-gray-700">
                        Quantity
                    </label>

                    <input
                        type="number"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter quantity"
                    />
                </div>

                {/* Unit Price */}
                <div>
                    <label className="block mb-2 font-semibold text-gray-700">
                        Unit Price
                    </label>

                    <input
                        type="number"
                        name="unitPrice"
                        value={formData.unitPrice}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter unit price"
                    />
                </div>

                {/* Buttons */}
                <div className="flex justify-between pt-4">

                    <button
                        type="button"
                        onClick={() => navigate("/purchase-orders")}
                        className="rounded-lg bg-gray-500 px-6 py-3 font-semibold text-white hover:bg-gray-600"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
                    >
                        Create Purchase Order
                    </button>

                </div>

            </form>

        </div>
    </div>
);
}

export default AddPurchaseOrder;