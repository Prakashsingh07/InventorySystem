import { useState } from "react";
import { createPurchaseOrder } from "../services/purchaseOrderService";
import { useNavigate } from "react-router-dom";

function AddPurchaseOrder() {

    const navigate = useNavigate();

    const [supplierId, setSupplierId] = useState("");
    const [productId, setProductId] = useState("");
    const [quantity, setQuantity] = useState("");
    const [unitPrice, setUnitPrice] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const request = {
            supplierId: Number(supplierId),
            lineItems: [
                {
                    productId: Number(productId),
                    quantity: Number(quantity),
                    unitPrice: Number(unitPrice)
                }
            ]
        };
        //console.log(request)

        await createPurchaseOrder(request);

        alert("Purchase Order Created");

        navigate("/purchase-orders");
    };

    return (
        <form onSubmit={handleSubmit}>

            <h2>Create Purchase Order</h2>

            <input
                placeholder="Supplier Id"
                value={supplierId}
                onChange={(e) => setSupplierId(e.target.value)}
            />

            <br /><br />

            <input
                placeholder="Product Id"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
            />

            <br /><br />

            <input
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
            />

            <br /><br />

            <input
                placeholder="Unit Price"
                value={unitPrice}
                onChange={(e) => setUnitPrice(e.target.value)}
            />

            <br /><br />

            <button type="submit">
                Create
            </button>

        </form>
    );
}

export default AddPurchaseOrder;