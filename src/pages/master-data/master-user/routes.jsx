import CreateUser from "./CreateUser";
import EditUser from "./EditUser";
import MasterUser from "./MasterUser";

const masterUserRoutes = [
        {
                path: '/master_user',
                element: <MasterUser />
        },
        {
                path: '/create_user',
                element: <CreateUser />
        },
        {
                path: '/edit-user/:id_user',
                element: <EditUser />
        }
];

export default masterUserRoutes;
