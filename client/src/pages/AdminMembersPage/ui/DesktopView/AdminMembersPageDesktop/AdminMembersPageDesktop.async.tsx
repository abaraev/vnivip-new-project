import { lazy } from 'react';

export const AdminMembersPageDesktopAsync = lazy(() => new Promise((resolve) => {
    // @ts-ignore
    setTimeout(() => resolve(import('./AdminMembersPageDesktop')), 500);
}));
