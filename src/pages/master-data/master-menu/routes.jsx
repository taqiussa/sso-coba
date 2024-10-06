import CreateMenu from './CreateMenu';
import MasterMenu from './MasterMenu';

const masterMenuRoutes = [
        {
                path: '/master_menu',
                element: <MasterMenu />
        },
        {
                path: '/create_menu/:id_master_aplikasi',
                element: <CreateMenu />
        }
];

export default masterMenuRoutes;
