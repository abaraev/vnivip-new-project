import { lazy } from 'react';

export const AdminOrdersDetailsPageDesktopAsync = lazy(() => new Promise((resolve) => {
    // @ts-ignore
    setTimeout(() => resolve(import('./AdminOrdersDetailsPageDesktop')), 1000);
}));
