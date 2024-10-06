import MasterGroup from "./MasterGroup";
import SetAksesGroup from "./SetAksesGroup";

const masterGroupRoutes = [
        {
                path: '/master_group',
                element: <MasterGroup />
        },
        {
                path: '/set_akses_group/:id_master_aplikasi/:id_master_group',
                element: <SetAksesGroup />
        },
];

export default masterGroupRoutes;