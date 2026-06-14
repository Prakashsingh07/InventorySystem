import axios from "axios"

const API_URL = "https://localhost:7069/api/Auth"

export const login = async(data)=>{
    const response = await axios.post(`${API_URL}/login`,data);
    return response.data;
}