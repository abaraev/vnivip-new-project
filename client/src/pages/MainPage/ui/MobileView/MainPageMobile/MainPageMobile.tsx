import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Page } from 'widgets/Page';
import { VStack } from 'shared/ui/Stack';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { MainPagePartnersMobile } from 'pages/MainPage/ui/MobileView/MainPagePartnersMobile/MainPagePartnersMobile';
import { MainPageNewsMobile } from '../MainPageNewsMobile/MainPageNewsMobile';
import { MainPageAboutUsMobile } from '../MainPageAboutUsMobile/MainPageAboutUsMobile';
import { getMainPageNewsInited } from '../../../model/selectors/getMainPageNews';
import { MainPageNewsActions, MainPageNewsReducer } from '../../../model/slices/MainPageNewsSlice';
import { fetchNewsSome } from '../../../model/services/fetchNewsSome';
import { MainPageBannerMobile } from '../MainPageBannerMobile/MainPageBannerMobile';
import cls from './MainPageMobile.module.scss';
import { MainPageGalleryMobile } from '../MainPageGalleryMobile/MainPageGalleryMobile';

interface MainPageMobileProps {
    className?: string;
}

const reducers: ReducersList = {
    mainPageNews: MainPageNewsReducer,
};

const MainPageMobile = (props: MainPageMobileProps) => {
    const { className } = props;
    const { t } = useTranslation('mainPage');
    const dispatch = useAppDispatch();
    const inited = useSelector(getMainPageNewsInited);

    useEffect(() => {
        if (!inited) {
            dispatch(fetchNewsSome());
            dispatch(MainPageNewsActions.init());
        }
    }, [dispatch, inited]);

    return (
        <DynamicModuleLoader
            reducers={reducers}
            removeAfterUnmount={false}
        >
            <Page className={classNames(cls.MainPageMobile, {}, [className])}>
                <VStack
                    maxW
                    maxH
                    gap={30}
                >
                    <MainPageBannerMobile />
                    <VStack
                        maxW
                        paddingL={10}
                        paddingR={10}
                        gap={70}
                    >
                        <MainPageAboutUsMobile />
                        <MainPageNewsMobile />
                        <MainPageGalleryMobile />
                    </VStack>
                    <MainPagePartnersMobile />
                </VStack>
            </Page>
        </DynamicModuleLoader>
    );
};

export default MainPageMobile;
