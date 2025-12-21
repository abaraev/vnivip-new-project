import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback, useEffect } from 'react';
import { HStack, VStack } from 'shared/ui/Stack';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { AdminEditableServiceDesktop } from 'entities/Service';
import { ButtonDesktop, ButtonDesktopTheme } from 'shared/ui/Button/DesktopView/ButtonDesktop';
import { useTranslation } from 'react-i18next';
import { useModal } from 'shared/lib/hooks/useModal/useModal';
import { Modal } from 'shared/ui/Modal/Modal';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { Input } from 'shared/ui/Input/Input';
import { fetchAddService } from '../../../model/services/fetchAddService';
import { fetchServices } from '../../../model/services/fetchServices';
import { AdminServicesPageActions, AdminServicesPageReducer } from '../../../model/slices/AdminServicesPageSlice';
import {
    getAdminServicesPageAddingServiceName,
    getAdminServicesPageAddingServicePrice,
    getAdminServicesPageInited,
    getAdminServicesPageServices,
} from '../../../model/selectors/getAdminServicesPage';
import cls from './AdminServicesPageDesktop.module.scss';

interface AdminServicesPageDesktopProps {
    className?: string;
}

const reducers: ReducersList = {
    adminServicesPage: AdminServicesPageReducer,
};

const AdminServicesPageDesktop = memo((props: AdminServicesPageDesktopProps) => {
    const {
        className,
    } = props;
    const dispatch = useAppDispatch();
    const { t } = useTranslation('admin');
    const inited = useSelector(getAdminServicesPageInited);
    const services = useSelector(getAdminServicesPageServices);
    const addingServiceName = useSelector(getAdminServicesPageAddingServiceName);
    const addingServicePrice = useSelector(getAdminServicesPageAddingServicePrice);
    const [isOpenAddServiceModal, bindAddServiceModal] = useModal();

    useEffect(() => {
        if (!inited) {
            dispatch(fetchServices());
            dispatch(AdminServicesPageActions.init());
        }
    }, [dispatch, inited]);

    const onCloseAddServiceModal = useCallback(() => {
        dispatch(AdminServicesPageActions.setAddingServiceName(''));
        dispatch(AdminServicesPageActions.setAddingServicePrice(''));
        bindAddServiceModal.onCloseModal();
    }, [bindAddServiceModal, dispatch]);

    const onChangeAddingServiceName = useCallback((value: string) => {
        dispatch(AdminServicesPageActions.setAddingServiceName(value));
    }, [dispatch]);

    const onChangeAddingServicePrice = useCallback((value: string) => {
        const isValidValue = /^(\d+(\.\d{0,2})?)?$/.test(value);
        if (value.length < 12 && isValidValue) {
            dispatch(AdminServicesPageActions.setAddingServicePrice(value));
        }
    }, [dispatch]);

    const onAddServiceClick = useCallback(async () => {
        const result = await dispatch(fetchAddService());
        if (result.meta.requestStatus === 'fulfilled') {
            bindAddServiceModal.onCloseModal();
        }
    }, [bindAddServiceModal, dispatch]);

    return (
        <DynamicModuleLoader
            reducers={reducers}
        >
            <VStack
                className={classNames(cls.AdminServicesPageDesktop, {}, [className])}
                maxH
                padding={30}
                gap={50}
            >
                <HStack
                    maxW
                    justify="center"
                >
                    <ButtonDesktop
                        theme={ButtonDesktopTheme.PRIMARY}
                        onClick={bindAddServiceModal.onShowModal}
                    >
                        {t('Добавить услугу')}
                    </ButtonDesktop>
                    <Modal
                        isOpen={isOpenAddServiceModal}
                        onClose={onCloseAddServiceModal}
                    >
                        <VStack
                            gap={30}
                            className={cls.addServiceModalContent}
                            align="center"
                        >
                            <HStack
                                align="center"
                                gap={20}
                                maxW
                            >
                                <Text
                                    theme={TextTheme.DARK2}
                                    size={TextSize.BODY_L_DESKTOP}
                                >
                                    {`${t('Название услуги')}:`}
                                </Text>
                                <Input
                                    value={addingServiceName}
                                    className={cls.input}
                                    onChange={onChangeAddingServiceName}
                                />
                            </HStack>
                            <HStack
                                align="center"
                                gap={20}
                                maxW
                            >
                                <Text
                                    theme={TextTheme.DARK2}
                                    size={TextSize.BODY_L_DESKTOP}
                                >
                                    {`${t('Цена')}:`}
                                </Text>
                                <Input
                                    value={addingServicePrice}
                                    className={cls.input}
                                    onChange={onChangeAddingServicePrice}
                                />
                            </HStack>
                            <ButtonDesktop
                                theme={ButtonDesktopTheme.PRIMARY}
                                className={!addingServiceName || !addingServicePrice ? cls.btnDisabled : undefined}
                                onClick={onAddServiceClick}
                            >
                                {t('Добавить')}
                            </ButtonDesktop>
                        </VStack>
                    </Modal>
                </HStack>
                <HStack
                    maxW
                    gap={30}
                    wrap="wrap"
                >
                    {services?.map((service) => (
                        <AdminEditableServiceDesktop data={service} />
                    ))}
                </HStack>
            </VStack>
        </DynamicModuleLoader>
    );
});

export default AdminServicesPageDesktop;
