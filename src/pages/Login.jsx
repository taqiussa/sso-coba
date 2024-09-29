import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getData } from "@/functions/api/api";
import { apiUrl } from "@/functions/config/env";
import { useUser } from "@/functions/provider/UserProvider";
import PageTitle from "@/layouts/partials/PageTitle";

export default function Login() {
        const [showPassword, setShowPassword] = useState(false);
        const [loading, setLoading] = useState(false);
        const [username, setUsername] = useState('');
        const [password, setPassword] = useState('');
        const [error, setError] = useState('');
        const { user, login } = useUser();
        const navigate = useNavigate();
        const location = useLocation();

        const togglePasswordVisibility = () => {
                setShowPassword(!showPassword);
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
                                // sessionStorage.setItem('user_profile', JSON.stringify(loginData.data[0]));
                                login(loginData.data[0])
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
                if (user) {
                        const from = location.state?.from?.pathname || '/dashboard';
                        navigate(from, { replace: true });
                }
        }, [user, navigate]);

        return (
                <>
                        <PageTitle title="LOGIN" />
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
                                                                        <div className={`${loading ? 'inline-flex' : 'hidden'}`}>
                                                                                <i className="ki-filled ki-notification-circle animate-spin"></i>
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
