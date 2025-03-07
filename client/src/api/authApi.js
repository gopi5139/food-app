import axios from "axios";

const API_URL = "http://192.168.0.60:8080/api/auth";

export const sendOTP = async (phone) => {
    return axios.post(`${API_URL}/send-otp`, { phone });
};

export const verifyOTP = async (phone, otp) => {
    return axios.post(`${API_URL}/verify-otp`, { phone, otp });
};

export const updateProfile = async (phone, email, address) => {
    return axios.post(`${API_URL}/update-profile`, { phone, email, address });
};
