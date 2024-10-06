import CreateGroup from "./CreateGroup";
import MasterGroup from "./MasterGroup";
import SetAksesGroup from "./SetAksesGroup";

const masterGroupRoutes = [
        {
                path: '/master_group',
                element: <MasterGroup />
        },
        {
                path: '/master_group/:id_master_aplikasi',
                element: <MasterGroup />
        },
        {
                path: '/create_group/:id_master_aplikasi',
                element: <CreateGroup />
        },
        {
                path: '/edit_group/:id_master_aplikasi',
                element: <CreateGroup />
        },
        {
                path: '/set_akses_group/:id_master_aplikasi/:id_master_group',
                element: <SetAksesGroup />
        },
];

export default masterGroupRoutes;