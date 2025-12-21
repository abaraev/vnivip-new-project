import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useEffect } from 'react';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { Page } from 'widgets/Page';
import { VStack } from 'shared/ui/Stack';
import news2Img from 'shared/assets/images/news2.webp';
import news1Img from 'shared/assets/images/news1.webp';
import { CoverMobile, CoverMobileSize } from 'shared/ui/Cover/MobileView/CoverMobile';
import { NewsPageTitleMobile } from '../NewsPageTitleMobile/NewsPageTitleMobile';
import { fetchMainNews } from '../../../model/services/fetchMainNews';
import { fetchNews } from '../../../model/services/fetchNews';
import { getNewsPageInited } from '../../../model/selectors/getNewsPage';
import { NewsPageActions, NewsPageReducer } from '../../../model/slices/NewsPageSlice';
import cls from './NewsPageMobile.module.scss';
import { NewsPageListMobile } from '../NewsPageListMobile/NewsPageListMobile';

interface NewsPageMobileProps {
    className?: string;
}

const reducers: ReducersList = {
    newsPage: NewsPageReducer,
};

const NewsPageMobile = memo((props: NewsPageMobileProps) => {
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
                className={classNames(cls.NewsPageMobile, {}, [className])}
            >
                <VStack
                    maxH
                    maxW
                    gap={30}
                    paddingB={70}
                >
                    <CoverMobile
                        size={CoverMobileSize.SMALL}
                        images={[
                            news2Img,
                            news1Img,
                        ]}
                    />
                    <VStack
                        paddingL={10}
                        paddingR={10}
                        maxW
                    >
                        <NewsPageTitleMobile />
                        <NewsPageListMobile />
                    </VStack>
                </VStack>
            </Page>
        </DynamicModuleLoader>
    );
});

export default NewsPageMobile;
