import api from "./api";

export const getSuppliers = async () => {
    const response = await api.get("/Supplier");
    return response.data;
};

export const createSupplier = async (data) => {
    const response = await api.post("/Supplier", data);
    return response.data;
};

export const updateSupplierStatus = async (id, data) => {
    const response = await api.put(`/Supplier/${id}/status`, data);
    return response.data;
};