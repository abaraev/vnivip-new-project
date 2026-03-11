import { classNames } from 'shared/lib/classNames/classNames';
import React, { memo, useCallback, useState } from 'react';
import { HStack, VStack } from 'shared/ui/Stack';
import {
    Text, TextAlign, TextSize, TextTheme,
} from 'shared/ui/Text/Text';
import { Member } from 'entities/Member';
import { Icon, IconTheme } from 'shared/ui/Icon/Icon';
import arrowDownIcon from 'shared/assets/icons/arrow-down-34-34-black.svg';
import { useTranslation } from 'react-i18next';
import cls from './AdminMemberTopDesktop.module.scss';

interface AdminMemberTopDesktopProps {
    className?: string;
    data: Member;
}

export const AdminMemberTopDesktop = memo((props: AdminMemberTopDesktopProps) => {
    const {
        className,
        data,
    } = props;
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { t } = useTranslation();

    const onToggle = useCallback(() => {
        setIsOpen((prevState) => !prevState);
    }, []);

    return (
        <VStack
            maxW
            gap={20}
            className={classNames(cls.AdminMemberTopDesktop, {}, [className])}
        >
            <VStack
                gap={8}
                maxW
            >
                <Text
                    theme={TextTheme.DARK2}
                    size={TextSize.BODY_L_MEDIUM_DESKTOP}
                >
                    {data.fullName}
                </Text>
                <Text
                    theme={TextTheme.DARK}
                    size={TextSize.BODY_S_DESKTOP}
                >
                    {data.jobName}
                </Text>
                <Text
                    theme={TextTheme.BLUE}
                    size={TextSize.BODY_S_MEDIUM_DESKTOP}
                >
                    {data.status}
                </Text>
            </VStack>

            {Boolean(data.bio) && (
                <VStack
                    className={classNames(cls.spoiler, { [cls.bioVisible]: isOpen }, [className])}
                >
                    <HStack
                        align="center"
                        onClick={onToggle}
                        className={cls.trigger}
                    >
                        <Text
                            theme={TextTheme.DARK2}
                            size={TextSize.BODY_MEDIUM_DESKTOP}
                            className={cls.textBio}
                        >
                            {t('Информация')}
                        </Text>
                        <Icon
                            theme={IconTheme.CLEAN}
                            Svg={arrowDownIcon}
                            className={cls.arrowIcon}
                        />
                    </HStack>
                    <VStack
                        className={cls.bioWrapper}
                        maxW
                    >
                        <Text
                            theme={TextTheme.DARK}
                            size={TextSize.BODY_S_DESKTOP}
                            align={TextAlign.JUSTIFY}
                            className={cls.bio}
                        >
                            {data.bio || ''}
                        </Text>
                    </VStack>
                </VStack>
            )}
        </VStack>
    );
});
