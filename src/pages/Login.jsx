import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { getData, isAuthenticated } from "@/functions/api/api";
import { apiUrl } from "@/functions/config/env";
// import { useUser } from "@/layouts/partials/UserContext";

export default function Login() {
        const [showPassword, setShowPassword] = useState(false);
        const [loading, setLoading] = useState(false);
        const [username, setUsername] = useState('');
        const [password, setPassword] = useState('');
        const [error, setError] = useState('');
        const navigate = useNavigate();
        // const { login } = useUser();

        const togglePasswordVisibility = () => {
                setShowPassword(!showPassword);
        };

        const checkAuth = () => {
                const loginUser = isAuthenticated();
                if (!loginUser) {
                        navigate('/login');
                } else {
                        navigate('/dashboard');
                }
        };

        const submit = async (event) => {
                event.preventDefault();
                setLoading(true);
                setError('');

                try {
                        const response = await axios.post(`${apiUrl}auth/login`, {
                                username, password
                        }, {
                                headers: {
                                        'Content-Type': 'application/json',
                                },
                                withCredentials: true,
                                credentials: "include"
                        });

                        if (response.data.success) {
                                const { access_token, user } = response.data.data;
                                localStorage.setItem('access_token', access_token);
                                localStorage.setItem('user', JSON.stringify(user));
                                const loginData = await getData('users/' + user.id_user);
                                sessionStorage.setItem('user_profile', JSON.stringify(loginData.data[0]));
                                // if (loginData) {
                                //         login(loginData.data[0]);
                                // }

                                navigate('/dashboard');
                        } else {
                                setError(response.data.message || 'Login failed. Please try again.');
                        }
                } catch (error) {
                        console.error("Error during login:", error.response || error);
                        setError(error.response?.data?.message || 'An error occurred. Please try again.');
                } finally {
                        setLoading(false);
                }
        };

        useEffect(() => {
                
                checkAuth();
        }, []);


        return (
                <>
                        <HelmetProvider>
                                <Helmet>
                                        <title>FF UNISSULA - LOGIN</title>
                                </Helmet>
                        </HelmetProvider>
                        <div className="lg:grid lg:grid-cols-2 h-screen bg-bg-farmasi bg-top lg:bg-none">
                                <div className="flex lg:hidden justify-center items-center">
                                        <img className="w-44" src="/logo-unggul.png" />
                                </div>
                                <div className="flex justify-center items-center lg:p-15 order-2 lg:order-1">
                                        <div className="card max-w-[380px] w-full">
                                                <h3 className="text-2xl lg:hidden text-center font-semibold pt-7 text-slate-700">
                                                        FAKULTAS FARMASI <br />
                                                        UNISSULA
                                                </h3>
                                                <form onSubmit={submit} className="card-body flex flex-col gap-5 p-10" id="sign_in_form" method="get">
                                                        <div className="flex flex-col gap-1">
                                                                <label className="form-label text-gray-900">
                                                                        Username
                                                                </label>
                                                                <input
                                                                        className="input"
                                                                        placeholder="Username"
                                                                        type="text"
                                                                        name="username"
                                                                        value={username}
                                                                        onChange={(e) => setUsername(e.target.value)}
                                                                />
                                                        </div>
                                                        <div className="flex flex-col gap-1">
                                                                <div className="flex items-center justify-between gap-1">
                                                                        <label className="form-label text-gray-900">
                                                                                Password
                                                                        </label>
                                                                        <a className="text-2sm link shrink-0">
                                                                                Forgot Password?
                                                                        </a>
                                                                </div>
                                                                <label className="input flex items-center">
                                                                        <input
                                                                                name="password"
                                                                                placeholder="Enter Password"
                                                                                type={showPassword ? "text" : "password"} // Toggle input type
                                                                                value={password}
                                                                                onChange={(e) => setPassword(e.target.value)}
                                                                        />
                                                                        <button type="button" className="btn btn-icon" onClick={togglePasswordVisibility}>
                                                                                <i className={`ki-filled ki-eye text-gray-500 ${showPassword ? 'hidden' : 'block'}`}></i>
                                                                                <i className={`ki-filled ki-eye-slash text-gray-500 ${showPassword ? 'block' : 'hidden'}`}></i>
                                                                        </button>
                                                                </label>
                                                        </div>
                                                        <button className="btn btn-primary flex justify-center grow" disabled={loading}>
                                                                Sign In {
                                                                        loading &&
                                                                        <div>
                                                                                <svg aria-hidden="true" className="w-5 h-5 mr-2 text-white animate-spin fill-gray-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                                                </svg>
                                                                        </div>
                                                                }
                                                        </button>
                                                        <Link to="/" className="btn btn-dark flex justify-center grow" disabled={loading}>
                                                                Cancel
                                                        </Link>
                                                </form>
                                        </div>
                                </div>
                                <div className="lg:rounded-xl lg:border lg:border-gray-200 lg:m-2 order-1 lg:order-2 lg:bg-cover bg-top bg-no-repeat bg-bg-farmasi hidden lg:block">
                                        <div className="flex flex-col p-2 lg:p-5 gap-2">
                                                <div>
                                                        <img className="w-44" src="/logo-unggul.png" />
                                                </div>
                                                <div className="flex flex-col gap-2">
                                                        <h3 className="text-2xl font-semibold text-gray-900">
                                                                FAKULTAS FARMASI
                                                        </h3>
                                                        <div className="text-base font-medium text-gray-900">
                                                                A robust authentication gateway ensuring
                                                                <br />
                                                                secure
                                                                <span className="text-gray-900 font-semibold">
                                                                        efficient user access
                                                                </span>
                                                                to the Metronic
                                                                <br />
                                                                Dashboard interface.
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                        </div>
                </>
        );
}
