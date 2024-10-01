import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { apiUrl } from "../config/env";
import { showAlert } from "../alert/showAlert";

export function isAuthenticated() {
        const user = sessionStorage.getItem('user_profile');
        return !!user;
}

export function isTokenExpired(token) {
        if (!token) return true;
        try {
                const decoded = jwtDecode(token);
                const currentTime = Date.now() / 1000;
                return decoded.exp < currentTime;
        } catch (error) {
                console.error("Error decoding token:", error);
                return true;
        }
}

export async function generateToken() {
        try {
                const response = await axios.get(`${apiUrl}/auth/gettoken`, {
                        headers: {
                                'Content-Type': 'application/json',
                        },
                        withCredentials: true
                });
                return response.data.data.access_token;
        } catch (error) {
                console.error('Error regenerating token:', error);
                return null;
        }
}

export function deleteData(url, json) {
        const method = 'DELETE';
        const response = fetchServer(method, url, json);
        return response;
}

export function updateData(url, json) {
        const method = 'PUT';
        const response = fetchServer(method, url, json);
        return response;
}

export function postData(url, json, useFormData = false) {
        const method = 'POST';
        const response = fetchServer(method, url, json, useFormData);
        return response;
}

export function getData(url, json) {
        const method = 'GET';
        const response = fetchServer(method, url, json);
        return response;
}

export async function fetchServer(method, url, json = {}, useFormData = false) {
        let token = localStorage.getItem('access_token');

        if (isTokenExpired(token)) {
                token = await generateToken();
                if (token) {
                        localStorage.setItem('access_token', token);
                } else {
                        throw new Error('Failed to generate new token');
                }
        }

        try {
                const config = {
                        method,
                        maxBodyLength: Infinity,
                        url: `${apiUrl}${url}`,
                        headers: {
                                Authorization: `Bearer ${token}`,
                                'Content-Type': useFormData ? 'multipart/form-data' : 'application/json',
                        },
                        withCredentials: true,
                        data: useFormData ? createFormData(json) : json,
                };

                const response = await axios.request(config);
                return response.data;
        } catch (error) {
                showAlert('error', 'Gagal');
                // console.error('Error in fetchServer:', error);
                // throw error;
        }
}

function createFormData(json) {
        const formData = new FormData();
        Object.keys(json).forEach(key => {
                formData.append(key, json[key]);
        });
        return formData;
}
