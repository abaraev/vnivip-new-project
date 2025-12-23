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
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import MemberDetailsPageInfoDesktop from '../MemberDetailsPageInfoDesktop/MemberDetailsPageInfoDesktop';
import { getMemberDetailsPageMember } from '../../../model/selectors/getMemberDetailsPage';
import { fetchMember } from '../../../model/services/fetchMember';
import cls from './MemberDetailsPageDesktop.module.scss';
import { MemberDetailsPageReducer } from '../../../model/slices/MemberDetailsPageSlice';
import MemberDetailsPageBioDesktop from '../MemberDetailsPageBioDesktop/MemberDetailsPageBioDesktop';

interface MemberDetailsPageDesktopProps {
    className?: string;
}

const reducers: ReducersList = {
    memberDetailsPage: MemberDetailsPageReducer,
};

const MemberDetailsPageDesktop = memo((props: MemberDetailsPageDesktopProps) => {
    const {
        className,
    } = props;
    const { t } = useTranslation('memberDetailsPage');
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const member = useSelector(getMemberDetailsPageMember);

    useEffect(() => {
        if (id) {
            dispatch(fetchMember({ memberId: id }));
        }
    }, [dispatch, id]);

    return (
        <DynamicModuleLoader
            reducers={reducers}
        >
            <Page
                className={classNames(cls.MemberDetailsPageDesktop, {}, [className])}
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
                        gap={50}
                    >
                        <MemberDetailsPageInfoDesktop />
                        <MemberDetailsPageBioDesktop />
                    </VStack>
                </VStack>
            </Page>
        </DynamicModuleLoader>
    );
});

export default MemberDetailsPageDesktop;
