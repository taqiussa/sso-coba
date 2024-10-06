import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import KTComponent from '../metronic/core/index.ts';
import KTLayout from '../metronic/app/layouts/demo1.js';
import ResponsiveSidebar from './partials/ResponsiveSidebar.jsx';
import Sidebar from './partials/Sidebar.jsx';
import Header from '@/components/Header.jsx';
import { UserContext } from '@/functions/provider/UserProvider.jsx';
import { getData } from '@/functions/api/api.js';

export default function MainLayout({ children }) {
        const navigate = useNavigate();
        const [open, setOpen] = useState(false);
        const [loading, setLoading] = useState(false);
        const [menus, setMenus] = useState({});
        const { user, logout } = useContext(UserContext);
        const [apps, setApps] = useState({});

        const fetchMenu = async () => {
                if (!user) return;

                try {
                        const response = await getData(`groupakses/usermenu/${user.id_user}/99da12ac-6f5a-4012-b51b-1c21aadf4787`);

                        if (response?.success) {
                                setMenus(response.data?.menu || []);
                                sessionStorage.setItem('menu', JSON.stringify(response?.data?.menu))
                        } else {
                                console.error("Failed to fetch menu: ", response.message);
                        }
                } catch (error) {
                        console.error("Error fetching menu: ", error);
                }
        };

        const fetchApps = async () => {
                if (!user) return;

                try {
                        const response = await getData(`groupakses/userapps/${user.id_user}`);
                        if (response?.success) {
                                setApps(response.data?.apps);
                        } else {
                                console.error("Failed to fetch apps: ", response.message);
                        }
                } catch (error) {
                        console.error("Error fetching menu: ", error);
                }
        };

        const handleLogout = () => {
                logout();
                navigate('/login');
        };

        useEffect(() => {
                KTComponent.init();
                KTLayout.init();
                fetchMenu();
                fetchApps();
                // return () => {
                // };
        }, [user]);

        return (
                <>
                        <div className="block lg:hidden">
                                <ResponsiveSidebar open={open} setOpen={setOpen} menus={menus} />
                        </div>
                        <div className="flex">
                                <aside className="z-20 hidden h-full py-10 overflow-y-auto bg-white lg:fixed lg:block lg:w-80">
                                        <Sidebar menus={menus} setOpen={setOpen} open={open} />
                                </aside>
                                <div className="flex-1 w-full overflow-y-auto lg:ml-80">
                                        {
                                                user &&
                                                <Header setOpen={setOpen} user={user} logout={handleLogout} loading={loading} apps={apps ?? []} />
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
