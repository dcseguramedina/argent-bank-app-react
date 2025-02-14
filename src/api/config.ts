import axios from "axios";

//  Define the API Base URL
export const API_URL = 'http://localhost:3001/api/v1';

// Create an Axios Instance to pre-configure request
export const api = axios.create({
    baseURL: API_URL,
    headers: { 'Content-Type': 'application/json' }
});

// Create a function to manage authentication tokens stored in the browser's localStorage
export const useToken = () => {
    const getToken = () => localStorage.getItem('token');
    const setToken = (token: string) => localStorage.setItem('token', token);
    const removeToken = () => localStorage.removeItem('token');
    return { getToken, setToken, removeToken };
};

export const handleError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
        return error.response?.data.message || error.message;
    }
    return 'An unexpected error has occurred';
};
