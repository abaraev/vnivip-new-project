import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useEffect } from 'react';
import { HStack, VStack } from 'shared/ui/Stack';
import {
    Text, TextAlign, TextSize, TextTheme,
} from 'shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';
import { Card, CardTheme } from 'shared/ui/Card/Card';
import { Icon, IconTheme } from 'shared/ui/Icon/Icon';
import goalIcon from 'shared/assets/icons/goal-72-72.svg';
import { useMediaQuery } from 'react-responsive';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { ContentCardDesktop } from 'entities/ContentCard';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { fetchContentCards } from '../../../model/services/fetchContentCards';
import cls from './AboutInstitutePageLeftDesktop.module.scss';
import { getAboutInstitutePageContentCards } from '../../../model/selectors/getAboutInstitutePage';
import { AboutInstitutePageReducer } from '../../../model/slices/AboutInstitutePageSlice';

interface AboutInstitutePageLeftDesktopProps {
    className?: string;
}

const reducers: ReducersList = {
    aboutInstitutePage: AboutInstitutePageReducer,
};

export const AboutInstitutePageLeftDesktop = memo((props: AboutInstitutePageLeftDesktopProps) => {
    const {
        className,
    } = props;
    const { t } = useTranslation('aboutInstitutePage');
    const dispatch = useAppDispatch();
    const isSmallScreen = useMediaQuery({ maxWidth: 1100 });
    const contentCards = useSelector(getAboutInstitutePageContentCards);

    useEffect(() => {
        dispatch(fetchContentCards());
    }, [dispatch]);

    return (
        <DynamicModuleLoader
            reducers={reducers}
        >
            <VStack
                className={classNames(cls.AboutInstitutePageLeftDesktop, {}, [className])}
                padding={30}
                gap={isSmallScreen ? 50 : 100}
                paddingB={130}
            >
                <Text
                    theme={TextTheme.DARK2}
                    size={isSmallScreen ? TextSize.H4_DESKTOP : TextSize.H3_DESKTOP}
                    align={TextAlign.RIGHT}
                    className={cls.instituteName}
                >
                    {t('Всероссийский научно-исследовательский ветеринарный институт птицеводства').toUpperCase()}
                </Text>
                <VStack
                    maxW
                    paddingL={30}
                    paddingR={30}
                    className={cls.paragraphsWrapper}
                >
                    <VStack
                        maxW
                        gap={isSmallScreen ? 50 : 70}
                    >
                        <Text
                            theme={TextTheme.GREY}
                            size={TextSize.BODY_S_DESKTOP}
                        >
                            {`[ ${t('Об институте')} ]`}
                        </Text>
                        {Boolean(contentCards?.length) && (
                            <VStack
                                maxW
                                gap={isSmallScreen ? 30 : 50}
                            >
                                <Text
                                    theme={TextTheme.DARK2}
                                    size={isSmallScreen ? TextSize.H3_DESKTOP : TextSize.H2_DESKTOP}
                                    align={TextAlign.CENTER}
                                    className={cls.recentEventsTitle}
                                >
                                    {t('Недавние события')}
                                </Text>
                                <VStack
                                    maxW
                                    gap={50}
                                >
                                    {contentCards?.map((item) => (
                                        <ContentCardDesktop
                                            data={item}
                                            key={item.id}
                                        />
                                    ))}
                                </VStack>
                            </VStack>
                        )}
                        <Text
                            theme={TextTheme.DARK2}
                            size={isSmallScreen ? TextSize.H3_LIGHT_DESKTOP : TextSize.H2_LIGHT_DESKTOP}
                            align={TextAlign.CENTER}
                            className={cls.historyTitle}
                        >
                            {t('История')}
                        </Text>
                        <VStack
                            maxW
                            gap={isSmallScreen ? 20 : 32}
                        >
                            <Text
                                theme={TextTheme.DARK}
                                size={isSmallScreen ? TextSize.BODY_LIGHT_DESKTOP : TextSize.BODY_L_LIGHT_DESKTOP}
                                align={TextAlign.JUSTIFY}
                                textIndent
                                className={cls.historyText}
                            >
                                {t('история параграф 1')}
                            </Text>
                            <Text
                                theme={TextTheme.DARK}
                                size={isSmallScreen ? TextSize.BODY_LIGHT_DESKTOP : TextSize.BODY_L_LIGHT_DESKTOP}
                                align={TextAlign.JUSTIFY}
                                className={cls.historyText}
                            >
                                {t('история параграф 2')}
                            </Text>
                            <Text
                                theme={TextTheme.DARK}
                                size={isSmallScreen ? TextSize.BODY_LIGHT_DESKTOP : TextSize.BODY_L_LIGHT_DESKTOP}
                                align={TextAlign.JUSTIFY}
                                className={cls.historyText}
                            >
                                {t('история параграф 3')}
                            </Text>
                            <Text
                                theme={TextTheme.GREY3}
                                size={isSmallScreen ? TextSize.BODY_LIGHT_DESKTOP : TextSize.BODY_L_LIGHT_DESKTOP}
                                align={TextAlign.RIGHT}
                                className={cls.historyText}
                            >
                                {t('история параграф 4')}
                            </Text>
                            <Text
                                theme={TextTheme.DARK}
                                size={isSmallScreen ? TextSize.BODY_LIGHT_DESKTOP : TextSize.BODY_L_LIGHT_DESKTOP}
                                align={TextAlign.JUSTIFY}
                                className={cls.historyText}
                            >
                                {t('история параграф 5')}
                            </Text>
                        </VStack>
                    </VStack>
                    <HStack
                        align="center"
                        gap={80}
                        className={cls.quoteWrapper}
                    >
                        <Card
                            className={cls.quote}
                            borderR={50}
                        >
                            <Card
                                padding={isSmallScreen ? 30 : 50}
                                borderR={10}
                                theme={CardTheme.BLUE_LIGHT}
                            >
                                <Text
                                    theme={TextTheme.DARK2}
                                    size={isSmallScreen ? TextSize.BODY_L_MEDIUM_DESKTOP : TextSize.H4_DESKTOP}
                                    align={TextAlign.JUSTIFY}
                                    className={cls.quoteText}
                                >
                                    {t('история цитата')}
                                </Text>
                            </Card>
                        </Card>
                        <Icon
                            theme={IconTheme.CLEAN}
                            Svg={goalIcon}
                        />
                    </HStack>
                    <VStack
                        maxW
                        gap={isSmallScreen ? 20 : 32}
                    >
                        <Text
                            theme={TextTheme.DARK}
                            size={isSmallScreen ? TextSize.BODY_LIGHT_DESKTOP : TextSize.BODY_L_LIGHT_DESKTOP}
                            align={TextAlign.JUSTIFY}
                            textIndent
                            className={cls.historyText}
                        >
                            {t('история параграф 6')}
                        </Text>
                        <Text
                            theme={TextTheme.DARK}
                            size={isSmallScreen ? TextSize.BODY_LIGHT_DESKTOP : TextSize.BODY_L_LIGHT_DESKTOP}
                            align={TextAlign.JUSTIFY}
                            className={cls.historyText}
                        >
                            {t('история параграф 7')}
                        </Text>
                        <Text
                            theme={TextTheme.DARK}
                            size={isSmallScreen ? TextSize.BODY_LIGHT_DESKTOP : TextSize.BODY_L_LIGHT_DESKTOP}
                            align={TextAlign.JUSTIFY}
                            className={cls.historyText}
                        >
                            {t('история параграф 8')}
                        </Text>
                        <Text
                            theme={TextTheme.GREY3}
                            size={isSmallScreen ? TextSize.BODY_LIGHT_DESKTOP : TextSize.BODY_L_LIGHT_DESKTOP}
                            align={TextAlign.RIGHT}
                            className={cls.historyText}
                        >
                            {t('история параграф 9')}
                        </Text>
                        <Text
                            theme={TextTheme.DARK}
                            size={isSmallScreen ? TextSize.BODY_LIGHT_DESKTOP : TextSize.BODY_L_LIGHT_DESKTOP}
                            align={TextAlign.JUSTIFY}
                            className={cls.historyText}
                        >
                            {t('история параграф 10')}
                        </Text>
                    </VStack>
                </VStack>
            </VStack>
        </DynamicModuleLoader>
    );
});
