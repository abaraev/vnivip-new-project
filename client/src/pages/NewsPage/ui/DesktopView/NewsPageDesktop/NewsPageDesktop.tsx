import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useEffect } from 'react';
import { VStack } from 'shared/ui/Stack';
import { CoverDesktop, CoverDesktopSize } from 'shared/ui/Cover/DesktopView/CoverDesktop';
import news1Img from 'shared/assets/images/news1.webp';
import news2Img from 'shared/assets/images/news2.webp';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Page } from 'widgets/Page';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchNews } from '../../../model/services/fetchNews';
import { fetchMainNews } from '../../../model/services/fetchMainNews';
import { getNewsPageInited } from '../../../model/selectors/getNewsPage';
import { NewsPageListDesktop } from '../NewsPageListDesktop/NewsPageListDesktop';
import { NewsPageActions, NewsPageReducer } from '../../../model/slices/NewsPageSlice';
import cls from './NewsPageDesktop.module.scss';
import { NewsPageTitleDesktop } from '../NewsPageTitleDesktop/NewsPageTitleDesktop';

interface NewsPageDesktopProps {
    className?: string;
}

const reducers: ReducersList = {
    newsPage: NewsPageReducer,
};

const NewsPageDesktop = memo((props: NewsPageDesktopProps) => {
    const {
        className,
    } = props;
    const dispatch = useAppDispatch();
    const inited = useSelector(getNewsPageInited);

    useEffect(() => {
        if (!inited) {
            dispatch(fetchNews());
            dispatch(fetchMainNews());
            dispatch(NewsPageActions.init());
        }
    }, [dispatch, inited]);

    return (
        <DynamicModuleLoader
            reducers={reducers}
            removeAfterUnmount={false}
        >
            <Page
                className={classNames(cls.NewsPageDesktop, {}, [className])}
            >
                <VStack
                    maxH
                    maxW
                    gap={50}
                    paddingB={100}
                >
                    <CoverDesktop
                        size={CoverDesktopSize.SMALL}
                        images={[
                            news2Img,
                            news1Img,
                        ]}
                    />
                    <VStack
                        paddingL={50}
                        paddingR={50}
                        maxW
                    >
                        <NewsPageTitleDesktop />
                        <NewsPageListDesktop />
                    </VStack>
                </VStack>
            </Page>
        </DynamicModuleLoader>
    );
});

export default NewsPageDesktop;
