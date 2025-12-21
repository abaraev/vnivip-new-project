import { lazy } from 'react';

export const ProcurementInfoPageMobileAsync = lazy(() => new Promise((resolve) => {
    // @ts-ignore
    setTimeout(() => resolve(import('./ProcurementInfoPageMobile')), 1000);
}));
