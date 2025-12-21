import { lazy } from 'react';

export const PartnersPageMobileAsync = lazy(() => new Promise((resolve) => {
    // @ts-ignore
    setTimeout(() => resolve(import('./PartnersPageMobile')), 1000);
}));
