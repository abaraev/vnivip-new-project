import { classNames } from 'shared/lib/classNames/classNames';
import { forwardRef, memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { HStack, VStack } from 'shared/ui/Stack';
import { useTranslation } from 'react-i18next';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { AdminNewsDesktop, News } from 'entities/News';
import { GridComponents, GridItemContent, VirtuosoGrid } from 'react-virtuoso';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { useDebounce } from 'shared/lib/hooks/useDebounce/useDebounce';
import { Input } from 'shared/ui/Input/Input';
import { TabsDesktop } from 'shared/ui/Tabs/DesktopView/TabsDesktop';
import { CURRENT_PAGE_ID } from '../AdminNewsPageDesktop/AdminNewsPageDesktop';
import { AdminNewsPageActions, getNews } from '../../../model/slices/AdminNewsPageSlice';
import { getAdminNewsPageListIsLoading, getAdminNewsPageOrder } from '../../../model/selectors/getAdminNewsPage';
import { fetchNews } from '../../../model/services/fetchNews';
import { fetchNewsNextPage } from '../../../model/services/fetchNewsNextPage';
import cls from './AdminNewsPageListDesktop.module.scss';

interface AdminNewsPageListDesktopProps {
    className?: string;
}

const getSkeletons = () => {
    return (
        <HStack
            wrap="wrap"
            gap={30}
            maxW
        >
            {new Array(8).fill(0).map(() => (
                <Skeleton
                    width="calc((100% - 30px) / 2)"
                    height="45vh"
                    borderR="10px"
                />
            ))}
        </HStack>
    );
};

export const AdminNewsPageListDesktop = memo((props: AdminNewsPageListDesktopProps) => {
    const {
        className,
    } = props;
    const { t } = useTranslation('admin');
    const dispatch = useAppDispatch();
    const news = useSelector(getNews.selectAll);
    const isLoading = useSelector(getAdminNewsPageListIsLoading);
    const order = useSelector(getAdminNewsPageOrder);

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
            dispatch(AdminNewsPageActions.setSearch(value.trim()));
            debouncedFetchNews();
        }
    }, [debouncedFetchNews, dispatch]);

    const onTabClick = useCallback((value: string) => {
        dispatch(AdminNewsPageActions.setOrder(value as 'ASC' | 'DESC'));
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
                    gap: '30px',
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
                    width: 'calc((100% - 30px) / 2)',
                    minHeight: '45vh',
                }}
            >
                {children}
            </div>
        ),
    };

    const itemRenderer: GridItemContent<News, any> = useCallback((index, item) => (
        <AdminNewsDesktop
            data={item}
            key={index}
        />
    ), []);

    return (
        <VStack
            className={classNames(cls.AdminNewsPageListDesktop, {}, [className])}
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
                    customScrollParent={document.getElementById(CURRENT_PAGE_ID) as HTMLElement}
                    useWindowScroll
                    endReached={debouncedFetchNewsNextPage}
                    overscan={300}
                />
            )}
            {isLoading && getSkeletons()}
        </VStack>
    );
});
