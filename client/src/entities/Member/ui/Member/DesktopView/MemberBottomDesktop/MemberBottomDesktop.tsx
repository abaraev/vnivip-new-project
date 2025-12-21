import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { HStack, VStack } from 'shared/ui/Stack';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { Member } from 'entities/Member';
import { useTranslation } from 'react-i18next';
import cls from './MemberBottomDesktop.module.scss';

interface MemberBottomDesktopProps {
    className?: string;
    data: Member;
}

export const MemberBottomDesktop = memo((props: MemberBottomDesktopProps) => {
    const {
        className,
        data,
    } = props;
    const { t } = useTranslation();

    return (
        <HStack
            justify="end"
            maxW
            className={classNames(cls.MemberBottomDesktop, {}, [className])}
        >
            <VStack
                gap={10}
            >
                {data.email && (
                    <HStack>
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
                    </HStack>
                )}
                {data.phone && (
                    <HStack>
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
                    </HStack>
                )}
            </VStack>
        </HStack>
    );
});
