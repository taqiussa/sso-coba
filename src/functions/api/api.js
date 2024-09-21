import axios from "axios";
import { apiLaravel } from "../config/config";
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
                const response = await axios.get(`${apiLaravel}/auth/gettoken`, {
                        headers: {
                                'Authorization': `Bearer ${refreshToken}`,
                                'Content-Type': 'application/json',
                        },
                });
                return response.data.data.access_token;
        } catch (error) {
                console.error('Error regenerating token:', error);
                return null;
        }
}

export async function getData(url, params = {}) {
        const token = localStorage.getItem('access_token');
        if (!token) {
                const regenerate = generateToken();
                if (regenerate) {
                        localStorage.setItem('access_token', regenerate.data.access_token);
                } else {
                        return null;
                }
        }

        try {
                const response = await axios.get(`${apiLaravel}${url}`, {
                        params,
                        headers: {
                                'Authorization': `Bearer ${token}`,
                                'Content-Type': 'application/json',
                        },
                });
                return response;
        } catch (error) {
                console.error('Error Get Data:', error);
                return null;
        }
}