import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useEffect } from 'react';
import { Page } from 'widgets/Page';
import { VStack } from 'shared/ui/Stack';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import members2Img from 'shared/assets/images/members2.webp';
import members1Img from 'shared/assets/images/members1.webp';
import { MemberMobile } from 'entities/Member';
import { CoverMobile, CoverMobileSize } from 'shared/ui/Cover/MobileView/CoverMobile';
import { AdministrationPageTitleMobile } from '../AdministrationPageTitleMobile/AdministrationPageTitleMobile';
import { fetchAdministrationMembers } from '../../../model/services/fetchAdministrationMembers';
import {
    getAdministrationPageInited,
    getAdministrationPageMembers,
} from '../../../model/selectors/getAdministrationPage';
import { AdministrationPageActions, AdministrationPageReducer } from '../../../model/slices/AdministrationPageSlice';
import cls from './AdministrationPageMobile.module.scss';

interface AdministrationPageMobileProps {
    className?: string;
}

const reducers: ReducersList = {
    administrationPage: AdministrationPageReducer,
};

const AdministrationPageMobile = memo((props: AdministrationPageMobileProps) => {
    const {
        className,
    } = props;
    const dispatch = useAppDispatch();
    const inited = useSelector(getAdministrationPageInited);
    const members = useSelector(getAdministrationPageMembers);

    useEffect(() => {
        if (!inited) {
            dispatch(fetchAdministrationMembers());
            dispatch(AdministrationPageActions.init());
        }
    }, [dispatch, inited]);

    return (
        <DynamicModuleLoader
            reducers={reducers}
        >
            <Page
                className={classNames(cls.AdministrationPageMobile, {}, [className])}
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
                            members2Img,
                            members1Img,
                        ]}
                    />
                    <VStack
                        paddingL={10}
                        paddingR={10}
                        maxW
                        gap={50}
                    >
                        <AdministrationPageTitleMobile />
                        {!!members?.length && (
                            <VStack
                                maxW
                                gap={30}
                                align="center"
                            >
                                {members.map((item, index) => (
                                    <MemberMobile
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

export default AdministrationPageMobile;
