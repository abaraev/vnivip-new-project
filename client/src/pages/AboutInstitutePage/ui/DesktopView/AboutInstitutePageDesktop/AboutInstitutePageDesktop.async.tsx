import { lazy } from 'react';

export const AboutInstitutePageDesktopAsync = lazy(() => new Promise((resolve) => {
    // @ts-ignore
    setTimeout(() => resolve(import('./AboutInstitutePageDesktop')), 1000);
}));
