import { lazy } from 'react';

export const MemberDetailsPageDesktopAsync = lazy(() => new Promise((resolve) => {
    // @ts-ignore
    setTimeout(() => resolve(import('./MemberDetailsPageDesktop')), 500);
}));
