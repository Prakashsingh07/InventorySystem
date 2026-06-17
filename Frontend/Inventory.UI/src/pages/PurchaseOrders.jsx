import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    getPurchaseOrders,
    submitPurchaseOrder,
    approvePurchaseOrder,
    receivePurchaseOrder,
    cancelPurchaseOrder
} from "../services/purchaseOrderService";

function PurchaseOrders() {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {
        try {
            const data = await getPurchaseOrders();
            setOrders(data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg p-6">

                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold text-gray-800">
                        Purchase Orders
                    </h2>

                    <button
                        onClick={() => navigate("/purchase-orders/add")}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        + Create Purchase Order
                    </button>
                </div>

                <table className="w-full border-collapse border border-gray-300">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="border p-3">ID</th>
                            <th className="border p-3">Supplier</th>
                            <th className="border p-3">Status</th>
                            <th className="border p-3">Created At</th>
                            <th className="border p-3">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.purchaseOrderId}>
                                <td className="border p-3">
                                    {order.purchaseOrderId}
                                </td>

                                <td className="border p-3">
                                    {order.supplierName}
                                </td>

                                <td className="border p-3">
                                    {order.status}
                                </td>

                                <td className="border p-3">
                                    {new Date(order.createdAt).toLocaleString()}
                                </td>

                                <td className="border p-3">

                                    {order.status === "Draft" && (
                                        <>
                                            <button
                                                className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                                                onClick={async () => {
                                                    await submitPurchaseOrder(order.purchaseOrderId);
                                                    loadOrders();
                                                }}
                                            >
                                                Submit
                                            </button>

                                            <button
                                                className="bg-red-500 text-white px-3 py-1 rounded"
                                                onClick={async () => {
                                                    await cancelPurchaseOrder(order.purchaseOrderId);
                                                    loadOrders();
                                                }}
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    )}

                                    {order.status === "Submitted" && (
                                        <>
                                            <button
                                                className="bg-green-600 text-white px-3 py-1 rounded mr-2"
                                                onClick={async () => {
                                                    await approvePurchaseOrder(order.purchaseOrderId);
                                                    loadOrders();
                                                }}
                                            >
                                                Approve
                                            </button>

                                            <button
                                                className="bg-red-500 text-white px-3 py-1 rounded"
                                                onClick={async () => {
                                                    await cancelPurchaseOrder(order.purchaseOrderId);
                                                    loadOrders();
                                                }}
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    )}

                                    {order.status === "Approved" && (
                                        <>
                                            <button
                                                className="bg-purple-600 text-white px-3 py-1 rounded mr-2"
                                                onClick={async () => {
                                                    await receivePurchaseOrder(order.purchaseOrderId);
                                                    loadOrders();
                                                }}
                                            >
                                                Receive
                                            </button>

                                            <button
                                                className="bg-red-500 text-white px-3 py-1 rounded"
                                                onClick={async () => {
                                                    await cancelPurchaseOrder(order.purchaseOrderId);
                                                    loadOrders();
                                                }}
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    )}

                                    {(order.status === "Received" ||
                                        order.status === "Cancelled") && (
                                        <span className="text-gray-500">
                                            No Actions Available
                                        </span>
                                    )}

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="mt-6">
                    <button
                        onClick={() => navigate("/dashboard")}
                        className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                    >
                        Back to Dashboard
                    </button>
                </div>

            </div>
        </div>
    );
}

export default PurchaseOrders;