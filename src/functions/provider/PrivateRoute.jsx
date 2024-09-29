import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from './UserProvider';
import MainLayout from '@/layouts/MainLayout';

const PrivateRoute = () => {
        const { user } = useContext(UserContext);

        return user ?
                <MainLayout>
                        <Outlet />
                </MainLayout>
                :
                <Navigate to="/login" />;
};

export default PrivateRoute;