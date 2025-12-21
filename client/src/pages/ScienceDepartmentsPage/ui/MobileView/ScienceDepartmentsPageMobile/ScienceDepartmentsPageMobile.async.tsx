import { lazy } from 'react';

export const ScienceDepartmentsPageMobileAsync = lazy(() => new Promise((resolve) => {
    // @ts-ignore
    setTimeout(() => resolve(import('./ScienceDepartmentsPageMobile')), 1000);
}));
