import { lazy } from 'react';

export const EngineeringPageDesktopAsync = lazy(() => new Promise((resolve) => {
    // @ts-ignore
    setTimeout(() => resolve(import('./EngineeringPageDesktop')), 500);
}));
