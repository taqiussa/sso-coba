import axios from "axios"
import { apiUrl } from "../config"
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


export function cekAuth() {
        const navigate = useNavigate();

        useEffect(() => {
                const token = localStorage.getItem('access_token');

                if (!token) {
                        navigate('/login');
                } 
                // else {
                //         if (cekToken(token)) {
                //                 localStorage.removeItem('access_token');
                //                 navigate('/login');
                //         }
                // }
        }, [navigate]);

        return null;
}

export function cekToken(token) {
        try {
                const decoded = jwtDecode(token);
                const currentTime = Date.now() / 1000;
                return decoded.exp < currentTime;
        } catch (error) {
                console.error("Invalid token", error);
                return true;
        }
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

                const newToken = response.data.token;

                localStorage.setItem('access_token', newToken);

                return newToken;
        } catch (error) {
                console.error('Error regenerating token:', error);
                return null;
        }
}

export async function getData(url, token, params) {
        try {
                const response = await axios.get(`${apiUrl}${url}`, {
                        params
                }, {
                        headers: {
                                'Authorization': `Bearer ${token}`,
                                'Content-Type': 'application/json',
                        },
                });

                return response;
        } catch (error) {
                console.error('Error Get Data :', error);
                return null;
        }
}