import axios from "axios";
import { apiUrl } from "../config/config";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

export function cekAuth() {
        const accessToken = localStorage.getItem('access_token');
        const refreshToken = Cookies.get('refresh_token');

        if (accessToken && !isTokenExpired(accessToken)) {
                return true;
        } else if (refreshToken && !isTokenExpired(refreshToken)) {
                try {
                        const newAccessToken = generateToken();
                        if (newAccessToken) {
                                localStorage.setItem('access_token', newAccessToken);
                                return true;
                        }
                } catch (error) {
                        console.error("Error refreshing token:", error);
                }
        }
        return false;
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
        const refreshToken = Cookies.get('refresh_token');
        if (!refreshToken) return null;

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

export async function deleteData(url, json) {
        const method = 'DELETE';
        const response = fetchServer(method, url, json);
        return response;
}

export async function updateData(url, json) {
        const method = 'PUT';
        const response = fetchServer(method, url, json);
        return response;
}

export async function postData(url, json) {
        const method = 'POST';
        const response = fetchServer(method, url, json);
        return response;
}

export async function getData(url, json) {
        const method = 'GET';
        const response = fetchServer(method, url, json);
        return response;
}

export async function fetchServer(method, url, json = {}) {
        var token = localStorage.getItem('access_token');
        if (isTokenExpired(token)) {
                generateToken();
                token = localStorage.getItem('access_token');
        }

        try {
                let config = {
                        method: method,
                        maxBodyLength: Infinity,
                        url: `${apiUrl}${url}`,
                        headers: {
                                'Authorization': `Bearer ${token}`,
                                'Content-Type' : 'application/json',
                        },
                        withCredentials: true,
                        data: json
                };

                axios.request(config)
                        .then((response) => {
                                console.log(JSON.stringify(response.data));
                        })
                        .catch((error) => {
                                console.log(error);
                        });
        } catch (error) {
                console.error('Error Get Data:', error);
                return null;
        }
}