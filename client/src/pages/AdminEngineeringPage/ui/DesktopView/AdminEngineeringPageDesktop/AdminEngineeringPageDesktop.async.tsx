import { lazy } from 'react';

export const AdminEngineeringPageDesktopAsync = lazy(() => new Promise((resolve) => {
    // @ts-ignore
    setTimeout(() => resolve(import('./AdminEngineeringPageDesktop')), 500);
}));
