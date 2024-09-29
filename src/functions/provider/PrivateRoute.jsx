import React, { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { UserContext } from './UserProvider';
import MainLayout from '@/layouts/MainLayout';

const PrivateRoute = () => {
        const { user } = useContext(UserContext);
        const location = useLocation();

        return user ?
                <MainLayout>
                        <Outlet />
                </MainLayout>
                :
                <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;