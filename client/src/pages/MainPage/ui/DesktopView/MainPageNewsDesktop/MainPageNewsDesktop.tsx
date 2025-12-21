import { memo } from 'react';
import { HStack, VStack } from 'shared/ui/Stack';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';
import { SpinnerDesktop } from 'shared/ui/Spinner/DesktopView/SpinnerDesktop';
import { MainNewsDesktop, SmallNewsDesktop } from 'entities/News';
import { Icon, IconTheme } from 'shared/ui/Icon/Icon';
import ArrowRightIcon from 'shared/assets/icons/arrow-right-50-39-white.svg';
import { AppLinkDesktop } from 'shared/ui/AppLink/DesktopView/AppLinkDesktop';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { getMainPageMainNews, getMainPageNews } from '../../../model/selectors/getMainPageNews';
import cls from './MainPageNewsDesktop.module.scss';

export const MainPageNewsDesktop = memo(() => {
    const { t } = useTranslation('mainPage');
    const news = useSelector(getMainPageNews);
    const mainNews = useSelector(getMainPageMainNews);
    const isSmallScreen = useMediaQuery({ maxWidth: 1300 });

    if (mainNews) {
        return (
            <VStack
                maxW
                ContentTag="section"
                gap={20}
                align="center"
                id="news"
                className={cls.MainPageNewsDesktop}
            >
                <VStack
                    className={cls.titleWrapper}
                    align="center"
                    maxW
                >
                    <div
                        className={cls.title}
                    >
                        <Text
                            theme={TextTheme.DARK2}
                            size={TextSize.LARGE_DESKTOP}
                            className={cls.titleText}
                        >
                            {t('СОБЫТИЯ')}
                        </Text>
                        <SpinnerDesktop
                            className={cls.spinner}
                        />
                    </div>
                </VStack>
                <VStack
                    className={cls.newsWrapper}
                    gap={isSmallScreen ? 20 : 30}
                >
                    <MainNewsDesktop
                        data={mainNews}
                    />
                    {!!news?.length && (
                        <HStack
                            maxW
                            align="center"
                            justify="center"
                            gap={isSmallScreen ? 20 : 30}
                        >
                            {news.map((item, index) => (
                                <SmallNewsDesktop
                                    data={item}
                                    key={index}
                                />
                            ))}
                            <HStack
                                maxH
                                justify="center"
                                align="center"
                                className={cls.arrowWrapper}
                            >
                                <AppLinkDesktop
                                    to={RoutePath.news}
                                >
                                    <Icon
                                        theme={IconTheme.BLUE}
                                        Svg={ArrowRightIcon}
                                        className={cls.arrow}
                                    />
                                </AppLinkDesktop>
                            </HStack>
                        </HStack>
                    )}
                </VStack>
            </VStack>
        );
    }

    return (
        <VStack
            maxW
            ContentTag="section"
            gap={20}
            align="center"
            id="news"
            className={cls.MainPageNewsDesktop}
        >
            <VStack
                className={cls.titleWrapper}
                align="center"
                maxW
            >
                <div
                    className={cls.title}
                >
                    <Text
                        theme={TextTheme.DARK2}
                        size={TextSize.LARGE_DESKTOP}
                        className={cls.titleText}
                    >
                        {t('СОБЫТИЯ')}
                    </Text>
                    <SpinnerDesktop
                        className={cls.spinner}
                    />
                </div>
            </VStack>
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
        </VStack>
    );
});
