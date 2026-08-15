import { lazy } from 'react';

export const ClinicPageMobileAsync = lazy(() => new Promise((resolve) => {
    // @ts-ignore
    setTimeout(() => resolve(import('./ClinicPageMobile')), 500);
}));
