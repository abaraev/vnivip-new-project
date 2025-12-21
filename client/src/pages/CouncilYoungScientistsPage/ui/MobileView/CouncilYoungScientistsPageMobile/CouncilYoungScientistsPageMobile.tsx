import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useEffect } from 'react';
import { Page } from 'widgets/Page';
import { HStack, VStack } from 'shared/ui/Stack';
import books1Img from 'shared/assets/images/books1.webp';
import books2Img from 'shared/assets/images/books2.webp';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { CoverMobile, CoverMobileSize } from 'shared/ui/Cover/MobileView/CoverMobile';
import { MemberSmallMobile } from 'entities/Member';
import {
    CouncilYoungScientistsPageTitleMobile,
} from '../CouncilYoungScientistsPageTitleMobile/CouncilYoungScientistsPageTitleMobile';
import {
    CouncilYoungScientistsPageActions,
    CouncilYoungScientistsPageReducer,
} from '../../../model/slices/CouncilYoungScientistsPageSlice';
import {
    getCouncilYoungScientistsPageInited,
    getCouncilYoungScientistsPageMembers,
} from '../../../model/selectors/getCouncilYoungScientistsPage';
import { fetchCouncilYoungScientistsMembers } from '../../../model/services/fetchCouncilYoungScientistsMembers';
import cls from './CouncilYoungScientistsPageMobile.module.scss';

interface CouncilYoungScientistsPageMobileProps {
    className?: string;
}

const reducers: ReducersList = {
    councilYoungScientistsPage: CouncilYoungScientistsPageReducer,
};

const CouncilYoungScientistsPageMobile = memo((props: CouncilYoungScientistsPageMobileProps) => {
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
                className={classNames(cls.CouncilYoungScientistsPageMobile, {}, [className])}
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
                        <CouncilYoungScientistsPageTitleMobile />
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

export default CouncilYoungScientistsPageMobile;
