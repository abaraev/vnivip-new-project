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
import { FileInput } from 'shared/ui/FileInput/FileInput';
import { AdminDocumentDesktop } from 'entities/Document';
import { fetchAddAct } from '../../../model/services/fetchAddAct';
import { fetchActs } from '../../../model/services/fetchActs';
import { AdminEducationPageActions, AdminEducationPageReducer, getActs } from '../../../model/slices/AdminEducationPageSlice';
import { getAdminEducationPageInited } from '../../../model/selectors/getAdminEducationPage';
import cls from './AdminEducationPageDesktop.module.scss';
import { fetchDeleteAct } from '../../../model/services/fetctDeleteAct';

interface AdminEducationPageDesktopProps {
    className?: string;
}

const reducers: ReducersList = {
    adminEducationPage: AdminEducationPageReducer,
};

const AdminEducationPageDesktop = memo((props: AdminEducationPageDesktopProps) => {
    const {
        className,
    } = props;
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const inited = useSelector(getAdminEducationPageInited);
    const acts = useSelector(getActs.selectAll);
    const [isOpenAddActModal, bindAddActModal] = useModal();

    useEffect(() => {
        if (!inited) {
            dispatch(fetchActs());
            dispatch(AdminEducationPageActions.init());
        }
    }, [dispatch, inited]);

    const onAddAct = useCallback(async (file: File) => {
        if (file.size < 50 * 1024 * 1024) {
            const result = await dispatch(fetchAddAct({ file }));
            if (result.meta.requestStatus === 'fulfilled') {
                bindAddActModal.onCloseModal();
            }
        } else {
            alert('Максимальный размер документа 50 МБ.');
        }
    }, [bindAddActModal, dispatch]);

    const onDeleteAct = useCallback((documentId: number) => {
        dispatch(fetchDeleteAct({ documentId }));
    }, [dispatch]);

    return (
        <DynamicModuleLoader
            reducers={reducers}
            removeAfterUnmount={false}
        >
            <VStack
                className={classNames(cls.AdminEducationPageDesktop, {}, [className])}
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
                        onClick={bindAddActModal.onShowModal}
                    >
                        {t('Добавить документ')}
                    </ButtonDesktop>
                    <Modal
                        isOpen={isOpenAddActModal}
                        onClose={bindAddActModal.onCloseModal}
                    >
                        <VStack
                            align="center"
                            justify="center"
                        >
                            <FileInput
                                accept=".xlsx, .xls, .doc, .docx, .txt, .pdf"
                                onChange={onAddAct}
                            >
                                {t('Загрузить файл')}
                            </FileInput>
                        </VStack>
                    </Modal>
                </HStack>
                <VStack
                    maxW
                    gap={30}
                >
                    {acts?.map((act) => (
                        <AdminDocumentDesktop
                            data={act}
                            onDelete={onDeleteAct}
                        />
                    ))}
                </VStack>
            </VStack>
        </DynamicModuleLoader>
    );
});

export default AdminEducationPageDesktop;
