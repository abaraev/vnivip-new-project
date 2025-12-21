import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useEffect } from 'react';
import { Page } from 'widgets/Page';
import { HStack, VStack } from 'shared/ui/Stack';
import { CoverDesktop, CoverDesktopSize } from 'shared/ui/Cover/DesktopView/CoverDesktop';
import shop1Img from 'shared/assets/images/shop1.webp';
import shop2Img from 'shared/assets/images/shop2.webp';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { ServiceDesktop } from 'entities/Service';
import {
    ServicesPageTitleDesktop,
} from '../ServicesPageTitleDesktop/ServicesPageTitleDesktop';
import { getServicesPageInited, getServicesPageServices } from '../../../model/selectors/getServicesPage';
import cls from './ServicesPageDesktop.module.scss';
import { ServicesPageActions, ServicesPageReducer } from '../../../model/slices/ServicesPageSlice';
import { fetchServices } from '../../../model/services/fetchServices';

interface ServicesPageDesktopProps {
    className?: string;
}

const reducers: ReducersList = {
    servicesPage: ServicesPageReducer,
};

const ServicesPageDesktop = memo((props: ServicesPageDesktopProps) => {
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
            <Page className={classNames(cls.ServicesPageDesktop, {}, [className])}>
                <VStack
                    maxW
                    maxH
                    gap={50}
                    paddingB={100}
                >
                    <CoverDesktop
                        size={CoverDesktopSize.SMALL}
                        images={[
                            shop1Img,
                            shop2Img,
                        ]}
                    />
                    <VStack
                        maxW
                        paddingL={50}
                        paddingR={50}
                        align="center"
                        gap={100}
                    >
                        <ServicesPageTitleDesktop />
                        {!!services?.length && (
                            <HStack
                                maxW
                                gap={30}
                                wrap="wrap"
                            >
                                {services.map((item, index) => (
                                    <ServiceDesktop
                                        data={item}
                                        key={index}
                                        className={cls.service}
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

export default ServicesPageDesktop;
