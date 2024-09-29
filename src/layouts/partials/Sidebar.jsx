import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/functions/provider/UserProvider";

export default function Sidebar({ menus = {} }) {
        const navigate = useNavigate();
        const [loading, setLoading] = useState(false);
        const { logout } = useUser();

        const handleLogout = async () => {
                setLoading(true);
                const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
                await delay(1000);

                logout();

                setLoading(false);

                navigate('/login');
        };

        return (
                <div className='dark:bg-coal-600 px-4 h-full bg-light border-r border-r-gray-200 dark:border-r-coal-100'>
                        <Link className="dark:hidden" to="/home">
                                <img className="default-logo min-h-[22px] max-w-none" src="/media/app/default-logo.svg" />
                        </Link>
                        <div
                                className="menu flex flex-col grow gap-0.5 pt-10"
                                data-menu="true"
                                data-menu-accordion-expand-all="false"
                                id="sidebar_menu">
                                <div
                                        className="menu-item"
                                        data-menu-item-toggle="accordion"
                                        data-menu-item-trigger="click">
                                        <Link to='/dashboard'
                                                className="menu-link flex items-center grow cursor-pointer border border-transparent gap-[10px] pl-[10px] pr-[10px] py-[6px]"
                                                tabIndex={0}>
                                                <span className="menu-icon items-start text-gray-500 dark:text-gray-400 w-[20px]">
                                                        <i className="ki-filled ki-copy text-lg"></i>
                                                </span>
                                                <span className="menu-title text-sm font-semibold text-gray-700 menu-item-active:text-primary menu-link-hover:!text-primary">
                                                        Dashboard
                                                </span>
                                        </Link>
                                </div>
                                {Object.entries(menus).map(([category, items]) => (
                                        <div
                                                key={category}
                                                className="menu-item"
                                                data-menu-item-toggle="accordion"
                                                data-menu-item-trigger="click">
                                                <div
                                                        className="menu-link flex items-center grow cursor-pointer border border-transparent gap-[10px] pl-[10px] pr-[10px] py-[6px]"
                                                        tabIndex={0}>
                                                        <span className="menu-icon items-start text-gray-500 dark:text-gray-400 w-[20px]">
                                                                <i className="ki-filled ki-element-11 text-lg"></i>
                                                        </span>
                                                        <span className="menu-title text-sm font-semibold text-gray-700 menu-item-active:text-primary menu-link-hover:!text-primary">
                                                                {category}
                                                        </span>
                                                        <span className="menu-arrow text-gray-400 w-[20px] shrink-0 justify-end ml-1 mr-[-10px]">
                                                                <i className="ki-filled ki-plus text-2xs menu-item-show:hidden"></i>
                                                                <i className="ki-filled ki-minus text-2xs hidden menu-item-show:inline-flex"></i>
                                                        </span>
                                                </div>
                                                <div className="menu-accordion gap-0.5 pl-[10px] relative before:absolute before:left-[20px] before:top-0 before:bottom-0 before:border-l before:border-gray-200">
                                                        {items.map((item, index) => (
                                                                <div key={index} className="menu-item">
                                                                        <Link
                                                                                to={`/${item.modul_path}`}
                                                                                className="menu-link gap-[14px] pl-[10px] pr-[10px] py-[8px] border border-transparent items-center grow menu-item-active:bg-secondary-active dark:menu-item-active:bg-coal-300 dark:menu-item-active:border-gray-100 menu-item-active:rounded-lg hover:bg-secondary-active dark:hover:bg-coal-300 dark:hover:border-gray-100 hover:rounded-lg"
                                                                                tabIndex={0}>
                                                                                <span className="menu-bullet flex w-[6px] relative before:absolute before:top-0 before:size-[6px] before:rounded-full before:-translate-x-1/2 before:-translate-y-1/2 menu-item-active:before:bg-primary menu-item-hover:before:bg-primary"></span>
                                                                                <span className="menu-title capitalize text-2sm font-medium text-gray-700 menu-item-active:text-primary menu-item-active:font-semibold menu-link-hover:!text-primary">
                                                                                        {item.nama_modul}
                                                                                </span>
                                                                        </Link>
                                                                </div>
                                                        ))}
                                                </div>
                                        </div>
                                ))}
                                <div
                                        className="menu-item"
                                        data-menu-item-toggle="accordion"
                                        data-menu-item-trigger="click">
                                        <div
                                                onClick={handleLogout}
                                                className="menu-link flex items-center grow cursor-pointer border border-transparent gap-[10px] pl-[10px] pr-[10px] py-[6px]"
                                                tabIndex={0}>
                                                <span className="menu-icon items-start text-gray-500 dark:text-gray-400 w-[20px]">
                                                        <i className="ki-filled ki-exit-right text-lg"></i>
                                                </span>
                                                <span className="menu-title text-sm font-semibold text-gray-700 menu-item-active:text-primary menu-link-hover:!text-primary">
                                                        Sign Out
                                                </span>
                                                <span className="menu-arrow text-gray-400 w-[20px] shrink-0 justify-end ml-1 mr-[-10px]">
                                                        <div className={`${loading ? 'inline-flex' : 'hidden'}`}>
                                                                <i className="ki-filled ki-notification-circle animate-spin"></i>
                                                        </div>
                                                </span>
                                        </div>
                                </div>
                        </div>
                </div>
        );
}
