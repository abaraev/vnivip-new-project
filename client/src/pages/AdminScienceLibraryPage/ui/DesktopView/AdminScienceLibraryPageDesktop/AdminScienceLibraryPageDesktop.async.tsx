import { lazy } from 'react';

export const AdminScienceLibraryPageDesktopAsync = lazy(() => new Promise((resolve) => {
    // @ts-ignore
    setTimeout(() => resolve(import('./AdminScienceLibraryPageDesktop')), 500);
}));
