import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { HStack, VStack } from 'shared/ui/Stack';
import { Member } from 'entities/Member';
import { ImageDesktop } from 'shared/ui/Image';
import defaultAvatar from 'shared/assets/images/avatar.png';
import {
    Text, TextAlign, TextSize, TextTheme,
} from 'shared/ui/Text/Text';
import cls from './MemberSmallTopDesktop.module.scss';

interface MemberSmallTopDesktopProps {
    className?: string;
    data: Member;
}

export const MemberSmallTopDesktop = memo((props: MemberSmallTopDesktopProps) => {
    const {
        className,
        data,
    } = props;

    return (
        <HStack
            className={classNames(cls.MemberSmallTopDesktop, {}, [className])}
            gap={8}
            maxW
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
                {data.jobName && (
                    <Text
                        theme={TextTheme.DARK2}
                        size={TextSize.BODY_DESKTOP}
                    >
                        {data.jobName}
                    </Text>
                )}
                <Text
                    theme={TextTheme.GREY3}
                    size={TextSize.BODY_S_DESKTOP}
                >
                    {data.fullName}
                </Text>
            </VStack>
        </HStack>
    );
});
