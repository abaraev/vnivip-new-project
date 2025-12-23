import { classNames } from 'shared/lib/classNames/classNames';
import React, { memo } from 'react';
import { Member } from 'entities/Member';
import { HStack, VStack } from 'shared/ui/Stack';
import { ButtonDesktop, ButtonDesktopTheme } from 'shared/ui/Button/DesktopView/ButtonDesktop';
import { useTranslation } from 'react-i18next';
import { Icon, IconTheme } from 'shared/ui/Icon/Icon';
import arrowTopIcon from 'shared/assets/icons/arrow-up-32-32-blue.svg';
import arrowBottomIcon from 'shared/assets/icons/arrow-down-32-32-blue.svg';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import close from 'shared/assets/icons/close-32-32-red.svg';
import { AdminMemberSmallBottomDesktop } from '../AdminMemberSmallBottomDesktop/AdminMemberSmallBottomDesktop';
import { AdminMemberSmallTopDesktop } from '../AdminMemberSmallTopDesktop/AdminMemberSmallTopDesktop';
import cls from './AdminMemberSmallDesktop.module.scss';

interface AdminMemberSmallDesktopProps {
    className?: string;
    data: Member;
    membersLength: number;
    onPositionUp?: (memberIndex: number, memberPosition: number) => void;
    onPositionDown?: (memberIndex: number, memberPosition: number) => void;
    onDelete?: (memberPosition: number) => void;
    memberIndex: number;
}

export const AdminMemberSmallDesktop = memo((props: AdminMemberSmallDesktopProps) => {
    const {
        className,
        data,
        membersLength,
        onPositionUp,
        onPositionDown,
        memberIndex,
        onDelete,
    } = props;
    const { t } = useTranslation();
    const navigate = useNavigate();

    const onPositionUpHandler = () => {
        onPositionUp?.(memberIndex, data.position);
    };

    const onPositionDownHandler = () => {
        onPositionDown?.(memberIndex, data.position);
    };

    const onDeleteHandler = () => {
        onDelete?.(data.position);
    };

    return (
        <VStack
            className={classNames(cls.AdminMemberSmallDesktop, {}, [className])}
            justify="between"
        >
            <Icon
                theme={IconTheme.CLICKABLE_BG}
                Svg={close}
                className={cls.deleteBtn}
                onClick={onDeleteHandler}
            />
            {data.position > 0 && (
                <Icon
                    Svg={arrowTopIcon}
                    className={cls.arrowTop}
                    theme={IconTheme.CLICKABLE_BG}
                    onClick={onPositionUpHandler}
                />
            )}
            <VStack
                maxW
                maxH
                justify="between"
                padding={16}
                className={cls.contentWrapper}
            >
                <AdminMemberSmallTopDesktop data={data} />
                <AdminMemberSmallBottomDesktop data={data} />
            </VStack>
            <HStack
                maxW
                justify="end"
                className={cls.editWrapper}
                paddingR={20}
                align="center"
            >
                <ButtonDesktop
                    theme={ButtonDesktopTheme.PRIMARY}
                    onClick={() => navigate(`${RoutePath.admin_members}/${data.id}`)}
                >
                    {t('Редактировать')}
                </ButtonDesktop>
            </HStack>
            {membersLength - 1 > data.position && (
                <Icon
                    Svg={arrowBottomIcon}
                    className={cls.arrowBottom}
                    theme={IconTheme.CLICKABLE_BG}
                    onClick={onPositionDownHandler}
                />
            )}
        </VStack>
    );
});
