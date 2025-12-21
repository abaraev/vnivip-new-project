import { lazy } from 'react';

export const PartnersPageDesktopAsync = lazy(() => new Promise((resolve) => {
    // @ts-ignore
    setTimeout(() => resolve(import('./PartnersPageDesktop')), 1000);
}));
