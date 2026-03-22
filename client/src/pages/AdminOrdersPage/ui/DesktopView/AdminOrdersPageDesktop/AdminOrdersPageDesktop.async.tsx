import { lazy } from 'react';

export const AdminOrdersPageDesktopAsync = lazy(() => new Promise((resolve) => {
    // @ts-ignore
    setTimeout(() => resolve(import('./AdminOrdersPageDesktop')), 500);
}));
