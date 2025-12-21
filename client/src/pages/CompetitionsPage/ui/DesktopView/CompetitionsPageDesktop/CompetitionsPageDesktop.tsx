import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useEffect } from 'react';
import { Page } from 'widgets/Page';
import { VStack } from 'shared/ui/Stack';
import { CoverDesktop, CoverDesktopSize } from 'shared/ui/Cover/DesktopView/CoverDesktop';
import books1Img from 'shared/assets/images/books1.webp';
import books2Img from 'shared/assets/images/books2.webp';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { CompetitionDesktop } from 'entities/Competition';
import {
    getCompetitionsPageCompetitions,
    getCompetitionsPageInited,
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
    const inited = useSelector(getCompetitionsPageInited);
    const competitions = useSelector(getCompetitionsPageCompetitions);

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
                        {!!competitions?.length && (
                            <VStack
                                maxW
                                gap={50}
                                align="center"
                            >
                                {competitions.map((item, index) => (
                                    <CompetitionDesktop
                                        data={item}
                                        key={index}
                                    />
                                ))}
                            </VStack>
                        )}
                    </VStack>
                </VStack>
            </Page>
        </DynamicModuleLoader>
    );
});

export default CompetitionsPageDesktop;
