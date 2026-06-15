import api from "./api";

export const getProducts = async () => {
    const response = await api.get("/Product");
    return response.data;
};

export const createProduct = async (data) => {
    const response = await api.post("/Product", data);
    return response.data;
};

export const updateProduct = async (id, data) => {
    const response = await api.put(`/Product/${id}`, data);
    return response.data;
};

export const searchProducts = async (term) => {
    const response = await api.get(`/Product/search?term=${term}`);
    return response.data;
};

export const getLowStockProducts = async () => {
    const response = await api.get("/Product/low-stock");
    return response.data;
};