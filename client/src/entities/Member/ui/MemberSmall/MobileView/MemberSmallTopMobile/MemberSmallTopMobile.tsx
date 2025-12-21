import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { HStack, VStack } from 'shared/ui/Stack';
import { Member } from 'entities/Member';
import { ImageDesktop } from 'shared/ui/Image';
import defaultAvatar from 'shared/assets/images/avatar.png';
import {
    Text, TextAlign, TextSize, TextTheme,
} from 'shared/ui/Text/Text';
import cls from './MemberSmallTopMobile.module.scss';

interface MemberSmallTopMobileProps {
    className?: string;
    data: Member;
}

export const MemberSmallTopMobile = memo((props: MemberSmallTopMobileProps) => {
    const {
        className,
        data,
    } = props;

    return (
        <HStack
            className={classNames(cls.MemberSmallTopMobile, {}, [className])}
            justify="between"
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
                        size={TextSize.BODY_L_MOBILE}
                        align={TextAlign.CENTER}
                    >
                        {data.jobName}
                    </Text>
                )}
                <Text
                    theme={TextTheme.GREY3}
                    size={TextSize.BODY_MOBILE}
                    align={TextAlign.CENTER}
                >
                    {data.fullName}
                </Text>
            </VStack>
        </HStack>
    );
});
