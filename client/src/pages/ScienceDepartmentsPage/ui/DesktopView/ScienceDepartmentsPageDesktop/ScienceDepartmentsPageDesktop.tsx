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
import {
    ScienceDepartmentsPageProductionDesktop,
} from '../ScienceDepartmentsPageProductionDesktop/ScienceDepartmentsPageProductionDesktop';
import {
    ScienceDepartmentsPageMolecularDesktop,
} from '../ScienceDepartmentsPageMolecularDesktop/ScienceDepartmentsPageMolecularDesktop';
import {
    ScienceDepartmentsPagePharmacologyDesktop,
} from '../ScienceDepartmentsPagePharmacologyDesktop/ScienceDepartmentsPagePharmacologyDesktop';
import {
    ScienceDepartmentsPageProtozoologyDesktop,
} from '../ScienceDepartmentsPageProtozoologyDesktop/ScienceDepartmentsPageProtozoologyDesktop';
import {
    ScienceDepartmentsPageVirologyDesktop,
} from '../ScienceDepartmentsPageVirologyDesktop/ScienceDepartmentsPageVirologyDesktop';
import {
    ScienceDepartmentsPageTitleDesktop,
} from '../ScienceDepartmentsPageTitleDesktop/ScienceDepartmentsPageTitleDesktop';
import {
    ScienceDepartmentsPageActions,
    ScienceDepartmentsPageReducer,
} from '../../../model/slices/ScienceDepartmentsPageSlice';
import { getScienceDepartmentsPageInited } from '../../../model/selectors/getScienceDepartmentsPage';
import { fetchScienceDepartmentsMembers } from '../../../model/services/fetchScienceDepartmentsMembers';
import cls from './ScienceDepartmentsPageDesktop.module.scss';
import {
    ScienceDepartmentsPageMicrobiologyDesktop,
} from '../ScienceDepartmentsPageMicrobiologyDesktop/ScienceDepartmentsPageMicrobiologyDesktop';

interface ScienceDepartmentsPageDesktopProps {
    className?: string;
}

const reducers: ReducersList = {
    scienceDepartmentsPage: ScienceDepartmentsPageReducer,
};

const ScienceDepartmentsPageDesktop = memo((props: ScienceDepartmentsPageDesktopProps) => {
    const {
        className,
    } = props;
    const dispatch = useAppDispatch();
    const inited = useSelector(getScienceDepartmentsPageInited);

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
                className={classNames(cls.ScienceDepartmentsPageDesktop, {}, [className])}
            >
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
                        paddingL={50}
                        paddingR={50}
                        maxW
                        gap={100}
                    >
                        <ScienceDepartmentsPageTitleDesktop />
                        <VStack
                            gap={50}
                            maxW
                        >
                            <ScienceDepartmentsPageVirologyDesktop />
                            <ScienceDepartmentsPageProductionDesktop />
                            <ScienceDepartmentsPageMolecularDesktop />
                            <ScienceDepartmentsPagePharmacologyDesktop />
                            <ScienceDepartmentsPageProtozoologyDesktop />
                            <ScienceDepartmentsPageMicrobiologyDesktop />
                        </VStack>
                    </VStack>
                </VStack>
            </Page>
        </DynamicModuleLoader>
    );
});

export default ScienceDepartmentsPageDesktop;
