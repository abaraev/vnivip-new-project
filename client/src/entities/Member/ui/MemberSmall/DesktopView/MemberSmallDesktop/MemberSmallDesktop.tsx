import { classNames } from 'shared/lib/classNames/classNames';
import React, { memo, useCallback, useState } from 'react';
import { Member } from 'entities/Member';
import { HStack, VStack } from 'shared/ui/Stack';
import { ImageDesktop } from 'shared/ui/Image';
import defaultAvatar from 'shared/assets/images/avatar.png';
import {
    Text, TextAlign, TextSize, TextTheme,
} from 'shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';
import { Icon, IconTheme } from 'shared/ui/Icon/Icon';
import arrowDownIcon from 'shared/assets/icons/arrow-down-34-34-black.svg';
import cls from './MemberSmallDesktop.module.scss';

interface MemberSmallDesktopProps {
    className?: string;
    data: Member;
}

export const MemberSmallDesktop = memo((props: MemberSmallDesktopProps) => {
    const {
        className,
        data,
    } = props;
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const onToggle = useCallback(() => {
        setIsOpen((prevState) => !prevState);
    }, []);

    return (
        <HStack
            className={classNames(cls.MemberSmallDesktop, {}, [className])}
            gap={50}
            padding={20}
            maxW
        >
            <VStack
                gap={30}
            >
                <ImageDesktop
                    src={data.avatar
                        ? `${__API__}/static/images/${data.avatar}`
                        : defaultAvatar}
                    className={cls.image}
                    borderR={10}
                />
                <VStack
                    gap={10}
                >
                    {data.phone && (
                        <VStack
                            gap={4}
                        >
                            <Text
                                theme={TextTheme.GREY3}
                                size={TextSize.BODY_S_DESKTOP}
                            >
                                {`${t('Номер телефона')}: `}
                            </Text>
                            <Text
                                theme={TextTheme.DARK2}
                                size={TextSize.BODY_S_DESKTOP}
                            >
                                {data.phone}
                            </Text>
                        </VStack>
                    )}
                    {data.email && (
                        <VStack
                            gap={4}
                        >
                            <Text
                                theme={TextTheme.GREY3}
                                size={TextSize.BODY_S_DESKTOP}
                            >
                                {`${t('Электронная почта')}: `}
                            </Text>
                            <Text
                                theme={TextTheme.DARK2}
                                size={TextSize.BODY_S_DESKTOP}
                            >
                                {data.email}
                            </Text>
                        </VStack>
                    )}
                </VStack>

            </VStack>

            <VStack
                gap={10}
                className={cls.textWrapper}
            >
                <Text
                    theme={TextTheme.DARK2}
                    size={TextSize.BODY_DESKTOP}
                >
                    {data.fullName}
                </Text>
                {data.jobName && (
                    <Text
                        theme={TextTheme.GREY3}
                        size={TextSize.BODY_S_DESKTOP}
                        className={cls.jobName}
                    >
                        {data.jobName}
                    </Text>
                )}
                {data.status && (
                    <Text
                        theme={TextTheme.BLUE}
                        size={TextSize.BODY_S_DESKTOP}
                    >
                        {data.status}
                    </Text>
                )}

                {Boolean(data.bio) && (
                    <VStack
                        className={classNames(cls.spoiler, { [cls.bioVisible]: isOpen }, [className])}
                        paddingT={50}
                    >
                        <HStack
                            align="center"
                            onClick={onToggle}
                            className={cls.trigger}
                        >
                            <Text
                                theme={TextTheme.DARK2}
                                size={TextSize.BODY_L_MEDIUM_DESKTOP}
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
        </HStack>
    );
});
