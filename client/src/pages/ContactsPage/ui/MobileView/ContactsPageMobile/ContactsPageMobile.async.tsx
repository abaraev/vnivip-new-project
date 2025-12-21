import { lazy } from 'react';

export const ContactsPageMobileAsync = lazy(() => new Promise((resolve) => {
    // @ts-ignore
    setTimeout(() => resolve(import('./ContactsPageMobile')), 1000);
}));
