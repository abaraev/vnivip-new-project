import { lazy } from 'react';

export const CouncilYoungScientistsPageMobileAsync = lazy(() => new Promise((resolve) => {
    // @ts-ignore
    setTimeout(() => resolve(import('./CouncilYoungScientistsPageMobile')), 1000);
}));
