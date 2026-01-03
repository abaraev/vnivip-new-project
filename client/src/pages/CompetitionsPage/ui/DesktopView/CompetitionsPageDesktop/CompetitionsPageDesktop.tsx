import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useEffect } from 'react';
import { Page } from 'widgets/Page';
import { HStack, VStack } from 'shared/ui/Stack';
import { CoverDesktop, CoverDesktopSize } from 'shared/ui/Cover/DesktopView/CoverDesktop';
import books1Img from 'shared/assets/images/books1.webp';
import books2Img from 'shared/assets/images/books2.webp';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { CompetitionDesktop } from 'entities/Competition';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';
import {
    getCompetitionsPageClosedCompetitions,
    getCompetitionsPageInited,
    getCompetitionsPageOpenedCompetitions,
} from '../../../model/selectors/getCompetitionsPage';
import { fetchCompetitions } from '../../../model/services/fetchCompetitions';
import cls from './CompetitionsPageDesktop.module.scss';
import { CompetitionsPageTitleDesktop } from '../CompetitionsPageTitleDesktop/CompetitionsPageTitleDesktop';
import { CompetitionsPageActions, CompetitionsPageReducer } from '../../../model/slices/CompetitionsPageSlice';

interface CompetitionsPageDesktopProps {
    className?: string;
}

const reducers: ReducersList = {
    competitionsPage: CompetitionsPageReducer,
};

const CompetitionsPageDesktop = memo((props: CompetitionsPageDesktopProps) => {
    const {
        className,
    } = props;
    const dispatch = useAppDispatch();
    const { t } = useTranslation('competitionsPage');
    const inited = useSelector(getCompetitionsPageInited);
    const closedCompetitions = useSelector(getCompetitionsPageClosedCompetitions);
    const openedCompetitions = useSelector(getCompetitionsPageOpenedCompetitions);

    useEffect(() => {
        if (!inited) {
            dispatch(fetchCompetitions());
            dispatch(CompetitionsPageActions.init());
        }
    }, [dispatch, inited]);

    return (
        <DynamicModuleLoader
            reducers={reducers}
            removeAfterUnmount={false}
        >
            <Page className={classNames(cls.CompetitionsPageDesktop, {}, [className])}>
                <VStack
                    maxW
                    maxH
                    gap={50}
                    paddingB={100}
                >
                    <CoverDesktop
                        size={CoverDesktopSize.SMALL}
                        images={[
                            books1Img,
                            books2Img,
                        ]}
                    />
                    <VStack
                        maxW
                        paddingL={50}
                        paddingR={50}
                        align="center"
                        gap={100}
                    >
                        <CompetitionsPageTitleDesktop />
                        <VStack
                            maxW
                            gap={50}
                        >
                            <VStack
                                maxW
                                gap={20}
                            >
                                <Text
                                    theme={TextTheme.DARK2}
                                    size={TextSize.BODY_L_MEDIUM_DESKTOP}
                                >
                                    {t('Открытые конкурсы')}
                                </Text>
                                {openedCompetitions?.length ? (
                                    <VStack
                                        maxW
                                        gap={30}
                                        align="center"
                                    >
                                        {openedCompetitions?.map((competition, index) => (
                                            <CompetitionDesktop
                                                data={competition}
                                                key={competition.id}
                                            />
                                        ))}
                                    </VStack>
                                )
                                    : (
                                        <HStack
                                            maxW
                                            justify="center"
                                            align="center"
                                            paddingT={50}
                                            paddingB={50}
                                        >
                                            <Text
                                                theme={TextTheme.GREY}
                                                size={TextSize.BODY_L_MEDIUM_DESKTOP}
                                            >
                                                {t('Нет конкурсов')}
                                            </Text>
                                        </HStack>
                                    )}
                            </VStack>

                            <VStack
                                maxW
                                gap={20}
                            >
                                <Text
                                    theme={TextTheme.DARK2}
                                    size={TextSize.BODY_L_MEDIUM_DESKTOP}
                                >
                                    {t('Закрытые конкурсы')}
                                </Text>
                                {closedCompetitions?.length ? (
                                    <VStack
                                        maxW
                                        gap={30}
                                        align="center"
                                    >
                                        {closedCompetitions?.map((competition, index) => (
                                            <CompetitionDesktop
                                                data={competition}
                                                key={competition.id}
                                            />
                                        ))}
                                    </VStack>
                                )
                                    : (
                                        <HStack
                                            maxW
                                            justify="center"
                                            align="center"
                                            paddingT={50}
                                            paddingB={50}
                                        >
                                            <Text
                                                theme={TextTheme.GREY}
                                                size={TextSize.BODY_L_MEDIUM_DESKTOP}
                                            >
                                                {t('Нет конкурсов')}
                                            </Text>
                                        </HStack>
                                    )}
                            </VStack>
                        </VStack>
                    </VStack>
                </VStack>
            </Page>
        </DynamicModuleLoader>
    );
});

export default CompetitionsPageDesktop;
