import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useEffect } from 'react';
import { Page } from 'widgets/Page';
import { CoverMobile, CoverMobileSize } from 'shared/ui/Cover/MobileView/CoverMobile';
import { VStack } from 'shared/ui/Stack';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { ServiceMobile } from 'entities/Service';
import shop1Img from 'shared/assets/images/shop1.webp';
import shop2Img from 'shared/assets/images/shop2.webp';
import { ServicesPageTitleMobile } from '../ServicesPageTitleMobile/ServicesPageTitleMobile';
import { getServicesPageInited, getServicesPageServices } from '../../../model/selectors/getServicesPage';
import { fetchServices } from '../../../model/services/fetchServices';
import { ServicesPageActions, ServicesPageReducer } from '../../../model/slices/ServicesPageSlice';
import cls from './ServicesPageMobile.module.scss';

interface ServicesPageMobileProps {
    className?: string;
}

const reducers: ReducersList = {
    servicesPage: ServicesPageReducer,
};

const ServicesPageMobile = memo((props: ServicesPageMobileProps) => {
    const {
        className,
    } = props;
    const dispatch = useAppDispatch();
    const inited = useSelector(getServicesPageInited);
    const services = useSelector(getServicesPageServices);

    useEffect(() => {
        if (!inited) {
            dispatch(fetchServices());
            dispatch(ServicesPageActions.init());
        }
    }, [dispatch, inited]);

    return (
        <DynamicModuleLoader
            reducers={reducers}
        >
            <Page
                className={classNames(cls.ServicesPageMobile, {}, [className])}
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
                            shop1Img,
                            shop2Img,
                        ]}
                    />
                    <VStack
                        maxW
                        paddingL={10}
                        paddingR={10}
                        align="center"
                        gap={50}
                    >
                        <ServicesPageTitleMobile />
                        {!!services?.length && (
                            <VStack
                                maxW
                                gap={40}
                                paddingL={10}
                                paddingR={10}
                            >
                                {services.map((item, index) => (
                                    <ServiceMobile
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

export default ServicesPageMobile;
