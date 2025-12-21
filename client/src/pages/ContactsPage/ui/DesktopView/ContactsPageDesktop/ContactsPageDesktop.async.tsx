import { lazy } from 'react';

export const ContactsPageDesktopAsync = lazy(() => new Promise((resolve) => {
    // @ts-ignore
    setTimeout(() => resolve(import('./ContactsPageDesktop')), 1000);
}));
