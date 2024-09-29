import Sidebar from "./Sidebar";

export default function ResponsiveSidebar({ open, setOpen, menus }) {
        return (
                <div
                        className={`fixed flex top-0 z-40 w-full h-full ${open
                                ? "translate-x-0 transition-all transform duration-500"
                                : "-translate-x-full transition-all transform duration-500"
                                }`}
                >
                        <div
                                className="h-full py-10 overflow-y-auto bg-white shadow-md w-80">
                                <Sidebar menus={menus} setOpen={setOpen} open={open} />
                        </div>
                        <div
                                onClick={() => setOpen(false)}
                                className="flex-1 bg-black bg-opacity-70">
                        </div>
                </div>
        );
};
