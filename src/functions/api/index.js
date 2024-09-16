import axios from "axios"
import { apiUrl } from "../config"
import { jwtDecode } from "jwt-decode";

export function cekToken(token) {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Convert to seconds
        return decoded.exp < currentTime;
}

export async function generateToken() {
        const token = Cookies.get('refresh_token')
        try {
                const response = await axios.get(`${apiUrl}/auth/gettoken`, {
                        headers: {
                                'Authorization': `Bearer ${token}`,
                                'Content-Type': 'application/json',
                        },
                });

                // Assuming the new token comes from response.data.token
                const newToken = response.data.token;

                // Save the new token to localStorage or sessionStorage
                localStorage.setItem('access_token', newToken);

                return newToken;
        } catch (error) {
                console.error('Error regenerating token:', error);
                return null;
        }
}