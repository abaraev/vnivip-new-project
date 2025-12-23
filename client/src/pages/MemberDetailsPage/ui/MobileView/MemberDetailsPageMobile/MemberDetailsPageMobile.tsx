import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useEffect } from 'react';
import { Page } from 'widgets/Page';
import { VStack } from 'shared/ui/Stack';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import members2Img from 'shared/assets/images/members2.webp';
import members1Img from 'shared/assets/images/members1.webp';
import { CoverMobile, CoverMobileSize } from 'shared/ui/Cover/MobileView/CoverMobile';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import MemberDetailsPageInfoMobile
    from 'pages/MemberDetailsPage/ui/MobileView/MemberDetailsPageInfoMobile/MemberDetailsPageInfoMobile';
import MemberDetailsPageBioMobile
    from 'pages/MemberDetailsPage/ui/MobileView/MemberDetailsPageBioMobile/MemberDetailsPageBioMobile';
import { getMemberDetailsPageMember } from '../../../model/selectors/getMemberDetailsPage';
import { MemberDetailsPageReducer } from '../../../model/slices/MemberDetailsPageSlice';
import cls from './MemberDetailsPageMobile.module.scss';
import { fetchMember } from '../../../model/services/fetchMember';

interface MemberDetailsPageMobileProps {
    className?: string;
}

const reducers: ReducersList = {
    memberDetailsPage: MemberDetailsPageReducer,
};

const MemberDetailsPageMobile = memo((props: MemberDetailsPageMobileProps) => {
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
                className={classNames(cls.MemberDetailsPageMobile, {}, [className])}
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
                        <MemberDetailsPageInfoMobile />
                        <MemberDetailsPageBioMobile />
                    </VStack>
                </VStack>
            </Page>
        </DynamicModuleLoader>
    );
});

export default MemberDetailsPageMobile;
