import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
});

// Add interceptor to include token in headers
api.interceptors.request.use((config) => {
    const authData = JSON.parse(localStorage.getItem('auth-storage'));
    if (authData?.state?.token) {
        config.headers.Authorization = `Bearer ${authData.state.token}`;
    }
    return config;
});

export const loginUser = async (credentials) => {
    return await api.post('/users/login', credentials);
};

export const registerUser = async (userData) => {
    return await api.post('/users/register', userData);
};

export const fetchBuses = async (query = {}) => {
    const params = new URLSearchParams(query).toString();
    return await api.get(`/buses?${params}`);
};

export const fetchBusDetails = async (id) => {
    return await api.get(`/buses/${id}`);
};

export const createBooking = async (bookingData) => {
    return await api.post('/bookings', bookingData);
};

export const getBookings = async () => {
    return await api.get('/bookings/my');
};

// Admin specific calls
export const getAllBookings = async () => {
    return await api.get('/bookings');
};

export const getAllBuses = async () => {
    return await api.get('/buses');
};

export const addBus = async (busData) => {
    return await api.post('/buses', busData);
};

export const updateBus = async (id, busData) => {
    return await api.put(`/buses/${id}`, busData);
};

export const deleteBus = async (id) => {
    return await api.delete(`/buses/${id}`);
};
