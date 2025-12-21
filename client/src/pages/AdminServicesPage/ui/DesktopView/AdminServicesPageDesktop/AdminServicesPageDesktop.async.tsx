import { lazy } from 'react';

export const AdminServicesPageDesktopAsync = lazy(() => new Promise((resolve) => {
    // @ts-ignore
    setTimeout(() => resolve(import('./AdminServicesPageDesktop')), 1000);
}));
