import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { VStack } from 'shared/ui/Stack';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { Member } from 'entities/Member';
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
            </VStack>
            <Text
                theme={TextTheme.BLUE}
                size={TextSize.BODY_S_MEDIUM_DESKTOP}
            >
                {data.status}
            </Text>
        </VStack>
    );
});
