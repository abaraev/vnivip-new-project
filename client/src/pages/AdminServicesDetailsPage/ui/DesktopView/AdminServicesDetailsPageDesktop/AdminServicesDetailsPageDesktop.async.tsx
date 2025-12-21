import { lazy } from 'react';

export const AdminServicesDetailsPageDesktopAsync = lazy(() => new Promise((resolve) => {
    // @ts-ignore
    setTimeout(() => resolve(import('./AdminServicesDetailsPageDesktop')), 1000);
}));
