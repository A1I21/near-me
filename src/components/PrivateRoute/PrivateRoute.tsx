import React from 'react'
import { Navigate, useLocation, } from 'react-router-dom';
import Cookies from 'universal-cookie'

export default function PrivateRoute({ children }: { children: JSX.Element }) {
    const cookies = new Cookies();
    const user = cookies.get('_user')
    const location = useLocation();

    if (!user?.token) {
        return <Navigate to="/signin" state={{ from: location }} replace />;
    }
    return children;
}

