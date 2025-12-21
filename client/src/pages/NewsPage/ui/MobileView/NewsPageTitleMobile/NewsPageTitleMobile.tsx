import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { HStack, VStack } from 'shared/ui/Stack';
import { useTranslation } from 'react-i18next';
import { MainNewsMobile } from 'entities/News';
import { useSelector } from 'react-redux';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import cls from './NewsPageTitleMobile.module.scss';
import { getNewsPageMainNews, getNewsPageMainNewsIsLoading } from '../../../model/selectors/getNewsPage';

interface NewsPageTitleMobileProps {
    className?: string;
}

export const NewsPageTitleMobile = memo((props: NewsPageTitleMobileProps) => {
    const {
        className,
    } = props;
    const { t } = useTranslation('newsPage');
    const mainNews = useSelector(getNewsPageMainNews);
    const isLoading = useSelector(getNewsPageMainNewsIsLoading);

    const renderMainNews = useCallback(() => {
        if (!mainNews && isLoading) {
            return (
                <Skeleton
                    width="100%"
                    height="35vh"
                    borderR="10px"
                />
            );
        }
        if (!mainNews) {
            return (
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
                        size={TextSize.H3_MEDIUM_MOBILE}
                    >
                        {t('Новостей пока нет')}
                    </Text>
                </HStack>
            );
        }

        return (
            <VStack
                gap={10}
                maxW
                align="end"
                className={cls.mainNewsWrapper}
                paddingT={10}
            >
                <Text
                    theme={TextTheme.GREY}
                    size={TextSize.BODY_S_MOBILE}
                >
                    {t('Последняя новость')}
                </Text>
                <MainNewsMobile data={mainNews} />
            </VStack>
        );
    }, [isLoading, mainNews, t]);

    return (
        <VStack
            maxW
            className={classNames(cls.NewsPageTitleMobile, {}, [className])}
            gap={20}
        >
            <Text
                theme={TextTheme.GREY}
                size={TextSize.BODY_S_MOBILE}
            >
                {`[ ${t('События')} ]`}
            </Text>
            <VStack
                maxW
                align="end"
                paddingB={10}
            >
                <VStack
                    gap={10}
                >
                    <Text
                        theme={TextTheme.DARK2}
                        size={TextSize.H1_MOBILE}
                    >
                        {t('Новости')}
                    </Text>
                    <Text
                        theme={TextTheme.DARK2}
                        size={TextSize.BODY_S_MOBILE}
                        className={cls.subtitle}
                    >
                        {t('Следите за нашими новостями, чтобы быть в курсе жизни института')}
                    </Text>
                </VStack>
            </VStack>
            {renderMainNews()}
        </VStack>
    );
});
