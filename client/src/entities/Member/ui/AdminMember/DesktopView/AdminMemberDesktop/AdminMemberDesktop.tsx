import { classNames } from 'shared/lib/classNames/classNames';
import React, { memo } from 'react';
import { HStack, VStack } from 'shared/ui/Stack';
import { useTranslation } from 'react-i18next';
import { ImageDesktop } from 'shared/ui/Image';
import defaultAvatar from 'shared/assets/images/avatar.png';
import { Icon, IconTheme } from 'shared/ui/Icon/Icon';
import arrowUp from 'shared/assets/icons/arrow-up-32-32-blue.svg';
import arrowDown from 'shared/assets/icons/arrow-down-32-32-blue.svg';
import { ButtonDesktop, ButtonDesktopTheme } from 'shared/ui/Button/DesktopView/ButtonDesktop';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { useNavigate } from 'react-router-dom';
import close from 'shared/assets/icons/close-32-32-red.svg';
import { AdminMemberTopDesktop } from '../AdminMemberTopDesktop/AdminMemberTopDesktop';
import { AdminMemberBottomDesktop } from '../AdminMemberBottomDesktop/AdminMemberBottomDesktop';
import { Member } from '../../../../model/types/Member';
import cls from './AdminMemberDesktop.module.scss';

interface AdminMemberDesktopProps {
    className?: string;
    data: Member;
    membersLength: number;
    onPositionUp?: (memberIndex: number, memberPosition: number) => void;
    onPositionDown?: (memberIndex: number, memberPosition: number) => void;
    onDelete?: (memberPosition: number) => void;
    memberIndex: number;
}

export const AdminMemberDesktop = memo((props: AdminMemberDesktopProps) => {
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
            className={classNames(cls.AdminMemberDesktop, {}, [className])}
            gap={30}
        >
            <Icon
                theme={IconTheme.CLICKABLE_BG}
                Svg={close}
                className={cls.deleteBtn}
                onClick={onDeleteHandler}
            />
            {data.position > 0 && (
                <HStack
                    maxW
                    justify="center"
                >
                    <Icon
                        theme={IconTheme.CLICKABLE_BG}
                        Svg={arrowUp}
                        onClick={onPositionUpHandler}
                    />
                </HStack>
            )}
            <HStack
                maxW
                maxH
                gap={20}
                className={cls.memberWrapper}
            >
                <div
                    className={cls.imageWrapper}
                >
                    <ImageDesktop
                        src={data.avatar
                            ? `${__API__}/static/images/${data.avatar}`
                            : defaultAvatar}
                        className={cls.image}
                        borderR={10}
                    />
                </div>
                <VStack
                    maxH
                    className={cls.infoWrapper}
                    justify="between"
                    paddingT={40}
                    paddingB={10}
                    paddingR={10}
                >
                    <AdminMemberTopDesktop data={data} />
                    <AdminMemberBottomDesktop data={data} />
                </VStack>
            </HStack>
            {membersLength - 1 > data.position && (
                <HStack
                    maxW
                    justify="center"
                >
                    <Icon
                        theme={IconTheme.CLICKABLE_BG}
                        Svg={arrowDown}
                        onClick={onPositionDownHandler}
                    />
                </HStack>
            )}
            <HStack
                maxW
                justify="end"
            >
                <ButtonDesktop
                    theme={ButtonDesktopTheme.PRIMARY}
                    onClick={() => navigate(`${RoutePath.admin_members}/${data.id}`)}
                >
                    {t('Редактировать')}
                </ButtonDesktop>
            </HStack>
        </VStack>
    );
});
