import { lazy } from 'react';

export const AdministrationPageMobileAsync = lazy(() => new Promise((resolve) => {
    // @ts-ignore
    setTimeout(() => resolve(import('./AdministrationPageMobile')), 1000);
}));
