import { lazy } from 'react';

export const ProcurementInfoPageDesktopAsync = lazy(() => new Promise((resolve) => {
    // @ts-ignore
    setTimeout(() => resolve(import('./ProcurementInfoPageDesktop')), 1000);
}));
