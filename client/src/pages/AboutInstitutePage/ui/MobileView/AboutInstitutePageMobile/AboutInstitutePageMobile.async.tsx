import { lazy } from 'react';

export const AboutInstitutePageMobileAsync = lazy(() => new Promise((resolve) => {
    // @ts-ignore
    setTimeout(() => resolve(import('./AboutInstitutePageMobile')), 1000);
}));
