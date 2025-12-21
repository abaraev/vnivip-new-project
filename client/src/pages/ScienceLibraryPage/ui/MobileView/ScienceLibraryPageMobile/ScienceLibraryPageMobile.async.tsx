import { lazy } from 'react';

export const ScienceLibraryPageMobileAsync = lazy(() => new Promise((resolve) => {
    // @ts-ignore
    setTimeout(() => resolve(import('./ScienceLibraryPageMobile')), 1000);
}));
