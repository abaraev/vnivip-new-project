import { lazy } from 'react';

export const CouncilYoungScientistsPageDesktopAsync = lazy(() => new Promise((resolve) => {
    // @ts-ignore
    setTimeout(() => resolve(import('./CouncilYoungScientistsPageDesktop')), 1000);
}));
