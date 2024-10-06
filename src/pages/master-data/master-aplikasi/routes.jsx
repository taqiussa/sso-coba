import CreateAplikasi from "./CreateAplikasi";
import EditAplikasi from "./EditAplikasi";
import MasterAplikasi from "./MasterAplikasi";

const masterAplikasiRoutes = [
        {
                path: '/master_aplikasi',
                element: <MasterAplikasi />
        },
        {
                path: '/create_aplikasi',
                element: <CreateAplikasi />
        },
        {
                path: '/edit_aplikasi/:id_master_aplikasi',
                element: <EditAplikasi />
        }
];

export default masterAplikasiRoutes;
