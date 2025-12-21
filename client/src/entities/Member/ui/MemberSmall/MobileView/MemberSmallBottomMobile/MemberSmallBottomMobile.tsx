import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { HStack, VStack } from 'shared/ui/Stack';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { Member } from 'entities/Member';
import { useTranslation } from 'react-i18next';
import cls from './MemberSmallBottomMobile.module.scss';

interface MemberSmallBottomMobileProps {
    className?: string;
    data: Member;
}

export const MemberSmallBottomMobile = memo((props: MemberSmallBottomMobileProps) => {
    const {
        className,
        data,
    } = props;
    const { t } = useTranslation();

    return (
        <VStack
            className={classNames(cls.MemberSmallBottomMobile, {}, [className])}
            gap={10}
            maxW
        >
            {data.phone && (
                <VStack
                    gap={4}
                >
                    <Text
                        theme={TextTheme.GREY3}
                        size={TextSize.BODY_MOBILE}
                    >
                        {`${t('Номер телефона')}: `}
                    </Text>
                    <Text
                        theme={TextTheme.DARK2}
                        size={TextSize.BODY_MOBILE}
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
                        size={TextSize.BODY_MOBILE}
                    >
                        {`${t('Электронная почта')}: `}
                    </Text>
                    <Text
                        theme={TextTheme.DARK2}
                        size={TextSize.BODY_MOBILE}
                    >
                        {data.email}
                    </Text>
                </VStack>
            )}
            {data.status && (
                <HStack
                    maxW
                    justify="end"
                    paddingT={10}
                >
                    <Text
                        theme={TextTheme.BLUE}
                        size={TextSize.BODY_MOBILE}
                    >
                        {data.status}
                    </Text>
                </HStack>
            )}
        </VStack>
    );
});
