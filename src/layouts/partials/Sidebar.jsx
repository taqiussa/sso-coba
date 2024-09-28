import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/functions/provider/UserProvider";

export default function Sidebar({ menus = {} }) {
        const navigate = useNavigate();
        const [loading, setLoading] = useState(false);
        const { logout } = useUser();

        const handleLogout = () => {
                logout();
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
                                                                                to={`/${item.modul_path}`} // Use modul_path for routing
                                                                                className="menu-link gap-[14px] pl-[10px] pr-[10px] py-[8px] border border-transparent items-center grow menu-item-active:bg-secondary-active dark:menu-item-active:bg-coal-300 dark:menu-item-active:border-gray-100 menu-item-active:rounded-lg hover:bg-secondary-active dark:hover:bg-coal-300 dark:hover:border-gray-100 hover:rounded-lg"
                                                                                tabIndex={0}>
                                                                                <span className="menu-bullet flex w-[6px] relative before:absolute before:top-0 before:size-[6px] before:rounded-full before:-translate-x-1/2 before:-translate-y-1/2 menu-item-active:before:bg-primary menu-item-hover:before:bg-primary"></span>
                                                                                <span className="menu-title text-2sm font-medium text-gray-700 menu-item-active:text-primary menu-item-active:font-semibold menu-link-hover:!text-primary">
                                                                                        {item.nama_modul} {/* Render the item name */}
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
                                                                <svg aria-hidden="true" className="size-4 mr-2 text-slate-600 animate-spin fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                                </svg>
                                                        </div>
                                                </span>
                                        </div>
                                </div>
                        </div>
                </div>
        );
}
