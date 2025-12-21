import { lazy } from 'react';

export const AdminActsPageDesktopAsync = lazy(() => new Promise((resolve) => {
    // @ts-ignore
    setTimeout(() => resolve(import('./AdminActsPageDesktop')), 1000);
}));
