import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import KTComponent from '../metronic/core/index.ts';
import KTLayout from '../metronic/app/layouts/demo1.js';
import ResponsiveSidebar from './partials/ResponsiveSidebar.jsx';
import Sidebar from './partials/Sidebar.jsx';
import Header from '@/components/Header.jsx';
import { isAuthenticated } from '@/functions/api/api.js';

export default function MainLayout({ children }) {
        const navigate = useNavigate();
        const [open, setOpen] = useState(false);
        const [loading, setLoading] = useState(false);
        const [user, setUser] = useState(null);

        const logout = async () => {
                setLoading(true);
                try {
                        await new Promise(resolve => setTimeout(resolve, 1000));

                        localStorage.removeItem('access_token');
                        sessionStorage.removeItem('user_profile');

                        navigate('/login');
                } catch (error) {
                        console.error('Logout failed:', error);
                } finally {
                        setLoading(false);
                }
        };

        const checkAuth = () => {
                const loginUser = isAuthenticated();
                if (loginUser) {
                        setUser(JSON.parse(sessionStorage.getItem('user_profile')));
                } else {
                        localStorage.removeItem('access_token');

                        navigate('/login');
                }
        };

        useEffect(() => {

                checkAuth();

        }, [navigate]);

        useEffect(() => {
                KTComponent.init();
                KTLayout.init();

                checkAuth();

        }, []);

        return (
                <>
                        <div className="block lg:hidden">
                                <ResponsiveSidebar open={open} setOpen={setOpen} />
                        </div>
                        <div className="flex">
                                <aside className="z-20 hidden h-full py-10 overflow-y-auto bg-white lg:fixed lg:block lg:w-80">
                                        <Sidebar />
                                </aside>
                                <div className="flex-1 w-full overflow-y-auto lg:ml-80">
                                        {
                                                user &&
                                                <Header setOpen={setOpen} user={user} logout={logout} loading={loading} />


                                        }
                                        <main className="min-h-screen px-3 py-16">
                                                {children}
                                        </main>
                                        <footer className="fixed bottom-0 w-full px-2 py-1 border-t text-gray-500 bg-white/30 backdrop-blur border-gray-200">
                                                &copy; Fakultas Farmasi UNISSULA
                                        </footer>
                                </div>
                        </div>
                </>
        );
}
