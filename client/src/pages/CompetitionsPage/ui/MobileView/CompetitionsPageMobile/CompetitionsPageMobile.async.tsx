import { lazy } from 'react';

export const CompetitionsPageMobileAsync = lazy(() => new Promise((resolve) => {
    // @ts-ignore
    setTimeout(() => resolve(import('./CompetitionsPageMobile')), 500);
}));
