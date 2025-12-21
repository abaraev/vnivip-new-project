import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { VStack } from 'shared/ui/Stack';
import {
    Text, TextAlign, TextSize, TextTheme,
} from 'shared/ui/Text/Text';
import { Member } from 'entities/Member';
import cls from './MemberTopMobile.module.scss';

interface MemberTopMobileProps {
    className?: string;
    data: Member;
}

export const MemberTopMobile = memo((props: MemberTopMobileProps) => {
    const {
        className,
        data,
    } = props;

    return (
        <VStack
            maxW
            gap={10}
            className={classNames(cls.MemberTopMobile, {}, [className])}
        >
            <VStack
                gap={8}
                maxW
            >
                <Text
                    theme={TextTheme.DARK2}
                    size={TextSize.BODY_L_MEDIUM_MOBILE}
                    align={TextAlign.CENTER}
                    className={cls.text}
                >
                    {data.fullName}
                </Text>
                <Text
                    theme={TextTheme.DARK}
                    size={TextSize.BODY_MOBILE}
                    align={TextAlign.CENTER}
                    className={cls.text}
                >
                    {data.jobName}
                </Text>
            </VStack>
            <Text
                theme={TextTheme.BLUE}
                size={TextSize.BODY_MEDIUM_MOBILE}
                align={TextAlign.CENTER}
                className={cls.text}
            >
                {data.status}
            </Text>
        </VStack>
    );
});
