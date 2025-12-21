import { useEffect } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { uiActions } from 'features/UI';

export const PageLoaderActivator = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(uiActions.setIsLoadingPage(true));

        return () => {
            dispatch(uiActions.setIsLoadingPage(false));
        };
    }, [dispatch]);

    return null;
};
