import { classNames } from 'shared/lib/classNames/classNames';
import {
    memo, useCallback, useEffect, useMemo,
} from 'react';
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
import { MemberSections } from 'entities/Member';
import { Select } from 'shared/ui/Select/Select';
import {
    AdminMembersPageAcademicCouncilDesktop,
} from '../AdminMembersPageAcademicCouncilDesktop/AdminMembersPageAcademicCouncilDesktop';
import {
    AdminMembersPageYoungScientistsDesktop,
} from '../AdminMembersPageYoungScientistsDesktop/AdminMembersPageYoungScientistsDesktop';
import {
    AdminMembersPageGeneticResearchDesktop,
} from '../AdminMembersPageGeneticResearchDesktop/AdminMembersPageGeneticResearchDesktop';
import {
    AdminMembersPageProductionDepartmentDesktop,
} from '../AdminMembersPageProductionDepartmentDesktop/AdminMembersPageProductionDepartmentDesktop';
import {
    AdminMembersPageToxicologyDesktop,
} from '../AdminMembersPageToxicologyDesktop/AdminMembersPageToxicologyDesktop';
import {
    AdminMembersPageProtozoologyDesktop,
} from '../AdminMembersPageProtozoologyDesktop/AdminMembersPageProtozoologyDesktop';
import {
    AdminMembersPageVirologyDesktop,
} from '../AdminMembersPageVirologyDesktop/AdminMembersPageVirologyDesktop';
import {
    AdminMembersPageAdministrationDesktop,
} from '../AdminMembersPageAdministrationDesktop/AdminMembersPageAdministrationDesktop';
import { fetchAddMember } from '../../../model/services/fetchAddMember';
import { fetchMembers } from '../../../model/services/fetchMembers';
import { AdminMembersPageActions, AdminMembersPageReducer } from '../../../model/slices/AdminMembersPageSlice';
import {
    getAdminMembersPageAddingMemberFullName,
    getAdminMembersPageAddingMemberSection,
    getAdminMembersPageInited,
} from '../../../model/selectors/getAdminMembersPage';
import cls from './AdminMembersPageDesktop.module.scss';

interface AdminMembersPageDesktopProps {
    className?: string;
}

const reducers: ReducersList = {
    adminMembersPage: AdminMembersPageReducer,
};

const AdminMembersPageDesktop = memo((props: AdminMembersPageDesktopProps) => {
    const {
        className,
    } = props;
    const dispatch = useAppDispatch();
    const { t } = useTranslation('admin');
    const inited = useSelector(getAdminMembersPageInited);
    const addingMemberFullName = useSelector(getAdminMembersPageAddingMemberFullName);
    const addingMemberSection = useSelector(getAdminMembersPageAddingMemberSection);
    const [isOpenAddMemberModal, bindAddMemberModal] = useModal();

    useEffect(() => {
        if (!inited) {
            dispatch(fetchMembers());
            dispatch(AdminMembersPageActions.init());
        }
    }, [dispatch, inited]);

    const onCloseAddMemberModal = useCallback(() => {
        dispatch(AdminMembersPageActions.setAddingMemberFullName(''));
        dispatch(AdminMembersPageActions.setAddingMemberSection(''));
        bindAddMemberModal.onCloseModal();
    }, [bindAddMemberModal, dispatch]);

    const onChangeAddingMemberFullName = useCallback((value: string) => {
        dispatch(AdminMembersPageActions.setAddingMemberFullName(value));
    }, [dispatch]);

    const onChangeAddingMemberSection = useCallback((value: string) => {
        dispatch(AdminMembersPageActions.setAddingMemberSection(value as MemberSections));
    }, [dispatch]);

    const onAddMemberClick = useCallback(async () => {
        const result = await dispatch(fetchAddMember());
        if (result.meta.requestStatus === 'fulfilled') {
            bindAddMemberModal.onCloseModal();
        }
    }, [bindAddMemberModal, dispatch]);

    const memberSectionSelectOptions: { value: MemberSections; content: string }[] = useMemo(() => ([
        { value: MemberSections.ADMINISTRATION, content: 'Администрация' },
        { value: MemberSections.DEPARTMENT_OF_PHARMACOLOGY_AND_TOXICOLOGY, content: 'Отдел фармакологии и токсикологии' },
        { value: MemberSections.DEPARTMENT_OF_PROTOZOOLOGY, content: 'Отдел протозоологии' },
        { value: MemberSections.DEPARTMENT_OF_VIROLOGY, content: 'Отдел вирусологии' },
        { value: MemberSections.PRODUCTION_DEPARTMENT, content: 'Производственный отдел' },
        { value: MemberSections.ACADEMIC_COUNCIL, content: 'Ученый совет' },
        { value: MemberSections.COUNCIL_OF_YOUNG_SCIENTISTS, content: 'Совет молодых ученых' },
        { value: MemberSections.DEPARTMENT_OF_MOLECULAR_GENETIC_RESEARCH, content: 'Отдел молекулярно-генетических исследований' },
    ]), []);

    return (
        <DynamicModuleLoader
            reducers={reducers}
        >
            <VStack
                className={classNames(cls.AdminMembersPageDesktop, {}, [className])}
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
                        onClick={bindAddMemberModal.onShowModal}
                    >
                        {t('Добавить сотрудника')}
                    </ButtonDesktop>
                    <Modal
                        isOpen={isOpenAddMemberModal}
                        onClose={onCloseAddMemberModal}
                    >
                        <VStack
                            gap={30}
                            className={cls.addMemberModalContent}
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
                                    {`${t('ФИО')}:`}
                                </Text>
                                <Input
                                    value={addingMemberFullName}
                                    className={cls.input}
                                    onChange={onChangeAddingMemberFullName}
                                />
                            </HStack>
                            <Select
                                defaultContent={`-- ${t('Выберите раздел')} --`}
                                value={addingMemberSection}
                                onChange={onChangeAddingMemberSection}
                                options={memberSectionSelectOptions}
                            />
                            <ButtonDesktop
                                theme={ButtonDesktopTheme.PRIMARY}
                                className={!addingMemberFullName || !addingMemberSection ? cls.btnDisabled : undefined}
                                onClick={onAddMemberClick}
                            >
                                {t('Добавить')}
                            </ButtonDesktop>
                        </VStack>
                    </Modal>
                </HStack>
                <VStack
                    maxW
                    gap={50}
                >
                    <AdminMembersPageAdministrationDesktop />
                    <AdminMembersPageAcademicCouncilDesktop />
                    <AdminMembersPageYoungScientistsDesktop />
                    <AdminMembersPageVirologyDesktop />
                    <AdminMembersPageProductionDepartmentDesktop />
                    <AdminMembersPageGeneticResearchDesktop />
                    <AdminMembersPageToxicologyDesktop />
                    <AdminMembersPageProtozoologyDesktop />
                </VStack>
            </VStack>
        </DynamicModuleLoader>
    );
});

export default AdminMembersPageDesktop;
