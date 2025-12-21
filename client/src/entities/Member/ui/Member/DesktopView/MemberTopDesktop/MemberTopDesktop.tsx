import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { VStack } from 'shared/ui/Stack';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { Member } from 'entities/Member';
import { useMediaQuery } from 'react-responsive';
import cls from './MemberTopDesktop.module.scss';

interface MemberTopDesktopProps {
    className?: string;
    data: Member;
}

export const MemberTopDesktop = memo((props: MemberTopDesktopProps) => {
    const {
        className,
        data,
    } = props;
    const isSmallScreen = useMediaQuery({ maxWidth: 1100 });

    return (
        <VStack
            maxW
            gap={20}
            className={classNames(cls.MemberTopDesktop, {}, [className])}
        >
            <VStack
                gap={8}
                maxW
            >
                <Text
                    theme={TextTheme.DARK2}
                    size={isSmallScreen ? TextSize.BODY_L_MEDIUM_DESKTOP : TextSize.H4_MEDIUM_DESKTOP}
                >
                    {data.fullName}
                </Text>
                <Text
                    theme={TextTheme.DARK}
                    size={isSmallScreen ? TextSize.BODY_S_DESKTOP : TextSize.BODY_DESKTOP}
                >
                    {data.jobName}
                </Text>
            </VStack>
            <Text
                theme={TextTheme.BLUE}
                size={isSmallScreen ? TextSize.BODY_S_MEDIUM_DESKTOP : TextSize.BODY_MEDIUM_DESKTOP}
            >
                {data.status}
            </Text>
        </VStack>
    );
});
