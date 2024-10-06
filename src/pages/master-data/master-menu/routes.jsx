import MasterAplikasi from '../master-aplikasi/MasterAplikasi';
import CreateMenu from './CreateMenu';

const masterMenuRoutes = [
        {
                path: '/master_menu',
                element: <MasterAplikasi />
        },
        {
                path: '/create_menu/:id_master_aplikasi',
                element: <CreateMenu />
        }
];

export default masterMenuRoutes;
