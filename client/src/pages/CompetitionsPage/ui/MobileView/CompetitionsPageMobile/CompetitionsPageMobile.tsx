import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useEffect } from 'react';
import { Page } from 'widgets/Page';
import { CoverMobile, CoverMobileSize } from 'shared/ui/Cover/MobileView/CoverMobile';
import { HStack, VStack } from 'shared/ui/Stack';
import books1Img from 'shared/assets/images/books1.webp';
import books2Img from 'shared/assets/images/books2.webp';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { CompetitionDesktop, CompetitionMobile } from 'entities/Competition';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';
import {
    getCompetitionsPageClosedCompetitions,
    getCompetitionsPageInited,
    getCompetitionsPageOpenedCompetitions,
} from '../../../model/selectors/getCompetitionsPage';
import { fetchCompetitions } from '../../../model/services/fetchCompetitions';
import { CompetitionsPageActions, CompetitionsPageReducer } from '../../../model/slices/CompetitionsPageSlice';
import cls from './CompetitionsPageMobile.module.scss';
import { CompetitionsPageTitleMobile } from '../CompetitionsPageTitleMobile/CompetitionsPageTitleMobile';

interface CompetitionsPageMobileProps {
    className?: string;
}

const reducers: ReducersList = {
    competitionsPage: CompetitionsPageReducer,
};

const CompetitionsPageMobile = memo((props: CompetitionsPageMobileProps) => {
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
            <Page
                className={classNames(cls.CompetitionsPageMobile, {}, [className])}
            >
                <VStack
                    maxW
                    maxH
                    gap={30}
                    paddingB={70}
                >
                    <CoverMobile
                        size={CoverMobileSize.SMALL}
                        images={[
                            books1Img,
                            books2Img,
                        ]}
                    />
                    <VStack
                        maxW
                        paddingL={10}
                        paddingR={10}
                        align="center"
                        gap={50}
                    >
                        <CompetitionsPageTitleMobile />
                        <VStack
                            maxW
                            gap={40}
                        >
                            <VStack
                                maxW
                                gap={30}
                            >
                                <Text
                                    theme={TextTheme.DARK2}
                                    size={TextSize.BODY_L_MEDIUM_MOBILE}
                                >
                                    {t('Открытые конкурсы')}
                                </Text>
                                {openedCompetitions?.length ? (
                                    <VStack
                                        maxW
                                        gap={20}
                                        align="center"
                                    >
                                        {openedCompetitions?.map((competition, index) => (
                                            <CompetitionMobile
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
                                                size={TextSize.BODY_L_MEDIUM_MOBILE}
                                            >
                                                {t('Нет конкурсов')}
                                            </Text>
                                        </HStack>
                                    )}
                            </VStack>

                            <VStack
                                maxW
                                gap={30}
                            >
                                <Text
                                    theme={TextTheme.DARK2}
                                    size={TextSize.BODY_L_MEDIUM_MOBILE}
                                >
                                    {t('Закрытые конкурсы')}
                                </Text>
                                {closedCompetitions?.length ? (
                                    <VStack
                                        maxW
                                        gap={20}
                                        align="center"
                                    >
                                        {closedCompetitions?.map((competition, index) => (
                                            <CompetitionMobile
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
                                                size={TextSize.BODY_L_MEDIUM_MOBILE}
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

export default CompetitionsPageMobile;
