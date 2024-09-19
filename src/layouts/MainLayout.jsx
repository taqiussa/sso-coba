import KTComponent from '../metronic/core/index.ts';
import { useEffect, useState } from 'react';
import KTLayout from '../metronic/app/layouts/demo1.js';
import { useNavigate } from 'react-router-dom';
import ResponsiveSidebar from './partials/ResponsiveSidebar.jsx';
import Sidebar from './partials/Sidebar.jsx';
import Header from '@/components/Header.jsx';
import { cekAuth } from '@/functions/api/index.js';


export default function MainLayout({ children }) {

        cekAuth();

        const navigate = useNavigate();

        const [open, setOpen] = useState(false);

        useEffect(() => {

                KTComponent.init();
                KTLayout.init();

        }, [navigate]);

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
                                        <Header setOpen={setOpen} />
                                        <main className="min-h-screen px-3 py-16">
                                                {children}
                                        </main>
                                        <footer
                                                className="fixed bottom-0 w-full px-2 py-1 border-t text-gray-500 bg-white/30 backdrop-blur border-gray-200">
                                                &copy; Fakultas Farmasi UNISSULA
                                        </footer>
                                </div>
                        </div>
                </>
        )
}
