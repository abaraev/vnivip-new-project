import React, {
    JSX, memo, Suspense, useCallback,
} from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppRoutesProps, routeConfigMobile } from 'shared/config/routeConfig/routeConfig';
import { PageLoaderActivator } from 'widgets/PageLoader';
import { RequireAuth } from './RequireAuth';

const AppRouterMobile = () => {
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
                {Object.values(routeConfigMobile).map(renderWithWrapper)}
            </Routes>
        </Suspense>
    );
};

export default memo(AppRouterMobile);
