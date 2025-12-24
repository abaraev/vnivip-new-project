import { memo, useCallback, useState } from 'react';
import { HStack, VStack } from 'shared/ui/Stack';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useTranslation } from 'react-i18next';
import { AdminMemberSmallDesktop, MemberSections } from 'entities/Member';
import { Icon, IconTheme } from 'shared/ui/Icon/Icon';
import arrowDownIcon from 'shared/assets/icons/arrow-keyboard-down-64-64-black.svg';
import arrowRightIcon from 'shared/assets/icons/arrow-keyboard-right-64-64-black.svg';
import { fetchDeleteMember } from '../../../model/services/fetchDeleteMember';
import cls from './AdminMembersPageProtozoologyDesktop.module.scss';
import { fetchMemberPosDown } from '../../../model/services/fetchMemberPosDown';
import { fetchMemberPosUp } from '../../../model/services/fetchMemberPosUp';
import { getAdminMembersPageMembersProtozoology } from '../../../model/selectors/getAdminMembersPage';

interface AdminMembersPageProtozoologyDesktopProps {
    className?: string;
}

export const AdminMembersPageProtozoologyDesktop = memo((props: AdminMembersPageProtozoologyDesktopProps) => {
    const {
        className,
    } = props;
    const membersProtozoology = useSelector(getAdminMembersPageMembersProtozoology);
    const dispatch = useAppDispatch();
    const { t } = useTranslation('admin');
    const [isOpenSection, setIsOpenSection] = useState<boolean>(false);

    const onPositionUpMember = useCallback((memberIndex: number, memberPosition: number) => {
        dispatch(fetchMemberPosUp({
            memberPosition,
            memberIndex,
            section: MemberSections.DEPARTMENT_OF_PROTOZOOLOGY,
        }));
    }, [dispatch]);

    const onPositionDownMember = useCallback((memberIndex: number, memberPosition: number) => {
        dispatch(fetchMemberPosDown({
            memberPosition,
            memberIndex,
            section: MemberSections.DEPARTMENT_OF_PROTOZOOLOGY,
        }));
    }, [dispatch]);

    const onToggleSection = useCallback(() => {
        setIsOpenSection((prevState) => !prevState);
    }, []);

    const onDelete = useCallback((memberPosition: number) => {
        dispatch(fetchDeleteMember({
            memberPosition,
            section: MemberSections.DEPARTMENT_OF_PROTOZOOLOGY,
        }));
    }, [dispatch]);

    return (
        <VStack
            maxW
            gap={50}
        >
            <HStack
                maxW
                className={cls.titleSpoiler}
                justify="between"
                align="center"
                padding={20}
                onClick={onToggleSection}
            >
                <Text
                    theme={TextTheme.DARK2}
                    size={TextSize.H4_MEDIUM_DESKTOP}
                >
                    {t('Отдел протозоологии')}
                </Text>
                {isOpenSection
                    ? (
                        <Icon
                            Svg={arrowDownIcon}
                            theme={IconTheme.CLEAN}
                        />
                    )
                    : (
                        <Icon
                            Svg={arrowRightIcon}
                            theme={IconTheme.CLEAN}
                        />
                    )}
            </HStack>
            {!!membersProtozoology?.length && isOpenSection && (
                <HStack
                    maxW
                    gap={70}
                    wrap="wrap"
                >
                    {membersProtozoology?.map((member, index) => (
                        <AdminMemberSmallDesktop
                            data={member}
                            key={member.id}
                            membersLength={membersProtozoology?.length}
                            memberIndex={index}
                            onPositionUp={onPositionUpMember}
                            onPositionDown={onPositionDownMember}
                            onDelete={onDelete}
                        />
                    ))}
                </HStack>
            )}
            {!membersProtozoology?.length && isOpenSection && (
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
                        {t('Нет сотрудников')}
                    </Text>
                </HStack>
            )}
        </VStack>
    );
});
