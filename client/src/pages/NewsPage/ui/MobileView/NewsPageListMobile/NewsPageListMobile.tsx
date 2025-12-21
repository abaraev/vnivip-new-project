import { classNames } from 'shared/lib/classNames/classNames';
import { forwardRef, memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { HStack, VStack } from 'shared/ui/Stack';
import { useTranslation } from 'react-i18next';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { News, NewsMobile } from 'entities/News';
import { GridComponents, GridItemContent, VirtuosoGrid } from 'react-virtuoso';
import { APP_MOBILE_ID } from 'shared/const/components';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { useDebounce } from 'shared/lib/hooks/useDebounce/useDebounce';
import { Input } from 'shared/ui/Input/Input';
import { TabsMobile } from 'shared/ui/Tabs/MobileView/TabsMobile';
import { fetchNews } from '../../../model/services/fetchNews';
import { fetchNewsNextPage } from '../../../model/services/fetchNewsNextPage';
import cls from './NewsPageListMobile.module.scss';
import { getNewsPageListIsLoading, getNewsPageMainNews, getNewsPageOrder } from '../../../model/selectors/getNewsPage';
import { getNews, NewsPageActions } from '../../../model/slices/NewsPageSlice';

interface NewsPageListMobileProps {
    className?: string;
}

const getSkeletons = () => {
    return (
        <HStack
            wrap="wrap"
            gap={10}
            maxW
        >
            {new Array(8).fill(0).map(() => (
                <Skeleton
                    width="calc((100% - 10px) / 2)"
                    height="20vh"
                    borderR="10px"
                />
            ))}
        </HStack>
    );
};

export const NewsPageListMobile = memo((props: NewsPageListMobileProps) => {
    const {
        className,
    } = props;
    const { t } = useTranslation('newsPage');
    const dispatch = useAppDispatch();
    const news = useSelector(getNews.selectAll);
    const isLoading = useSelector(getNewsPageListIsLoading);
    const order = useSelector(getNewsPageOrder);
    const mainNews = useSelector(getNewsPageMainNews);

    const fetchNewsFunc = useCallback(() => {
        dispatch(fetchNews());
    }, [dispatch]);

    const fetchNewsNextPageFunc = useCallback(() => {
        dispatch(fetchNewsNextPage());
    }, [dispatch]);

    const debouncedFetchNewsNextPage = useDebounce(fetchNewsNextPageFunc, 500);
    const debouncedFetchNews = useDebounce(fetchNewsFunc, 1000);

    const onChangeSearch = useCallback((value: string) => {
        if (value.length <= 64) {
            dispatch(NewsPageActions.setSearch(value));
            debouncedFetchNews();
        }
    }, [debouncedFetchNews, dispatch]);

    const onTabClick = useCallback((value: string) => {
        dispatch(NewsPageActions.setOrder(value as 'ASC' | 'DESC'));
        debouncedFetchNews();
    }, [debouncedFetchNews, dispatch]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const gridComponents: GridComponents = {
        // eslint-disable-next-line react/display-name
        List: forwardRef<HTMLDivElement>(({ style, children, ...props }: any, ref) => (
            <div
                ref={ref}
                {...props}
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '10px',
                    ...style,
                }}
            >
                {children}
            </div>
        )),
        // eslint-disable-next-line react/no-unstable-nested-components
        Item: ({ index, children }: any) => (
            <div
                {...props}
                key={index}
                style={{
                    width: 'calc((100% - 10px) / 2)',
                    minHeight: '20vh',
                }}
            >
                {children}
            </div>
        ),
    };

    const itemRenderer: GridItemContent<News, any> = useCallback((index, item) => (
        <NewsMobile
            data={item}
            key={index}
        />
    ), []);

    if (!mainNews) return null;

    return (
        <VStack
            className={classNames(cls.NewsPageListMobile, {}, [className])}
            maxW
            gap={30}
        >
            <VStack
                maxW
                gap={10}
            >
                <Input
                    placeholder={t('Найти новость')}
                    onChange={onChangeSearch}
                    className={cls.inputSearch}
                />
                <TabsMobile
                    className={cls.tabs}
                    value={order}
                    onTabClick={onTabClick}
                    tabs={[
                        {
                            value: 'DESC',
                            text: t('Сначала новые'),
                        },
                        {
                            value: 'ASC',
                            text: t('Сначала старые'),
                        },
                    ]}
                />
            </VStack>
            {!news.length && !isLoading
                ? (
                    <HStack
                        maxH
                        maxW
                        justify="center"
                        align="center"
                        paddingT={100}
                        paddingB={100}
                    >
                        <Text
                            theme={TextTheme.GREY}
                            size={TextSize.H2_MEDIUM_MOBILE}
                        >
                            {t('Новостей пока нет')}
                        </Text>
                    </HStack>
                )
                : null}
            {!!news.length && (
                <VirtuosoGrid
                    style={{
                        width: '100%',
                    }}
                    totalCount={news.length}
                    data={news}
                    components={gridComponents}
                    itemContent={itemRenderer}
                    customScrollParent={document.getElementById(APP_MOBILE_ID) as HTMLElement}
                    useWindowScroll
                    endReached={debouncedFetchNewsNextPage}
                    overscan={300}
                />
            )}
            {isLoading && getSkeletons()}
        </VStack>
    );
});
