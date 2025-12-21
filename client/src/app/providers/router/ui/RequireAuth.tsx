import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAdminData, getAdminIsInit } from 'entities/Admin';

export function RequireAuth({ children }: { children: JSX.Element }) {
    const location = useLocation();
    const isAuth = useSelector(getAdminData);
    const isInit = useSelector(getAdminIsInit);

    if (!isInit) {
        return null;
    }

    if (!isAuth) {
        return <Navigate to="/admin_auth" state={{ from: location }} replace />;
    }

    return children;
}
