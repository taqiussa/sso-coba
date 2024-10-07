import MasterAplikasi from '../master-aplikasi/MasterAplikasi';
import CreateMenu from './CreateMenu';
import CreateSubMenu from './CreateSubMenu';
import EditMenu from './EditMenu';
import EditSubMenu from './EditSubMenu';

const masterMenuRoutes = [
        {
                path: '/master_menu',
                element: <MasterAplikasi />
        },
        {
                path: '/create_menu/:id_master_aplikasi',
                element: <CreateMenu />
        },
        {
                path: '/edit_menu/:id_master_aplikasi/:id_master_menu',
                element: <EditMenu />
        },
        {
                path: '/create_sub_menu/:id_master_aplikasi/:id_master_menu',
                element: <CreateSubMenu />
        },
        {
                path: '/edit_sub_menu/:id_master_aplikasi/:id_master_menu/:id_master_modul',
                element: <EditSubMenu />
        },
];

export default masterMenuRoutes;
