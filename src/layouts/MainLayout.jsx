import Sidebar from '../components/Sidebar.tsx';
import Footer from '../components/Footer.tsx';
import Header from '../components/Header.tsx';
import KTComponent from '../metronic/core/index.ts';
import { useEffect } from 'react';
import KTLayout from '../metronic/app/layouts/demo1.js';
import SearchModal from "../components/SearchModal.tsx";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

export default function MainLayout({ children }) {

        const navigate = useNavigate();

        const isTokenExpired = (token) => {
                const decoded = jwtDecode(token);
                const currentTime = Date.now() / 1000;
                return decoded.exp < currentTime;
        };

        useEffect(() => {
                const checkAuth = () => {
                        const token = localStorage.getItem('access_token');
                        const refreshToken = Cookies.get('refresh_token');

                        // Check if access_token exists and is not expired
                        if (!token || isTokenExpired(token)) {
                                if (refreshToken) {
                                        // Optionally handle refresh token logic here if necessary
                                        navigate('/login'); // Or refresh the token
                                } else {
                                        navigate('/login');
                                }
                        }
                };

                checkAuth();

                // Initialize KTComponent and KTLayout (assuming they are globally available)
                KTComponent.init();
                KTLayout.init();

                // Set body classes for the layout
                document.body.className = 'antialiased demo1 flex h-screen text-base text-gray-700 sidebar-fixed header-fixed bg-[#fefefe] dark:bg-coal-500';

                // Cleanup on component unmount
                return () => {
                        document.body.className = 'antialiased h-screen';
                };
        }, [navigate]);

        return (
                <>
                        <div className="flex grow">
                                <Sidebar />
                                <div className="wrapper flex grow flex-col">
                                        <Header />
                                        <main className="grow content pt-5" id="content" role="content">
                                                {children}
                                        </main>
                                        <Footer />
                                </div>
                        </div>
                        <SearchModal />
                </>
        )
}
