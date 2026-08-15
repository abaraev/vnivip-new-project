import { lazy } from 'react';

export const EngineeringPageMobileAsync = lazy(() => new Promise((resolve) => {
    // @ts-ignore
    setTimeout(() => resolve(import('./EngineeringPageMobile')), 500);
}));
