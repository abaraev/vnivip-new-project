import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { HStack, VStack } from 'shared/ui/Stack';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { Member } from 'entities/Member';
import { useTranslation } from 'react-i18next';
import cls from './MemberBottomMobile.module.scss';

interface MemberBottomMobileProps {
    className?: string;
    data: Member;
}

export const MemberBottomMobile = memo((props: MemberBottomMobileProps) => {
    const {
        className,
        data,
    } = props;
    const { t } = useTranslation();

    return (
        <HStack
            justify="center"
            maxW
            className={classNames(cls.MemberBottomMobile, {}, [className])}
        >
            <VStack
                gap={10}
            >
                {data.email && (
                    <VStack
                        align="center"
                    >
                        <Text
                            theme={TextTheme.GREY3}
                            size={TextSize.BODY_S_MOBILE}
                        >
                            {`${t('Электронная почта')}: `}
                        </Text>
                        <Text
                            theme={TextTheme.DARK2}
                            size={TextSize.BODY_S_MOBILE}
                        >
                            {data.email}
                        </Text>
                    </VStack>
                )}
                {data.phone && (
                    <VStack
                        align="center"
                    >
                        <Text
                            theme={TextTheme.GREY3}
                            size={TextSize.BODY_S_MOBILE}
                        >
                            {`${t('Номер телефона')}: `}
                        </Text>
                        <Text
                            theme={TextTheme.DARK2}
                            size={TextSize.BODY_S_MOBILE}
                        >
                            {data.phone}
                        </Text>
                    </VStack>
                )}
            </VStack>
        </HStack>
    );
});
