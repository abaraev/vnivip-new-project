import { lazy } from 'react';

export const ScienceEducationActivityPageMobileAsync = lazy(() => new Promise((resolve) => {
    // @ts-ignore
    setTimeout(() => resolve(import('./ScienceEducationActivityPageMobile')), 1000);
}));
