import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useEffect } from 'react';
import { Page } from 'widgets/Page';
import { VStack } from 'shared/ui/Stack';
import books1Img from 'shared/assets/images/books1.webp';
import books2Img from 'shared/assets/images/books2.webp';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { CoverMobile, CoverMobileSize } from 'shared/ui/Cover/MobileView/CoverMobile';
import {
    ScienceDepartmentsPageVirologyMobile,
} from '../ScienceDepartmentsPageVirologyMobile/ScienceDepartmentsPageVirologyMobile';
import {
    ScienceDepartmentsPageTitleMobile,
} from '../ScienceDepartmentsPageTitleMobile/ScienceDepartmentsPageTitleMobile';
import {
    ScienceDepartmentsPageProtozoologyMobile,
} from '../ScienceDepartmentsPageProtozoologyMobile/ScienceDepartmentsPageProtozoologyMobile';
import {
    ScienceDepartmentsPageProductionMobile,
} from '../ScienceDepartmentsPageProductionMobile/ScienceDepartmentsPageProductionMobile';
import {
    ScienceDepartmentsPagePharmacologyMobile,
} from '../ScienceDepartmentsPagePharmacologyMobile/ScienceDepartmentsPagePharmacologyMobile';
import {
    ScienceDepartmentsPageMolecularMobile,
} from '../ScienceDepartmentsPageMolecularMobile/ScienceDepartmentsPageMolecularMobile';
import {
    ScienceDepartmentsPageActions,
    ScienceDepartmentsPageReducer,
} from '../../../model/slices/ScienceDepartmentsPageSlice';
import {
    getScienceDepartmentsPageInited,
    getScienceDepartmentsPageMembersMolecular,
    getScienceDepartmentsPageMembersPharmacology,
    getScienceDepartmentsPageMembersProduction,
    getScienceDepartmentsPageMembersProtozoology,
    getScienceDepartmentsPageMembersVirology,
} from '../../../model/selectors/getScienceDepartmentsPage';
import { fetchScienceDepartmentsMembers } from '../../../model/services/fetchScienceDepartmentsMembers';
import cls from './ScienceDepartmentsPageMobile.module.scss';

interface ScienceDepartmentsPageMobileProps {
    className?: string;
}

const reducers: ReducersList = {
    scienceDepartmentsPage: ScienceDepartmentsPageReducer,
};

const ScienceDepartmentsPageMobile = memo((props: ScienceDepartmentsPageMobileProps) => {
    const {
        className,
    } = props;
    const dispatch = useAppDispatch();
    const inited = useSelector(getScienceDepartmentsPageInited);
    const membersVirology = useSelector(getScienceDepartmentsPageMembersVirology);
    const membersProtozoology = useSelector(getScienceDepartmentsPageMembersProtozoology);
    const membersProduction = useSelector(getScienceDepartmentsPageMembersProduction);
    const membersPharmacology = useSelector(getScienceDepartmentsPageMembersPharmacology);
    const membersMolecular = useSelector(getScienceDepartmentsPageMembersMolecular);

    useEffect(() => {
        if (!inited) {
            dispatch(fetchScienceDepartmentsMembers());
            dispatch(ScienceDepartmentsPageActions.init());
        }
    }, [dispatch, inited]);

    return (
        <DynamicModuleLoader
            reducers={reducers}
            removeAfterUnmount={false}
        >
            <Page
                className={classNames(cls.ScienceDepartmentsPageMobile, {}, [className])}
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
                        paddingL={10}
                        paddingR={10}
                        maxW
                        gap={50}
                    >
                        <ScienceDepartmentsPageTitleMobile />
                        <VStack
                            gap={64}
                            maxW
                        >
                            {membersVirology && (
                                <ScienceDepartmentsPageVirologyMobile />
                            )}
                            {membersProduction && (
                                <ScienceDepartmentsPageProductionMobile />
                            )}
                            {membersMolecular && (
                                <ScienceDepartmentsPageMolecularMobile />
                            )}
                            {membersPharmacology && (
                                <ScienceDepartmentsPagePharmacologyMobile />
                            )}
                            {membersProtozoology && (
                                <ScienceDepartmentsPageProtozoologyMobile />
                            )}
                        </VStack>
                    </VStack>
                </VStack>
            </Page>
        </DynamicModuleLoader>
    );
});

export default ScienceDepartmentsPageMobile;
