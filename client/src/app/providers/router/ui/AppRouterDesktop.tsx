import React, {
    JSX, memo, Suspense, useCallback,
} from 'react';
import { Route, Routes } from 'react-router-dom';
import { PageLoaderActivator } from 'widgets/PageLoader';
import { AppRoutesProps, routeConfigDesktop } from 'shared/config/routeConfig/routeConfig';
import { RequireAuth } from './RequireAuth';

const AppRouterDesktop = () => {
    const renderWithWrapper = useCallback((route: AppRoutesProps) => {
        if (route.authOnly) {
            return (
                <Route
                    key={route.path}
                    path={route.path}
                    element={<RequireAuth>{route.element as JSX.Element}</RequireAuth>}
                />
            );
        }

        return (
            <Route
                key={route.path}
                path={route.path}
                element={route.element}
            />
        );
    }, []);

    return (
        <Suspense fallback={<PageLoaderActivator />}>
            <Routes>
                {Object.values(routeConfigDesktop).map(renderWithWrapper)}
            </Routes>
        </Suspense>
    );
};

export default memo(AppRouterDesktop);
