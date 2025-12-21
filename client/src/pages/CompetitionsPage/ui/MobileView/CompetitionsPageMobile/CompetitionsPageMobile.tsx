import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useEffect } from 'react';
import { Page } from 'widgets/Page';
import { CoverMobile, CoverMobileSize } from 'shared/ui/Cover/MobileView/CoverMobile';
import { VStack } from 'shared/ui/Stack';
import books1Img from 'shared/assets/images/books1.webp';
import books2Img from 'shared/assets/images/books2.webp';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { CompetitionMobile } from 'entities/Competition';
import {
    getCompetitionsPageCompetitions,
    getCompetitionsPageInited,
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
                        {!!competitions?.length && (
                            <VStack
                                maxW
                                gap={30}
                                align="center"
                            >
                                {competitions.map((item, index) => (
                                    <CompetitionMobile
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

export default CompetitionsPageMobile;
