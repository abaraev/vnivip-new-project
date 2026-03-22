import { lazy } from 'react';

export const AdminAuthPageDesktopAsync = lazy(() => new Promise((resolve) => {
    // @ts-ignore
    setTimeout(() => resolve(import('./AdminAuthPageDesktop')), 500);
}));
