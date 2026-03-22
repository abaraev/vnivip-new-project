import { lazy } from 'react';

export const AdminMemberDetailsPageDesktopAsync = lazy(() => new Promise((resolve) => {
    // @ts-ignore
    setTimeout(() => resolve(import('./AdminMemberDetailsPageDesktop')), 500);
}));
