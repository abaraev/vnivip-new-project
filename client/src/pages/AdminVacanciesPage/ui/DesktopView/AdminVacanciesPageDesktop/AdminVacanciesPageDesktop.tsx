import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback, useEffect } from 'react';
import { HStack, VStack } from 'shared/ui/Stack';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { ButtonDesktop, ButtonDesktopTheme } from 'shared/ui/Button/DesktopView/ButtonDesktop';
import { useTranslation } from 'react-i18next';
import { useModal } from 'shared/lib/hooks/useModal/useModal';
import { Modal } from 'shared/ui/Modal/Modal';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { Input } from 'shared/ui/Input/Input';
import { TextArea, TextAreaSize, TextAreaTheme } from 'shared/ui/TextArea/TextArea';
import { AdminVacancyDesktop } from 'entities/Vacancy';
import { fetchDeleteVacancy } from '../../../model/services/fetchDeleteVacancy';
import { fetchAddVacancy } from '../../../model/services/fetchAddVacancy';
import { fetchVacancies } from '../../../model/services/fetchVacancies';
import { AdminVacanciesPageActions, AdminVacanciesPageReducer } from '../../../model/slices/AdminVacanciesPageSlice';
import {
    getAdminVacanciesPageAddingVacancyDescription,
    getAdminVacanciesPageAddingVacancyJobName,
    getAdminVacanciesPageInited,
    getAdminVacanciesPageVacancies,
} from '../../../model/selectors/getAdminVacanciesPage';
import cls from './AdminVacanciesPageDesktop.module.scss';

interface AdminVacanciesPageDesktopProps {
    className?: string;
}

const reducers: ReducersList = {
    adminVacanciesPage: AdminVacanciesPageReducer,
};

const AdminVacanciesPageDesktop = memo((props: AdminVacanciesPageDesktopProps) => {
    const {
        className,
    } = props;
    const dispatch = useAppDispatch();
    const { t } = useTranslation('admin');
    const inited = useSelector(getAdminVacanciesPageInited);
    const vacancies = useSelector(getAdminVacanciesPageVacancies);
    const addingVacancyJobName = useSelector(getAdminVacanciesPageAddingVacancyJobName);
    const addingVacancyDescription = useSelector(getAdminVacanciesPageAddingVacancyDescription);
    const [isOpenAddVacancyModal, bindAddVacancyModal] = useModal();

    useEffect(() => {
        if (!inited) {
            dispatch(fetchVacancies());
            dispatch(AdminVacanciesPageActions.init());
        }
    }, [dispatch, inited]);

    const onCloseAddVacancyModal = useCallback(() => {
        bindAddVacancyModal.onCloseModal();
    }, [bindAddVacancyModal]);

    const onChangeAddingVacancyJobName = useCallback((value: string) => {
        if (value.length < 128) {
            dispatch(AdminVacanciesPageActions.setAddingVacancyJobName(value));
        }
    }, [dispatch]);

    const onChangeAddingVacancyDescription = useCallback((value: string) => {
        if (value.length < 8192) {
            dispatch(AdminVacanciesPageActions.setAddingVacancyDescription(value));
        }
    }, [dispatch]);

    const onAddVacancyClick = useCallback(async () => {
        const result = await dispatch(fetchAddVacancy());
        if (result.meta.requestStatus === 'fulfilled') {
            bindAddVacancyModal.onCloseModal();
        }
    }, [bindAddVacancyModal, dispatch]);

    const onDelete = useCallback((vacancyIndex: number, vacancyId: number) => {
        dispatch(fetchDeleteVacancy({
            vacancyIndex,
            vacancyId,
        }));
    }, [dispatch]);

    return (
        <DynamicModuleLoader
            reducers={reducers}
            removeAfterUnmount={false}
        >
            <VStack
                className={classNames(cls.AdminVacanciesPageDesktop, {}, [className])}
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
                        onClick={bindAddVacancyModal.onShowModal}
                    >
                        {t('Добавить вакансию')}
                    </ButtonDesktop>
                    <Modal
                        isOpen={isOpenAddVacancyModal}
                        onClose={onCloseAddVacancyModal}
                    >
                        <VStack
                            gap={30}
                            className={cls.addVacancyModalContent}
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
                                    {`${t('Должность')}:`}
                                </Text>
                                <Input
                                    value={addingVacancyJobName}
                                    className={cls.input}
                                    onChange={onChangeAddingVacancyJobName}
                                />
                            </HStack>
                            <VStack
                                maxW
                                gap={10}
                            >
                                <Text
                                    theme={TextTheme.DARK2}
                                    size={TextSize.BODY_L_DESKTOP}
                                >
                                    {`${t('Описание вакансии')}:`}
                                </Text>
                                <TextArea
                                    value={addingVacancyDescription || ''}
                                    theme={TextAreaTheme.DARK2}
                                    size={TextAreaSize.BODY_DESKTOP}
                                    onChange={onChangeAddingVacancyDescription}
                                />
                            </VStack>
                            <ButtonDesktop
                                theme={ButtonDesktopTheme.PRIMARY}
                                className={!addingVacancyJobName || !addingVacancyDescription ? cls.btnDisabled : undefined}
                                onClick={onAddVacancyClick}
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
                    {vacancies?.map((vacancy, index) => (
                        <AdminVacancyDesktop
                            data={vacancy}
                            vacancyIndex={index}
                            onDelete={onDelete}
                        />
                    ))}
                </HStack>
            </VStack>
        </DynamicModuleLoader>
    );
});

export default AdminVacanciesPageDesktop;
