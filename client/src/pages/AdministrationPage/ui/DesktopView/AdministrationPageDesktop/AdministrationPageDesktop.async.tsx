import { lazy } from 'react';

export const AdministrationPageDesktopAsync = lazy(() => new Promise((resolve) => {
    // @ts-ignore
    setTimeout(() => resolve(import('./AdministrationPageDesktop')), 1000);
}));
