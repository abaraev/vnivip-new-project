import { lazy } from 'react';

export const ScienceLibraryPageDesktopAsync = lazy(() => new Promise((resolve) => {
    // @ts-ignore
    setTimeout(() => resolve(import('./ScienceLibraryPageDesktop')), 1000);
}));
