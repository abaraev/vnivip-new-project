import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Page } from 'widgets/Page';
import { VStack } from 'shared/ui/Stack';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useMediaQuery } from 'react-responsive';
import { getMainPageNewsInited } from '../../../model/selectors/getMainPageNews';
import { fetchNewsSome } from '../../../model/services/fetchNewsSome';
import { MainPageGalleryDesktop } from '../MainPageGalleryDesktop/MainPageGalleryDesktop';
import { MainPageNewsDesktop } from '../MainPageNewsDesktop/MainPageNewsDesktop';
import { MainPageBannerDesktop } from '../MainPageBannerDesktop/MainPageBannerDesktop';
import { MainPageAboutUsDesktop } from '../MainPageAboutUsDesktop/MainPageAboutUsDesktop';
import { MainPagePartnersDesktop } from '../MainPagePartnersDesktop/MainPagePartnersDesktop';
import cls from './MainPageDesktop.module.scss';
import { MainPageNewsActions, MainPageNewsReducer } from '../../../model/slices/MainPageNewsSlice';

interface MainPageDesktopProps {
    className?: string;
}

const reducers: ReducersList = {
    mainPageNews: MainPageNewsReducer,
};

const MainPageDesktop = (props: MainPageDesktopProps) => {
    const { className } = props;
    const { t } = useTranslation('mainPage');
    const dispatch = useAppDispatch();
    const inited = useSelector(getMainPageNewsInited);
    const isSmallScreen = useMediaQuery({ maxWidth: 1300 });

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
            <Page className={classNames(cls.MainPageDesktop, {}, [className])}>
                <VStack
                    maxW
                    maxH
                    gap={50}
                >
                    <MainPageBannerDesktop />
                    <VStack
                        paddingL={isSmallScreen ? 20 : 50}
                        paddingR={isSmallScreen ? 20 : 50}
                        maxW
                        gap={100}
                    >
                        <MainPageAboutUsDesktop />
                        <MainPageNewsDesktop />
                        <MainPageGalleryDesktop />
                    </VStack>
                    <MainPagePartnersDesktop />
                </VStack>
            </Page>
        </DynamicModuleLoader>
    );
};

export default MainPageDesktop;
