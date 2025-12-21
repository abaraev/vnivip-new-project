import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { HStack, VStack } from 'shared/ui/Stack';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { Member } from 'entities/Member';
import { useTranslation } from 'react-i18next';
import cls from './AdminMemberBottomDesktop.module.scss';

interface AdminMemberBottomDesktopProps {
    className?: string;
    data: Member;
}

export const AdminMemberBottomDesktop = memo((props: AdminMemberBottomDesktopProps) => {
    const {
        className,
        data,
    } = props;
    const { t } = useTranslation();

    return (
        <HStack
            justify="end"
            maxW
            className={classNames(cls.AdminMemberBottomDesktop, {}, [className])}
        >
            <VStack
                gap={10}
            >
                {data.email && (
                    <HStack>
                        <Text
                            theme={TextTheme.GREY3}
                            size={TextSize.BODY_MINI_DESKTOP}
                        >
                            {`${t('Электронная почта')}: `}
                        </Text>
                        <Text
                            theme={TextTheme.DARK2}
                            size={TextSize.BODY_MINI_DESKTOP}
                        >
                            {data.email}
                        </Text>
                    </HStack>
                )}
                {data.phone && (
                    <HStack>
                        <Text
                            theme={TextTheme.GREY3}
                            size={TextSize.BODY_MINI_DESKTOP}
                        >
                            {`${t('Номер телефона')}: `}
                        </Text>
                        <Text
                            theme={TextTheme.DARK2}
                            size={TextSize.BODY_MINI_DESKTOP}
                        >
                            {data.phone}
                        </Text>
                    </HStack>
                )}
            </VStack>
        </HStack>
    );
});
