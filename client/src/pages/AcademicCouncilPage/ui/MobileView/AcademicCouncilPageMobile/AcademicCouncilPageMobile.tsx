import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useEffect } from 'react';
import { Page } from 'widgets/Page';
import { VStack } from 'shared/ui/Stack';
import books1Img from 'shared/assets/images/books1.webp';
import books2Img from 'shared/assets/images/books2.webp';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { MemberSmallMobile } from 'entities/Member';
import { CoverMobile, CoverMobileSize } from 'shared/ui/Cover/MobileView/CoverMobile';
import {
    AcademicCouncilPageTitleMobile,
} from '../AcademicCouncilPageTitleMobile/AcademicCouncilPageTitleMobile';
import { AcademicCouncilPageActions, AcademicCouncilPageReducer } from '../../../model/slices/AcademicCouncilPageSlice';
import {
    getAcademicCouncilPageInited,
    getAcademicCouncilPageMembers,
} from '../../../model/selectors/getAcademicCouncilPage';
import { fetchAcademicCouncilMembers } from '../../../model/services/fetchAcademicCouncilMembers';
import cls from './AcademicCouncilPageMobile.module.scss';

interface AcademicCouncilPageMobileProps {
    className?: string;
}

const reducers: ReducersList = {
    academicCouncilPage: AcademicCouncilPageReducer,
};

const AcademicCouncilPageMobile = memo((props: AcademicCouncilPageMobileProps) => {
    const {
        className,
    } = props;
    const dispatch = useAppDispatch();
    const inited = useSelector(getAcademicCouncilPageInited);
    const members = useSelector(getAcademicCouncilPageMembers);

    useEffect(() => {
        if (!inited) {
            dispatch(fetchAcademicCouncilMembers());
            dispatch(AcademicCouncilPageActions.init());
        }
    }, [dispatch, inited]);

    return (
        <DynamicModuleLoader
            reducers={reducers}
            removeAfterUnmount={false}
        >
            <Page
                className={classNames(cls.AcademicCouncilPageMobile, {}, [className])}
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
                            books2Img,
                            books1Img,
                        ]}
                    />
                    <VStack
                        paddingL={10}
                        paddingR={10}
                        maxW
                        gap={50}
                    >
                        <AcademicCouncilPageTitleMobile />
                        {!!members?.length && (
                            <VStack
                                maxW
                                gap={32}
                            >
                                {members.map((item, index) => (
                                    <MemberSmallMobile
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

export default AcademicCouncilPageMobile;
