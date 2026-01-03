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
import { FileInput } from 'shared/ui/FileInput/FileInput';
import { SmallDocumentDesktop } from 'entities/Document';
import { fetchCloseCompetition } from '../../../model/services/fetchCloseCompetition';
import { fetchOpenCompetition } from '../../../model/services/fetchOpenCompetition';
import { fetchDeleteDocument } from '../../../model/services/fetctDeleteDocument';
import { fetchAddDocument } from '../../../model/services/fetchAddDocument';
import { fetchDeleteCompetition } from '../../../model/services/fetchDeleteCompetition';
import { fetchAddCompetition } from '../../../model/services/fetchAddCompetition';
import { fetchCompetitions } from '../../../model/services/fetchCompetitions';
import {
    AdminCompetitionsPageActions,
    AdminCompetitionsPageReducer,
} from '../../../model/slices/AdminCompetitionsPageSlice';
import {
    getAdminCompetitionsPageAddingCompetitionDescription,
    getAdminCompetitionsPageAddingCompetitionDocuments,
    getAdminCompetitionsPageAddingCompetitionName,
    getAdminCompetitionsPageClosedCompetitions,
    getAdminCompetitionsPageInited,
    getAdminCompetitionsPageOpenedCompetitions,
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
    const closedCompetitions = useSelector(getAdminCompetitionsPageClosedCompetitions);
    const openedCompetitions = useSelector(getAdminCompetitionsPageOpenedCompetitions);
    const addingCompetitionName = useSelector(getAdminCompetitionsPageAddingCompetitionName);
    const addingCompetitionDescription = useSelector(getAdminCompetitionsPageAddingCompetitionDescription);
    const addingCompetitionDocuments = useSelector(getAdminCompetitionsPageAddingCompetitionDocuments);
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

    const onAddDocument = useCallback((file: File) => {
        if (file.type.includes('document') || file.type.includes('pdf') || file.type.includes('text')) {
            if (file.size < 50 * 1024 * 1024) {
                dispatch(fetchAddDocument({ file }));
            } else {
                alert('Максимальный размер документа 50 МБ.');
            }
        }
    }, [dispatch]);

    const onDeleteAct = useCallback((documentId: number) => {
        dispatch(fetchDeleteDocument({ documentId }));
    }, [dispatch]);

    const onCloseCompetition = useCallback((competitionIndex: number, competitionId: number) => {
        dispatch(fetchCloseCompetition({ competitionIndex, competitionId }));
    }, [dispatch]);

    const onOpenCompetition = useCallback((competitionIndex: number, competitionId: number) => {
        dispatch(fetchOpenCompetition({ competitionIndex, competitionId }));
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

                            <VStack
                                maxW
                                gap={40}
                            >
                                <HStack
                                    maxW
                                    justify="center"
                                >
                                    <FileInput
                                        accept=".xlsx, .xls, .doc, .docx, .txt, .pdf"
                                        onChange={onAddDocument}
                                        disabled={addingCompetitionDocuments.length >= 6}
                                    >
                                        {t('Прикрепить файл')}
                                    </FileInput>
                                </HStack>
                                <HStack
                                    maxW
                                    wrap="wrap"
                                    gap={20}
                                    justify="center"
                                >
                                    {addingCompetitionDocuments.map((item) => (
                                        <SmallDocumentDesktop
                                            data={item}
                                            key={item.id}
                                            className={cls.document}
                                            onDelete={onDeleteAct}
                                        />
                                    ))}
                                </HStack>
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
                <VStack
                    maxW
                    gap={20}
                >
                    <Text
                        theme={TextTheme.DARK2}
                        size={TextSize.BODY_L_MEDIUM_DESKTOP}
                    >
                        {t('Открытые конкурсы')}
                    </Text>
                    {openedCompetitions?.length ? (
                        <VStack
                            maxW
                            gap={30}
                        >
                            {openedCompetitions?.map((competition, index) => (
                                <AdminCompetitionDesktop
                                    data={competition}
                                    onDelete={onDelete}
                                    competitionIndex={index}
                                    onClose={onCloseCompetition}
                                    key={competition.id}
                                />
                            ))}
                        </VStack>
                    )
                        : (
                            <HStack
                                maxW
                                justify="center"
                                align="center"
                                paddingT={50}
                                paddingB={50}
                            >
                                <Text
                                    theme={TextTheme.GREY}
                                    size={TextSize.BODY_L_MEDIUM_DESKTOP}
                                >
                                    {t('Нет конкурсов')}
                                </Text>
                            </HStack>
                        )}
                </VStack>

                <VStack
                    maxW
                    gap={20}
                >
                    <Text
                        theme={TextTheme.DARK2}
                        size={TextSize.BODY_L_MEDIUM_DESKTOP}
                    >
                        {t('Закрытые конкурсы')}
                    </Text>
                    {closedCompetitions?.length ? (
                        <VStack
                            maxW
                            gap={30}
                        >
                            {closedCompetitions?.map((competition, index) => (
                                <AdminCompetitionDesktop
                                    data={competition}
                                    onDelete={onDelete}
                                    competitionIndex={index}
                                    onOpen={onOpenCompetition}
                                    key={competition.id}
                                />
                            ))}
                        </VStack>
                    )
                        : (
                            <HStack
                                maxW
                                justify="center"
                                align="center"
                                paddingT={50}
                                paddingB={50}
                            >
                                <Text
                                    theme={TextTheme.GREY}
                                    size={TextSize.BODY_L_MEDIUM_DESKTOP}
                                >
                                    {t('Нет конкурсов')}
                                </Text>
                            </HStack>
                        )}
                </VStack>
            </VStack>
        </DynamicModuleLoader>
    );
});

export default AdminCompetitionsPageDesktop;
