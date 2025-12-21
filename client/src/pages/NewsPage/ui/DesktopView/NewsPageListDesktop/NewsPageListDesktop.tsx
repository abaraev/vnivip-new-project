import { classNames } from 'shared/lib/classNames/classNames';
import { forwardRef, memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { HStack, VStack } from 'shared/ui/Stack';
import { useTranslation } from 'react-i18next';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { News, NewsDesktop } from 'entities/News';
import { GridComponents, GridItemContent, VirtuosoGrid } from 'react-virtuoso';
import { APP_DESKTOP_ID } from 'shared/const/components';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { useDebounce } from 'shared/lib/hooks/useDebounce/useDebounce';
import { Input } from 'shared/ui/Input/Input';
import { TabsDesktop } from 'shared/ui/Tabs/DesktopView/TabsDesktop';
import { useMediaQuery } from 'react-responsive';
import { fetchNews } from '../../../model/services/fetchNews';
import { fetchNewsNextPage } from '../../../model/services/fetchNewsNextPage';
import cls from './NewsPageListDesktop.module.scss';
import { getNewsPageListIsLoading, getNewsPageMainNews, getNewsPageOrder } from '../../../model/selectors/getNewsPage';
import { getNews, NewsPageActions } from '../../../model/slices/NewsPageSlice';

interface NewsPageListDesktopProps {
    className?: string;
}

export const NewsPageListDesktop = memo((props: NewsPageListDesktopProps) => {
    const {
        className,
    } = props;
    const { t } = useTranslation('newsPage');
    const dispatch = useAppDispatch();
    const news = useSelector(getNews.selectAll);
    const isLoading = useSelector(getNewsPageListIsLoading);
    const order = useSelector(getNewsPageOrder);
    const mainNews = useSelector(getNewsPageMainNews);
    const isSmallScreen = useMediaQuery({ maxWidth: 1200 });

    const getSkeletons = () => {
        return (
            <HStack
                wrap="wrap"
                gap={20}
                maxW
            >
                {new Array(8).fill(0).map(() => (
                    <Skeleton
                        width={isSmallScreen ? 'calc((100% - 40px) / 3)' : 'calc((100% - 60px) / 4)'}
                        height={isSmallScreen ? '45vh' : '38vh'}
                        borderR="10px"
                    />
                ))}
            </HStack>
        );
    };

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
                    gap: '20px',
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
                    width: isSmallScreen ? 'calc((100% - 40px) / 3)' : 'calc((100% - 60px) / 4)',
                    minHeight: isSmallScreen ? '45vh' : '38vh',
                }}
            >
                {children}
            </div>
        ),
    };

    const itemRenderer: GridItemContent<News, any> = useCallback((index, item) => (
        <NewsDesktop
            data={item}
            key={index}
        />
    ), []);

    if (!mainNews) return null;

    return (
        <VStack
            className={classNames(cls.NewsPageListDesktop, {}, [className])}
            maxW
            gap={20}
        >
            <HStack
                maxW
                gap={100}
            >
                <Input
                    placeholder={t('Найти новость')}
                    onChange={onChangeSearch}
                    className={cls.inputSearch}
                />
                <TabsDesktop
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
            </HStack>
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
                            size={TextSize.H4_MEDIUM_DESKTOP}
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
                    customScrollParent={document.getElementById(APP_DESKTOP_ID) as HTMLElement}
                    useWindowScroll
                    endReached={debouncedFetchNewsNextPage}
                    overscan={300}
                />
            )}
            {isLoading && getSkeletons()}
        </VStack>
    );
});
