import { lazy } from 'react';

export const MemberDetailsPageMobileAsync = lazy(() => new Promise((resolve) => {
    // @ts-ignore
    setTimeout(() => resolve(import('./MemberDetailsPageMobile')), 1000);
}));
