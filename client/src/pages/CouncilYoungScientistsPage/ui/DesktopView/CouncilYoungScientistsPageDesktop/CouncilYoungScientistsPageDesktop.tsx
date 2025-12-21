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
import { MemberSmallDesktop } from 'entities/Member';
import {
    CouncilYoungScientistsPageTitleDesktop,
} from '../CouncilYoungScientistsPageTitleDesktop/CouncilYoungScientistsPageTitleDesktop';
import {
    CouncilYoungScientistsPageActions,
    CouncilYoungScientistsPageReducer,
} from '../../../model/slices/CouncilYoungScientistsPageSlice';
import {
    getCouncilYoungScientistsPageInited,
    getCouncilYoungScientistsPageMembers,
} from '../../../model/selectors/getCouncilYoungScientistsPage';
import { fetchCouncilYoungScientistsMembers } from '../../../model/services/fetchCouncilYoungScientistsMembers';
import cls from './CouncilYoungScientistsPageDesktop.module.scss';

interface CouncilYoungScientistsPageDesktopProps {
    className?: string;
}

const reducers: ReducersList = {
    councilYoungScientistsPage: CouncilYoungScientistsPageReducer,
};

const CouncilYoungScientistsPageDesktop = memo((props: CouncilYoungScientistsPageDesktopProps) => {
    const {
        className,
    } = props;
    const dispatch = useAppDispatch();
    const inited = useSelector(getCouncilYoungScientistsPageInited);
    const members = useSelector(getCouncilYoungScientistsPageMembers);

    useEffect(() => {
        if (!inited) {
            dispatch(fetchCouncilYoungScientistsMembers());
            dispatch(CouncilYoungScientistsPageActions.init());
        }
    }, [dispatch, inited]);

    return (
        <DynamicModuleLoader
            reducers={reducers}
            removeAfterUnmount={false}
        >
            <Page
                className={classNames(cls.CouncilYoungScientistsPageDesktop, {}, [className])}
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
                            books2Img,
                            books1Img,
                        ]}
                    />
                    <VStack
                        paddingL={50}
                        paddingR={50}
                        maxW
                        gap={100}
                    >
                        <CouncilYoungScientistsPageTitleDesktop />
                        {!!members?.length && (
                            <HStack
                                maxW
                                gap={50}
                                wrap="wrap"
                            >
                                {members.map((item, index) => (
                                    <MemberSmallDesktop
                                        data={item}
                                        key={index}
                                        className={cls.member}
                                    />
                                ))}
                            </HStack>
                        )}
                    </VStack>
                </VStack>
            </Page>
        </DynamicModuleLoader>
    );
});

export default CouncilYoungScientistsPageDesktop;
