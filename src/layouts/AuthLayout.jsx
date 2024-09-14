import Sidebar from '../components/Sidebar.tsx';
import Footer from '../components/Footer.tsx';
import Header from '../components/Header.tsx';
import KTComponent from '../metronic/core/index.ts';
import { useEffect } from 'react';
import KTLayout from '../metronic/app/layouts/demo1.js';
import SearchModal from "../components/SearchModal.tsx";
import { useNavigate } from 'react-router-dom';

export default function AuthLayout({ children }) {

        const navigate = useNavigate();

        useEffect(() => {
                const checkAuth = () => {
                        const token = localStorage.getItem('access_token');
                        if (!token) {
                                navigate('/login');
                        }
                };

                checkAuth();
                KTComponent.init();
                KTLayout.init();
                document.body.className = 'antialiased demo1 flex h-screen text-base text-gray-700 sidebar-fixed header-fixed bg-[#fefefe] dark:bg-coal-500';

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
                                                <div className="container-fixed" id="content_container">
                                                        {children}
                                                </div>
                                                {/* <div className="container-fixed">
                                                        {children}
                                                </div> */}
                                        </main>
                                        <Footer />
                                </div>
                        </div>
                        <SearchModal />
                </>
        )
}
