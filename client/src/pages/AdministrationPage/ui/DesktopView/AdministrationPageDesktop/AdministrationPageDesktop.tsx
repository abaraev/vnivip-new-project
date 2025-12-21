import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useEffect } from 'react';
import { Page } from 'widgets/Page';
import { VStack } from 'shared/ui/Stack';
import { CoverDesktop, CoverDesktopSize } from 'shared/ui/Cover/DesktopView/CoverDesktop';
import members1Img from 'shared/assets/images/members1.webp';
import members2Img from 'shared/assets/images/members2.webp';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { MemberDesktop } from 'entities/Member';
import {
    getAdministrationPageInited,
    getAdministrationPageMembers,
} from '../../../model/selectors/getAdministrationPage';
import { fetchAdministrationMembers } from '../../../model/services/fetchAdministrationMembers';
import cls from './AdministrationPageDesktop.module.scss';
import { AdministrationPageTitleDesktop } from '../AdministrationPageTitleDesktop/AdministrationPageTitleDesktop';
import { AdministrationPageActions, AdministrationPageReducer } from '../../../model/slices/AdministrationPageSlice';

interface AdministrationPageDesktopProps {
    className?: string;
}

const reducers: ReducersList = {
    administrationPage: AdministrationPageReducer,
};

const AdministrationPageDesktop = memo((props: AdministrationPageDesktopProps) => {
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
                className={classNames(cls.AdministrationPageDesktop, {}, [className])}
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
                            members2Img,
                            members1Img,
                        ]}
                    />
                    <VStack
                        paddingL={50}
                        paddingR={50}
                        maxW
                        gap={100}
                    >
                        <AdministrationPageTitleDesktop />
                        {!!members?.length && (
                            <VStack
                                maxW
                                gap={50}
                                align="center"
                            >
                                {members.map((item, index) => (
                                    <MemberDesktop
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

export default AdministrationPageDesktop;
