import MasterAplikasi from '../master-aplikasi/MasterAplikasi';
import CreateMenu from './CreateMenu';
import CreateSubMenu from './CreateSubMenu';

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
                path: '/create_sub_menu/:id_master_aplikasi/:id_master_menu',
                element: <CreateSubMenu />
        }
];

export default masterMenuRoutes;
