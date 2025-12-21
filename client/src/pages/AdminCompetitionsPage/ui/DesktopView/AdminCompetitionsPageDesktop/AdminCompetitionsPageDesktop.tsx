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
import { AdminCompetitionDesktop } from 'entities/Competition';
import { TextArea, TextAreaSize, TextAreaTheme } from 'shared/ui/TextArea/TextArea';
import { fetchDeleteCompetition } from '../../../model/services/fetchDeleteCompetition';
import { fetchAddCompetition } from '../../../model/services/fetchAddCompetition';
import { fetchCompetitions } from '../../../model/services/fetchCompetitions';
import {
    AdminCompetitionsPageActions,
    AdminCompetitionsPageReducer,
} from '../../../model/slices/AdminCompetitionsPageSlice';
import {
    getAdminCompetitionsPageAddingCompetitionDescription,
    getAdminCompetitionsPageAddingCompetitionName,
    getAdminCompetitionsPageCompetitions,
    getAdminCompetitionsPageInited,
} from '../../../model/selectors/getAdminCompetitionsPage';
import cls from './AdminCompetitionsPageDesktop.module.scss';

interface AdminCompetitionsPageDesktopProps {
    className?: string;
}

const reducers: ReducersList = {
    adminCompetitionsPage: AdminCompetitionsPageReducer,
};

const AdminCompetitionsPageDesktop = memo((props: AdminCompetitionsPageDesktopProps) => {
    const {
        className,
    } = props;
    const dispatch = useAppDispatch();
    const { t } = useTranslation('admin');
    const inited = useSelector(getAdminCompetitionsPageInited);
    const competitions = useSelector(getAdminCompetitionsPageCompetitions);
    const addingCompetitionName = useSelector(getAdminCompetitionsPageAddingCompetitionName);
    const addingCompetitionDescription = useSelector(getAdminCompetitionsPageAddingCompetitionDescription);
    const [isOpenAddCompetitionModal, bindAddCompetitionModal] = useModal();

    useEffect(() => {
        if (!inited) {
            dispatch(fetchCompetitions());
            dispatch(AdminCompetitionsPageActions.init());
        }
    }, [dispatch, inited]);

    const onCloseAddCompetitionModal = useCallback(() => {
        bindAddCompetitionModal.onCloseModal();
    }, [bindAddCompetitionModal]);

    const onChangeAddingCompetitionName = useCallback((value: string) => {
        if (value.length < 128) {
            dispatch(AdminCompetitionsPageActions.setAddingCompetitionName(value));
        }
    }, [dispatch]);

    const onChangeAddingCompetitionDescription = useCallback((value: string) => {
        if (value.length < 8192) {
            dispatch(AdminCompetitionsPageActions.setAddingCompetitionDescription(value));
        }
    }, [dispatch]);

    const onAddCompetitionClick = useCallback(async () => {
        const result = await dispatch(fetchAddCompetition());
        if (result.meta.requestStatus === 'fulfilled') {
            bindAddCompetitionModal.onCloseModal();
        }
    }, [bindAddCompetitionModal, dispatch]);

    const onDelete = useCallback((competitionIndex: number, competitionId: number) => {
        dispatch(fetchDeleteCompetition({
            competitionIndex,
            competitionId,
        }));
    }, [dispatch]);

    return (
        <DynamicModuleLoader
            reducers={reducers}
            removeAfterUnmount={false}
        >
            <VStack
                className={classNames(cls.AdminCompetitionsPageDesktop, {}, [className])}
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
                        onClick={bindAddCompetitionModal.onShowModal}
                    >
                        {t('Добавить конкурс')}
                    </ButtonDesktop>
                    <Modal
                        isOpen={isOpenAddCompetitionModal}
                        onClose={onCloseAddCompetitionModal}
                    >
                        <VStack
                            gap={30}
                            className={cls.addCompetitionModalContent}
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
                                    {`${t('Название конкурса')}:`}
                                </Text>
                                <Input
                                    value={addingCompetitionName}
                                    className={cls.input}
                                    onChange={onChangeAddingCompetitionName}
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
                                    {`${t('Описание конкурса')}:`}
                                </Text>
                                <TextArea
                                    value={addingCompetitionDescription || ''}
                                    theme={TextAreaTheme.DARK2}
                                    size={TextAreaSize.BODY_DESKTOP}
                                    onChange={onChangeAddingCompetitionDescription}
                                />
                            </VStack>
                            <ButtonDesktop
                                theme={ButtonDesktopTheme.PRIMARY}
                                className={!addingCompetitionName || !addingCompetitionDescription ? cls.btnDisabled : undefined}
                                onClick={onAddCompetitionClick}
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
                    {competitions?.map((competition, index) => (
                        <AdminCompetitionDesktop
                            data={competition}
                            onDelete={onDelete}
                            competitionIndex={index}
                        />
                    ))}
                </HStack>
            </VStack>
        </DynamicModuleLoader>
    );
});

export default AdminCompetitionsPageDesktop;
