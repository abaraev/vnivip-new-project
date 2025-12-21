import { lazy } from 'react';

export const EducationPageMobileAsync = lazy(() => new Promise((resolve) => {
    // @ts-ignore
    setTimeout(() => resolve(import('./EducationPageMobile')), 1000);
}));
