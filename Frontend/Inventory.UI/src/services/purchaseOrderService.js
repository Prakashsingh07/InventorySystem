import api from "./api";

export const getPurchaseOrders = async () => {
    const response = await api.get("/purchaseorder");
    return response.data;
};

export const createPurchaseOrder = async (data) => {
    const response = await api.post("/purchaseorder", data);
    return response.data;
};

export const submitPurchaseOrder = async (id) => {
    const response = await api.put(`/purchaseorder/${id}/submit`);
    return response.data;
};

export const approvePurchaseOrder = async (id) => {
    const response = await api.put(`/purchaseorder/${id}/approve`);
    return response.data;
};

export const receivePurchaseOrder = async (id) => {
    const response = await api.put(`/purchaseorder/${id}/receive`);
    return response.data;
};

export const cancelPurchaseOrder = async (id) => {
    const response = await api.put(`/purchaseorder/${id}/cancel`);
    return response.data;
};