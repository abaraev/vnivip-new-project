import { lazy } from 'react';

export const ScienceDepartmentsPageDesktopAsync = lazy(() => new Promise((resolve) => {
    // @ts-ignore
    setTimeout(() => resolve(import('./ScienceDepartmentsPageDesktop')), 1000);
}));
