import { memo } from 'react';
import { HStack, VStack } from 'shared/ui/Stack';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';
import { SpinnerMobile } from 'shared/ui/Spinner/MobileView/SpinnerMobile';
import { MainNewsMobile, SmallNewsMobile } from 'entities/News';
import { Icon, IconTheme } from 'shared/ui/Icon/Icon';
import ArrowRightIcon from 'shared/assets/icons/arrow-right-50-39-white.svg';
import { AppLinkDesktop } from 'shared/ui/AppLink/DesktopView/AppLinkDesktop';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { useSelector } from 'react-redux';
import { getMainPageMainNews, getMainPageNews } from '../../../model/selectors/getMainPageNews';
import cls from './MainPageNewsMobile.module.scss';

export const MainPageNewsMobile = memo(() => {
    const { t } = useTranslation('mainPage');
    const news = useSelector(getMainPageNews);
    const mainNews = useSelector(getMainPageMainNews);

    if (mainNews) {
        return (
            <VStack
                maxW
                ContentTag="section"
                gap={20}
                align="center"
                id="news"
                className={cls.MainPageNewsMobile}
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
                            size={TextSize.LARGE_MOBILE}
                            className={cls.titleText}
                        >
                            {t('СОБЫТИЯ')}
                        </Text>
                        <SpinnerMobile
                            className={cls.spinner}
                        />
                    </div>
                </VStack>
                <VStack
                    className={cls.newsWrapper}
                    gap={30}
                >
                    <MainNewsMobile
                        data={mainNews}
                    />
                    {!!news?.length && (
                        <HStack
                            maxW
                            align="center"
                            justify="center"
                            gap={10}
                            wrap="wrap"
                        >
                            {news.map((item, index) => (
                                <SmallNewsMobile
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
            className={cls.MainPageNewsMobile}
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
                        size={TextSize.LARGE_MOBILE}
                        className={cls.titleText}
                    >
                        {t('СОБЫТИЯ')}
                    </Text>
                    <SpinnerMobile
                        className={cls.spinner}
                    />
                </div>
            </VStack>
            <HStack
                maxH
                maxW
                justify="center"
                align="center"
                paddingT={50}
                paddingB={50}
            >
                <Text
                    theme={TextTheme.GREY}
                    size={TextSize.H3_MEDIUM_MOBILE}
                >
                    {t('Новостей пока нет')}
                </Text>
            </HStack>
        </VStack>
    );
});
